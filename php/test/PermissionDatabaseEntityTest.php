<?php
declare(strict_types=1);

// PermissionDatabase entity test

require_once __DIR__ . '/../lmumbrella_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PermissionDatabaseEntityTest extends TestCase
{
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
        $cfg = LmUmbrellaConfig::make_config();
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
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID JSON to run live");
            return;
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
        $permission_database_ref01_resdata_up0 = Helpers::to_map($permission_database_ref01_resdata_up0_result);
        $this->assertNotNull($permission_database_ref01_resdata_up0);
        $this->assertEquals($permission_database_ref01_resdata_up0["id"], $permission_database_ref01_data_up0_up["id"]);
        $this->assertEquals($permission_database_ref01_resdata_up0[$permission_database_ref01_markdef_up0_name], $permission_database_ref01_markdef_up0_value);

        // LOAD
        $permission_database_ref01_match_dt0 = [
            "id" => $permission_database_ref01_data["id"],
        ];
        $permission_database_ref01_data_dt0_loaded = $permission_database_ref01_ent->load($permission_database_ref01_match_dt0, null);
        $permission_database_ref01_data_dt0_load_result = Helpers::to_map($permission_database_ref01_data_dt0_loaded);
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

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID" => $idmap,
        "LMUMBRELLA_TEST_LIVE" => "FALSE",
        "LMUMBRELLA_TEST_EXPLAIN" => "FALSE",
        "LMUMBRELLA_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["database_id"])) {
        $idmap_resolved["database_id"] = $idmap_resolved["database01"];
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
