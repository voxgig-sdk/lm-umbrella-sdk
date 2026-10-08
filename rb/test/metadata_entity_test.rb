# Metadata entity test

require "minitest/autorun"
require "json"
require_relative "../LmUmbrella_sdk"
require_relative "runner"

class MetadataEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = LmUmbrellaSDK.test(nil, nil)
    ent = testsdk.Metadata(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = LmUmbrellaConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = LmUmbrellaSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Metadata(nil).list({ "database_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = metadata_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "metadata." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["database01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via LM_UMBRELLA_TEST_METADATA_ENTID")
        end
      end
    end
    client = setup[:client]

    # CREATE
    metadata_ref01_ent = client.Metadata(nil)
    metadata_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.metadata"), "metadata_ref01"))
    metadata_ref01_data["database_id"] = setup[:idmap]["database01"]

    metadata_ref01_data_result = metadata_ref01_ent.create(metadata_ref01_data, nil)
    metadata_ref01_data = Helpers.to_map(metadata_ref01_data_result.respond_to?(:data_get) ? metadata_ref01_data_result.data_get : metadata_ref01_data_result)
    assert !metadata_ref01_data.nil?
    assert !metadata_ref01_data["id"].nil?

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
      "id" => metadata_ref01_data["id"],
      "database_id" => setup[:idmap]["database_id"],
    }

    metadata_ref01_markdef_up0_name = "key"
    metadata_ref01_markdef_up0_value = "Mark01-metadata_ref01_#{setup[:now]}"
    metadata_ref01_data_up0_up[metadata_ref01_markdef_up0_name] = metadata_ref01_markdef_up0_value

    metadata_ref01_resdata_up0_result = metadata_ref01_ent.update(metadata_ref01_data_up0_up, nil)
    metadata_ref01_resdata_up0 = Helpers.to_map(metadata_ref01_resdata_up0_result.respond_to?(:data_get) ? metadata_ref01_resdata_up0_result.data_get : metadata_ref01_resdata_up0_result)
    assert !metadata_ref01_resdata_up0.nil?
    assert_equal metadata_ref01_resdata_up0["id"], metadata_ref01_data_up0_up["id"]
    assert_equal metadata_ref01_resdata_up0[metadata_ref01_markdef_up0_name], metadata_ref01_markdef_up0_value

    # LOAD
    metadata_ref01_match_dt0 = {
      "id" => metadata_ref01_data["id"],
    }
    metadata_ref01_data_dt0_loaded = metadata_ref01_ent.load(metadata_ref01_match_dt0, nil)
    metadata_ref01_data_dt0_load_result = Helpers.to_map(metadata_ref01_data_dt0_loaded.respond_to?(:data_get) ? metadata_ref01_data_dt0_loaded.data_get : metadata_ref01_data_dt0_loaded)
    assert !metadata_ref01_data_dt0_load_result.nil?
    assert_equal metadata_ref01_data_dt0_load_result["id"], metadata_ref01_data["id"]

    # REMOVE
    metadata_ref01_match_rm0 = {
      "id" => metadata_ref01_data["id"],
    }
    metadata_ref01_ent.remove(metadata_ref01_match_rm0, nil)

    # LIST
    metadata_ref01_match_rt0 = {
      "database_id" => setup[:idmap]["database01"],
    }

    metadata_ref01_list_rt0_result = metadata_ref01_ent.list(metadata_ref01_match_rt0, nil)
    assert metadata_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(metadata_ref01_list_rt0_result),
      { "id" => metadata_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def metadata_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "metadata", "MetadataTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["LM_UMBRELLA_TEST_METADATA_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LM_UMBRELLA_TEST_METADATA_ENTID" => idmap,
    "LM_UMBRELLA_TEST_LIVE" => "FALSE",
    "LM_UMBRELLA_TEST_EXPLAIN" => "FALSE",
    "LM_UMBRELLA_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["LM_UMBRELLA_TEST_METADATA_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["database_id"].nil?
    idmap_resolved["database_id"] = idmap_resolved["database01"]
  end

  if env["LM_UMBRELLA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["LM_UMBRELLA_APIKEY"],
      },
      extra || {},
    ])
    client = LmUmbrellaSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LM_UMBRELLA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LM_UMBRELLA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
