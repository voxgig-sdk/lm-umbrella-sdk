<?php
declare(strict_types=1);

// PaginatedPermissionList entity test

require_once __DIR__ . '/../lmumbrella_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PaginatedPermissionListEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = LmUmbrellaSDK::test(null, null);
        $ent = $testsdk->PaginatedPermissionList(null);
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
            $client->PaginatedPermissionList(null)->create(["database_id" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = paginated_permission_list_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "paginated_permission_list." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"])) {
            foreach (["database01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // CREATE
        $paginated_permission_list_ref01_ent = $client->PaginatedPermissionList(null);
        $paginated_permission_list_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.paginated_permission_list"), "paginated_permission_list_ref01"));
        $paginated_permission_list_ref01_data["database_id"] = $setup["idmap"]["database01"];

        $paginated_permission_list_ref01_data_result = $paginated_permission_list_ref01_ent->create($paginated_permission_list_ref01_data, null);
        $paginated_permission_list_ref01_data = Helpers::to_map(is_object($paginated_permission_list_ref01_data_result) && method_exists($paginated_permission_list_ref01_data_result, 'data_get') ? $paginated_permission_list_ref01_data_result->data_get() : $paginated_permission_list_ref01_data_result);
        $this->assertNotNull($paginated_permission_list_ref01_data);

    }
}

function paginated_permission_list_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/paginated_permission_list/PaginatedPermissionListTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LmUmbrellaSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["paginated_permission_list01", "paginated_permission_list02", "paginated_permission_list03", "database01", "database02", "database03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID" => $idmap,
        "LM_UMBRELLA_TEST_LIVE" => "FALSE",
        "LM_UMBRELLA_TEST_EXPLAIN" => "FALSE",
        "LM_UMBRELLA_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID"]);
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
