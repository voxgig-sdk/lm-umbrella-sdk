<?php
declare(strict_types=1);

// PermissionDatabase entity test

require_once __DIR__ . '/../lmumbrella_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PermissionDatabaseEntityTestFailHook extends LmUmbrellaBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(LmUmbrellaContext $ctx, array $options): void
    {
    }

    public function PreSpec(LmUmbrellaContext $ctx): void
    {
        throw new \RuntimeException('permission_database hook failed');
    }

    public function PreUnexpected(LmUmbrellaContext $ctx): void
    {
        $this->unexpected++;
    }
}

class PermissionDatabaseEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = LmUmbrellaSDK::test(null, null);
        $ent = $testsdk->PermissionDatabase(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "permission_database" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = LmUmbrellaSDK::test($seed, null);
        $seen = iterator_to_array($base->PermissionDatabase(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = LmUmbrellaConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = LmUmbrellaSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->PermissionDatabase(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(LmUmbrellaSDK::test($offline, null)->PermissionDatabase(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(LmUmbrellaSDK::test($offline, null)->PermissionDatabase(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = LmUmbrellaConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = LmUmbrellaSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->PermissionDatabase(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(LmUmbrellaSDK::test(null, null)->PermissionDatabase(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new PermissionDatabaseEntityTestFailHook();
        $client = new LmUmbrellaSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->PermissionDatabase(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->PermissionDatabase(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = LmUmbrellaConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new LmUmbrellaSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('permission_database transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->PermissionDatabase(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(LmUmbrellaError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->PermissionDatabase(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
    }

    public function test_validate(): void
    {
        $cfg = LmUmbrellaConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = LmUmbrellaSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->PermissionDatabase(null)->list(["api_key" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = permission_database_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "permission_database." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"])) {
            foreach (["database01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID");
                }
            }
        }
        if (!empty($setup["live"])) {
            Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: " . "the flow updates a permission_database record it did not create");
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $permission_database_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.permission_database")));
        $permission_database_ref01_data = null;
        if (count($permission_database_ref01_data_raw) > 0) {
            $permission_database_ref01_data = Helpers::to_map($permission_database_ref01_data_raw[0][1]);
        }

        // LIST
        $permission_database_ref01_ent = $client->PermissionDatabase(null);
        $permission_database_ref01_match = [];

        $permission_database_ref01_list_result = $permission_database_ref01_ent->list($permission_database_ref01_match, null);
        $this->assertIsArray($permission_database_ref01_list_result);

        // UPDATE
        $permission_database_ref01_data_up0_up = [
            "id" => $permission_database_ref01_data["id"],
            "database_id" => $setup["idmap"]["database_id"],
        ];

        $permission_database_ref01_markdef_up0_name = "description";
        $permission_database_ref01_markdef_up0_value = "Mark01-permission_database_ref01_" . $setup["now"];
        $permission_database_ref01_data_up0_up[$permission_database_ref01_markdef_up0_name] = $permission_database_ref01_markdef_up0_value;

        $permission_database_ref01_resdata_up0_result = $permission_database_ref01_ent->update($permission_database_ref01_data_up0_up, null);
        $permission_database_ref01_resdata_up0 = Helpers::to_map(is_object($permission_database_ref01_resdata_up0_result) && method_exists($permission_database_ref01_resdata_up0_result, 'data_get') ? $permission_database_ref01_resdata_up0_result->data_get() : $permission_database_ref01_resdata_up0_result);
        $this->assertNotNull($permission_database_ref01_resdata_up0);
        $this->assertEquals($permission_database_ref01_resdata_up0["id"], $permission_database_ref01_data_up0_up["id"]);
        $this->assertEquals($permission_database_ref01_resdata_up0[$permission_database_ref01_markdef_up0_name], $permission_database_ref01_markdef_up0_value);

        // LOAD
        $permission_database_ref01_match_dt0 = [
            "id" => $permission_database_ref01_data["id"],
        ];
        $permission_database_ref01_match_dt0["database_id"] = $setup["idmap"]["database_id"] ?? $setup["idmap"]["database01"] ?? null;
        $permission_database_ref01_data_dt0_loaded = $permission_database_ref01_ent->load($permission_database_ref01_match_dt0, null);
        $permission_database_ref01_data_dt0_load_result = Helpers::to_map(is_object($permission_database_ref01_data_dt0_loaded) && method_exists($permission_database_ref01_data_dt0_loaded, 'data_get') ? $permission_database_ref01_data_dt0_loaded->data_get() : $permission_database_ref01_data_dt0_loaded);
        $this->assertNotNull($permission_database_ref01_data_dt0_load_result);
        $this->assertEquals($permission_database_ref01_data_dt0_load_result["id"], $permission_database_ref01_data["id"]);

    }
}

function permission_database_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/permission_database/PermissionDatabaseTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LmUmbrellaSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["permission_database01", "permission_database02", "permission_database03", "database01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID" => $idmap,
        "LM_UMBRELLA_TEST_LIVE" => "FALSE",
        "LM_UMBRELLA_TEST_EXPLAIN" => "FALSE",
        "LM_UMBRELLA_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["database_id"])) {
        $idmap_resolved["database_id"] = $idmap_resolved["database01"];
    }

    if ($env["LM_UMBRELLA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["LM_UMBRELLA_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new LmUmbrellaSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["LM_UMBRELLA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LM_UMBRELLA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
