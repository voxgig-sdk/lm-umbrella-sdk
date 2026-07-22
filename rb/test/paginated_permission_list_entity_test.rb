# PaginatedPermissionList entity test

require "minitest/autorun"
require "json"
require_relative "../LmUmbrella_sdk"
require_relative "runner"

class PaginatedPermissionListEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmUmbrellaSDK.test(nil, nil)
    ent = testsdk.PaginatedPermissionList(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = paginated_permission_list_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "paginated_permission_list." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    paginated_permission_list_ref01_ent = client.PaginatedPermissionList(nil)
    paginated_permission_list_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.paginated_permission_list"), "paginated_permission_list_ref01"))
    paginated_permission_list_ref01_data["database_id"] = setup[:idmap]["database01"]

    paginated_permission_list_ref01_data_result = paginated_permission_list_ref01_ent.create(paginated_permission_list_ref01_data, nil)
    paginated_permission_list_ref01_data = Helpers.to_map(paginated_permission_list_ref01_data_result)
    assert !paginated_permission_list_ref01_data.nil?

  end
end

def paginated_permission_list_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "paginated_permission_list", "PaginatedPermissionListTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmUmbrellaSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["paginated_permission_list01", "paginated_permission_list02", "paginated_permission_list03", "database01", "database02", "database03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LMUMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LMUMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID" => idmap,
    "LMUMBRELLA_TEST_LIVE" => "FALSE",
    "LMUMBRELLA_TEST_EXPLAIN" => "FALSE",
    "LMUMBRELLA_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LMUMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LMUMBRELLA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["LMUMBRELLA_APIKEY"],
      },
      extra || {},
    ])
    client = LmUmbrellaSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LMUMBRELLA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LMUMBRELLA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
