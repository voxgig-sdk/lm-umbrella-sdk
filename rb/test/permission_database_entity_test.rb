# PermissionDatabase entity test

require "minitest/autorun"
require "json"
require_relative "../LmUmbrella_sdk"
require_relative "runner"

class PermissionDatabaseEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmUmbrellaSDK.test(nil, nil)
    ent = testsdk.PermissionDatabase(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "permission_database" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = LmUmbrellaSDK.test(seed, nil)
    seen = base.PermissionDatabase(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = LmUmbrellaConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = LmUmbrellaSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.PermissionDatabase(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = permission_database_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "permission_database." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    permission_database_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.permission_database")))
    permission_database_ref01_data = nil
    if permission_database_ref01_data_raw.length > 0
      permission_database_ref01_data = Helpers.to_map(permission_database_ref01_data_raw[0][1])
    end

    # LIST
    permission_database_ref01_ent = client.PermissionDatabase(nil)
    permission_database_ref01_match = {}

    permission_database_ref01_list_result = permission_database_ref01_ent.list(permission_database_ref01_match, nil)
    assert permission_database_ref01_list_result.is_a?(Array)

    # UPDATE
    permission_database_ref01_data_up0_up = {
      "id" => permission_database_ref01_data["id"],
      "database_id" => setup[:idmap]["database_id"],
    }

    permission_database_ref01_markdef_up0_name = "description"
    permission_database_ref01_markdef_up0_value = "Mark01-permission_database_ref01_#{setup[:now]}"
    permission_database_ref01_data_up0_up[permission_database_ref01_markdef_up0_name] = permission_database_ref01_markdef_up0_value

    permission_database_ref01_resdata_up0_result = permission_database_ref01_ent.update(permission_database_ref01_data_up0_up, nil)
    permission_database_ref01_resdata_up0 = Helpers.to_map(permission_database_ref01_resdata_up0_result)
    assert !permission_database_ref01_resdata_up0.nil?
    assert_equal permission_database_ref01_resdata_up0["id"], permission_database_ref01_data_up0_up["id"]
    assert_equal permission_database_ref01_resdata_up0[permission_database_ref01_markdef_up0_name], permission_database_ref01_markdef_up0_value

    # LOAD
    permission_database_ref01_match_dt0 = {
      "id" => permission_database_ref01_data["id"],
    }
    permission_database_ref01_data_dt0_loaded = permission_database_ref01_ent.load(permission_database_ref01_match_dt0, nil)
    permission_database_ref01_data_dt0_load_result = Helpers.to_map(permission_database_ref01_data_dt0_loaded)
    assert !permission_database_ref01_data_dt0_load_result.nil?
    assert_equal permission_database_ref01_data_dt0_load_result["id"], permission_database_ref01_data["id"]

  end
end

def permission_database_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "permission_database", "PermissionDatabaseTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmUmbrellaSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["permission_database01", "permission_database02", "permission_database03", "database01"],
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
  entid_env_raw = ENV["LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID" => idmap,
    "LMUMBRELLA_TEST_LIVE" => "FALSE",
    "LMUMBRELLA_TEST_EXPLAIN" => "FALSE",
    "LMUMBRELLA_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["database_id"].nil?
    idmap_resolved["database_id"] = idmap_resolved["database01"]
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
