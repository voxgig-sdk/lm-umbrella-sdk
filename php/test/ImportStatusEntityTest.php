<?php
declare(strict_types=1);

// ImportStatus entity test

require_once __DIR__ . '/../lmumbrella_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ImportStatusEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = LmUmbrellaSDK::test(null, null);
        $ent = $testsdk->ImportStatus(null);
        $this->assertNotNull($ent);
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
            $client->ImportStatus(null)->list(["database_id" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
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
        if (!empty($setup["live"])) {
            foreach (["database01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // CREATE
        $import_status_ref01_ent = $client->ImportStatus(null);
        $import_status_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.import_status"), "import_status_ref01"));
        $import_status_ref01_data["database_id"] = $setup["idmap"]["database01"];

        $import_status_ref01_data_result = $import_status_ref01_ent->create($import_status_ref01_data, null);
        $import_status_ref01_data = Helpers::to_map(is_object($import_status_ref01_data_result) && method_exists($import_status_ref01_data_result, 'data_get') ? $import_status_ref01_data_result->data_get() : $import_status_ref01_data_result);
        $this->assertNotNull($import_status_ref01_data);

        // LIST
        $import_status_ref01_match = [
            "database_id" => $setup["idmap"]["database01"],
        ];

        $import_status_ref01_list_result = $import_status_ref01_ent->list($import_status_ref01_match, null);
        $this->assertIsArray($import_status_ref01_list_result);

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

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID" => $idmap,
        "LM_UMBRELLA_TEST_LIVE" => "FALSE",
        "LM_UMBRELLA_TEST_EXPLAIN" => "FALSE",
        "LM_UMBRELLA_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
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
