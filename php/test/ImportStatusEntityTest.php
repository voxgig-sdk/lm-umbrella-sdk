<?php
declare(strict_types=1);

// ImportStatus entity test

require_once __DIR__ . '/../lmumbrella_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ImportStatusEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LmUmbrellaSDK::test(null, null);
        $ent = $testsdk->ImportStatus(null);
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
                "import_status" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = LmUmbrellaSDK::test($seed, null);
        $seen = iterator_to_array($base->ImportStatus(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = LmUmbrellaConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = LmUmbrellaSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->ImportStatus(null)->stream("list", null, null) as $item) {
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

    public function test_basic_flow(): void
    {
        $setup = import_status_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "import_status." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_IMPORT_STATUS_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $import_status_ref01_ent = $client->ImportStatus(null);
        $import_status_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.import_status"), "import_status_ref01"));
        $import_status_ref01_data["database_id"] = $setup["idmap"]["database01"];

        $import_status_ref01_data_result = $import_status_ref01_ent->create($import_status_ref01_data, null);
        $import_status_ref01_data = Helpers::to_map($import_status_ref01_data_result);
        $this->assertNotNull($import_status_ref01_data);

        // LIST
        $import_status_ref01_match = [
            "database_id" => $setup["idmap"]["database01"],
        ];

        $import_status_ref01_list_result = $import_status_ref01_ent->list($import_status_ref01_match, null);
        $this->assertIsArray($import_status_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($import_status_ref01_list_result),
            ["id" => $import_status_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

    }
}

function import_status_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/import_status/ImportStatusTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LmUmbrellaSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["import_status01", "import_status02", "import_status03", "database01", "database02", "database03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LMUMBRELLA_TEST_IMPORT_STATUS_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LMUMBRELLA_TEST_IMPORT_STATUS_ENTID" => $idmap,
        "LMUMBRELLA_TEST_LIVE" => "FALSE",
        "LMUMBRELLA_TEST_EXPLAIN" => "FALSE",
        "LMUMBRELLA_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LMUMBRELLA_TEST_IMPORT_STATUS_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LMUMBRELLA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["LMUMBRELLA_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new LmUmbrellaSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["LMUMBRELLA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LMUMBRELLA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
