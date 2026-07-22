<?php
declare(strict_types=1);

// LmUmbrella SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class LmUmbrellaSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new LmUmbrellaUtility();
        $this->_utility = $utility;

        $config = LmUmbrellaConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = LmUmbrellaHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = LmUmbrellaHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, LmUmbrellaFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return LmUmbrellaUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = LmUmbrellaHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = LmUmbrellaHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = LmUmbrellaHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new LmUmbrellaSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = LmUmbrellaHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = LmUmbrellaHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_database = null;

    // Canonical facade: $client->Database()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->database()
    // resolves here too.
    public function Database($data = null)
    {
        require_once __DIR__ . '/entity/database_entity.php';
        if ($data === null) {
            if ($this->_database === null) {
                $this->_database = new DatabaseEntity($this, null);
            }
            return $this->_database;
        }
        return new DatabaseEntity($this, $data);
    }


    private $_flat_permission = null;

    // Canonical facade: $client->FlatPermission()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->flat_permission()
    // resolves here too.
    public function FlatPermission($data = null)
    {
        require_once __DIR__ . '/entity/flat_permission_entity.php';
        if ($data === null) {
            if ($this->_flat_permission === null) {
                $this->_flat_permission = new FlatPermissionEntity($this, null);
            }
            return $this->_flat_permission;
        }
        return new FlatPermissionEntity($this, $data);
    }


    private $_flattened_permission = null;

    // Canonical facade: $client->FlattenedPermission()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->flattened_permission()
    // resolves here too.
    public function FlattenedPermission($data = null)
    {
        require_once __DIR__ . '/entity/flattened_permission_entity.php';
        if ($data === null) {
            if ($this->_flattened_permission === null) {
                $this->_flattened_permission = new FlattenedPermissionEntity($this, null);
            }
            return $this->_flattened_permission;
        }
        return new FlattenedPermissionEntity($this, $data);
    }


    private $_import_status = null;

    // Canonical facade: $client->ImportStatus()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->import_status()
    // resolves here too.
    public function ImportStatus($data = null)
    {
        require_once __DIR__ . '/entity/import_status_entity.php';
        if ($data === null) {
            if ($this->_import_status === null) {
                $this->_import_status = new ImportStatusEntity($this, null);
            }
            return $this->_import_status;
        }
        return new ImportStatusEntity($this, $data);
    }


    private $_metadata = null;

    // Canonical facade: $client->Metadata()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->metadata()
    // resolves here too.
    public function Metadata($data = null)
    {
        require_once __DIR__ . '/entity/metadata_entity.php';
        if ($data === null) {
            if ($this->_metadata === null) {
                $this->_metadata = new MetadataEntity($this, null);
            }
            return $this->_metadata;
        }
        return new MetadataEntity($this, $data);
    }


    private $_paginated_permission_list = null;

    // Canonical facade: $client->PaginatedPermissionList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->paginated_permission_list()
    // resolves here too.
    public function PaginatedPermissionList($data = null)
    {
        require_once __DIR__ . '/entity/paginated_permission_list_entity.php';
        if ($data === null) {
            if ($this->_paginated_permission_list === null) {
                $this->_paginated_permission_list = new PaginatedPermissionListEntity($this, null);
            }
            return $this->_paginated_permission_list;
        }
        return new PaginatedPermissionListEntity($this, $data);
    }


    private $_permission = null;

    // Canonical facade: $client->Permission()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->permission()
    // resolves here too.
    public function Permission($data = null)
    {
        require_once __DIR__ . '/entity/permission_entity.php';
        if ($data === null) {
            if ($this->_permission === null) {
                $this->_permission = new PermissionEntity($this, null);
            }
            return $this->_permission;
        }
        return new PermissionEntity($this, $data);
    }


    private $_permission_database = null;

    // Canonical facade: $client->PermissionDatabase()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->permission_database()
    // resolves here too.
    public function PermissionDatabase($data = null)
    {
        require_once __DIR__ . '/entity/permission_database_entity.php';
        if ($data === null) {
            if ($this->_permission_database === null) {
                $this->_permission_database = new PermissionDatabaseEntity($this, null);
            }
            return $this->_permission_database;
        }
        return new PermissionDatabaseEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new LmUmbrellaSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
