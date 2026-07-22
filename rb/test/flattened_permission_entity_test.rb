# FlattenedPermission entity test

require "minitest/autorun"
require "json"
require_relative "../LmUmbrella_sdk"
require_relative "runner"

class FlattenedPermissionEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmUmbrellaSDK.test(nil, nil)
    ent = testsdk.FlattenedPermission(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "flattened_permission" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = LmUmbrellaSDK.test(seed, nil)
    seen = base.FlattenedPermission(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = LmUmbrellaConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = LmUmbrellaSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.FlattenedPermission(nil).stream("list", nil, nil).each do |item|
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
    setup = flattened_permission_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "flattened_permission." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_FLATTENED_PERMISSION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    flattened_permission_ref01_ent = client.FlattenedPermission(nil)
    flattened_permission_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.flattened_permission"), "flattened_permission_ref01"))
    flattened_permission_ref01_data["database_id"] = setup[:idmap]["database01"]
    flattened_permission_ref01_data["msisdn"] = setup[:idmap]["msisdn01"]

    flattened_permission_ref01_data_result = flattened_permission_ref01_ent.create(flattened_permission_ref01_data, nil)
    flattened_permission_ref01_data = Helpers.to_map(flattened_permission_ref01_data_result)
    assert !flattened_permission_ref01_data.nil?

    # LIST
    flattened_permission_ref01_match = {
      "database_id" => setup[:idmap]["database01"],
    }

    flattened_permission_ref01_list_result = flattened_permission_ref01_ent.list(flattened_permission_ref01_match, nil)
    assert flattened_permission_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(flattened_permission_ref01_list_result),
      { "id" => flattened_permission_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    flattened_permission_ref01_match_dt0 = {}
    flattened_permission_ref01_data_dt0_loaded = flattened_permission_ref01_ent.load(flattened_permission_ref01_match_dt0, nil)
    assert !flattened_permission_ref01_data_dt0_loaded.nil?

  end
end

def flattened_permission_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "flattened_permission", "FlattenedPermissionTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmUmbrellaSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["flattened_permission01", "flattened_permission02", "flattened_permission03", "database01", "database02", "database03", "msisdn01"],
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
  entid_env_raw = ENV["LMUMBRELLA_TEST_FLATTENED_PERMISSION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LMUMBRELLA_TEST_FLATTENED_PERMISSION_ENTID" => idmap,
    "LMUMBRELLA_TEST_LIVE" => "FALSE",
    "LMUMBRELLA_TEST_EXPLAIN" => "FALSE",
    "LMUMBRELLA_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LMUMBRELLA_TEST_FLATTENED_PERMISSION_ENTID"])
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
