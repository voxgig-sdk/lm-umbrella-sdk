# Permission entity test

require "minitest/autorun"
require "json"
require_relative "../LmUmbrella_sdk"
require_relative "runner"

class PermissionEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = LmUmbrellaSDK.test(nil, nil)
    ent = testsdk.Permission(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = LmUmbrellaConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = LmUmbrellaSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Permission(nil).update({ "database_id" => "x", "id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = permission_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "permission." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["database01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via LM_UMBRELLA_TEST_PERMISSION_ENTID")
        end
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a permission record it did not create")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    permission_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.permission")))
    permission_ref01_data = nil
    if permission_ref01_data_raw.length > 0
      permission_ref01_data = Helpers.to_map(permission_ref01_data_raw[0][1])
    end

    # UPDATE
    permission_ref01_ent = client.Permission(nil)
    permission_ref01_data_up0_up = {
      "id" => permission_ref01_data["id"],
      "database_id" => setup[:idmap]["database_id"],
    }

    permission_ref01_markdef_up0_name = "msisdn"
    permission_ref01_markdef_up0_value = "Mark01-permission_ref01_#{setup[:now]}"
    permission_ref01_data_up0_up[permission_ref01_markdef_up0_name] = permission_ref01_markdef_up0_value

    permission_ref01_resdata_up0_result = permission_ref01_ent.update(permission_ref01_data_up0_up, nil)
    permission_ref01_resdata_up0 = Helpers.to_map(permission_ref01_resdata_up0_result.respond_to?(:data_get) ? permission_ref01_resdata_up0_result.data_get : permission_ref01_resdata_up0_result)
    assert !permission_ref01_resdata_up0.nil?
    assert_equal permission_ref01_resdata_up0["id"], permission_ref01_data_up0_up["id"]
    assert_equal permission_ref01_resdata_up0[permission_ref01_markdef_up0_name], permission_ref01_markdef_up0_value

  end
end

def permission_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "permission", "PermissionTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmUmbrellaSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["permission01", "permission02", "permission03", "database01", "database02", "database03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["LM_UMBRELLA_TEST_PERMISSION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LM_UMBRELLA_TEST_PERMISSION_ENTID" => idmap,
    "LM_UMBRELLA_TEST_LIVE" => "FALSE",
    "LM_UMBRELLA_TEST_EXPLAIN" => "FALSE",
    "LM_UMBRELLA_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["LM_UMBRELLA_TEST_PERMISSION_ENTID"])
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
