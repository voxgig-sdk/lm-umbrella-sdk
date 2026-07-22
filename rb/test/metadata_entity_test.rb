# Metadata entity test

require "minitest/autorun"
require "json"
require_relative "../LmUmbrella_sdk"
require_relative "runner"

class MetadataEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmUmbrellaSDK.test(nil, nil)
    ent = testsdk.Metadata(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "metadata" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = LmUmbrellaSDK.test(seed, nil)
    seen = base.Metadata(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = LmUmbrellaConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = LmUmbrellaSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Metadata(nil).stream("list", nil, nil).each do |item|
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
    setup = metadata_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "metadata." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_METADATA_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    metadata_ref01_ent = client.Metadata(nil)
    metadata_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.metadata"), "metadata_ref01"))
    metadata_ref01_data["database_id"] = setup[:idmap]["database01"]

    metadata_ref01_data_result = metadata_ref01_ent.create(metadata_ref01_data, nil)
    metadata_ref01_data = Helpers.to_map(metadata_ref01_data_result)
    assert !metadata_ref01_data.nil?

    # LIST
    metadata_ref01_match = {
      "database_id" => setup[:idmap]["database01"],
    }

    metadata_ref01_list_result = metadata_ref01_ent.list(metadata_ref01_match, nil)
    assert metadata_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(metadata_ref01_list_result),
      { "id" => metadata_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    metadata_ref01_data_up0_up = {
      "database_id" => setup[:idmap]["database_id"],
    }

    metadata_ref01_markdef_up0_name = "created"
    metadata_ref01_markdef_up0_value = "Mark01-metadata_ref01_#{setup[:now]}"
    metadata_ref01_data_up0_up[metadata_ref01_markdef_up0_name] = metadata_ref01_markdef_up0_value

    metadata_ref01_resdata_up0_result = metadata_ref01_ent.update(metadata_ref01_data_up0_up, nil)
    metadata_ref01_resdata_up0 = Helpers.to_map(metadata_ref01_resdata_up0_result)
    assert !metadata_ref01_resdata_up0.nil?
    assert_equal metadata_ref01_resdata_up0[metadata_ref01_markdef_up0_name], metadata_ref01_markdef_up0_value

    # LOAD
    metadata_ref01_match_dt0 = {}
    metadata_ref01_data_dt0_loaded = metadata_ref01_ent.load(metadata_ref01_match_dt0, nil)
    assert !metadata_ref01_data_dt0_loaded.nil?

  end
end

def metadata_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "metadata", "MetadataTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmUmbrellaSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["metadata01", "metadata02", "metadata03", "database01", "database02", "database03"],
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
  entid_env_raw = ENV["LMUMBRELLA_TEST_METADATA_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LMUMBRELLA_TEST_METADATA_ENTID" => idmap,
    "LMUMBRELLA_TEST_LIVE" => "FALSE",
    "LMUMBRELLA_TEST_EXPLAIN" => "FALSE",
    "LMUMBRELLA_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LMUMBRELLA_TEST_METADATA_ENTID"])
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
