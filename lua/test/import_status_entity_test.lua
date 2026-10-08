-- ImportStatus entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("lm-umbrella_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("ImportStatusEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ImportStatus(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:ImportStatus(nil):list({ ["database_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = import_status_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "import_status." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _, _live_key in ipairs({"database01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID")
        end
      end
    end
    local client = setup.client

    -- CREATE
    local import_status_ref01_ent = client:ImportStatus(nil)
    local import_status_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.import_status"), "import_status_ref01"))
    import_status_ref01_data["database_id"] = setup.idmap["database01"]

    local import_status_ref01_data_result, err = import_status_ref01_ent:create(import_status_ref01_data, nil)
    assert.is_nil(err)
    import_status_ref01_data = helpers.to_map(type(import_status_ref01_data_result) == 'table' and import_status_ref01_data_result.data_get and import_status_ref01_data_result:data_get() or import_status_ref01_data_result)
    assert.is_not_nil(import_status_ref01_data)

    -- LIST
    local import_status_ref01_match = {
      ["database_id"] = setup.idmap["database01"],
    }

    local import_status_ref01_list_result, err = import_status_ref01_ent:list(import_status_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(import_status_ref01_list_result)

  end)
end)

function import_status_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/import_status/ImportStatusTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read import_status test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "import_status01", "import_status02", "import_status03", "database01", "database02", "database03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID"] = idmap,
    ["LM_UMBRELLA_TEST_LIVE"] = "FALSE",
    ["LM_UMBRELLA_TEST_EXPLAIN"] = "FALSE",
    ["LM_UMBRELLA_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["LM_UMBRELLA_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["LM_UMBRELLA_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["LM_UMBRELLA_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["LM_UMBRELLA_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
