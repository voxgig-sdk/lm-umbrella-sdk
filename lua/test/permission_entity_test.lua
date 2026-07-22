-- Permission entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("lm-umbrella_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("PermissionEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Permission(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = permission_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "permission." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_PERMISSION_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local permission_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.permission")))
    local permission_ref01_data = nil
    if #permission_ref01_data_raw > 0 then
      permission_ref01_data = helpers.to_map(permission_ref01_data_raw[1][2])
    end

    -- UPDATE
    local permission_ref01_ent = client:Permission(nil)
    local permission_ref01_data_up0_up = {
      ["database_id"] = setup.idmap["database_id"],
    }

    local permission_ref01_markdef_up0_name = "msisdn"
    local permission_ref01_markdef_up0_value = "Mark01-permission_ref01_" .. tostring(setup.now)
    permission_ref01_data_up0_up[permission_ref01_markdef_up0_name] = permission_ref01_markdef_up0_value

    local permission_ref01_resdata_up0_result, err = permission_ref01_ent:update(permission_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local permission_ref01_resdata_up0 = helpers.to_map(permission_ref01_resdata_up0_result)
    assert.is_not_nil(permission_ref01_resdata_up0)
    assert.are.equal(permission_ref01_resdata_up0[permission_ref01_markdef_up0_name], permission_ref01_markdef_up0_value)

  end)
end)

function permission_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/permission/PermissionTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read permission test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "permission01", "permission02", "permission03", "database01", "database02", "database03", "permanent01", "permanent02", "permanent03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("LMUMBRELLA_TEST_PERMISSION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["LMUMBRELLA_TEST_PERMISSION_ENTID"] = idmap,
    ["LMUMBRELLA_TEST_LIVE"] = "FALSE",
    ["LMUMBRELLA_TEST_EXPLAIN"] = "FALSE",
    ["LMUMBRELLA_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["LMUMBRELLA_TEST_PERMISSION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["database_id"] == nil then
    idmap_resolved["database_id"] = idmap_resolved["database01"]
  end

  if env["LMUMBRELLA_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["LMUMBRELLA_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["LMUMBRELLA_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["LMUMBRELLA_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
