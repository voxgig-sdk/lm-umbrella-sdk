-- PermissionDatabase entity test

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


local BaseFeature = require("feature.base_feature")

local FailHook = {}
FailHook.__index = FailHook
setmetatable(FailHook, { __index = BaseFeature })

function FailHook.new()
  local self = setmetatable(BaseFeature.new(), FailHook)
  self.name = "failhook"
  self.unexpected = 0
  return self
end

function FailHook:init(_ctx, _options) end
function FailHook:PreSpec(_ctx) error("permission_database hook failed") end
function FailHook:PreUnexpected(_ctx) self.unexpected = self.unexpected + 1 end

local function errtext(err)
  if type(err) == "table" then
    return tostring(err.msg or err.message or "")
  end
  return tostring(err)
end

describe("PermissionDatabaseEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:PermissionDatabase(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["permission_database"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:PermissionDatabase(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:PermissionDatabase(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should report a failed stream", function()
    local offline = { net = { offline = true } }
    local ok, err = pcall(function()
      for _ in sdk.test(offline, nil):PermissionDatabase(nil):stream("list", nil, nil) do end
    end)
    assert.is_false(ok)
    assert.truthy(string.find(errtext(err), "offline", 1, true))

    for _ in sdk.test(offline, nil):PermissionDatabase(nil):stream("list", nil, { ctrl = { throw = false } }) do end

    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.rbac ~= nil then
      local denied = sdk.test(nil, { feature = { rbac = { active = true, deny = true } } })
      local dok, derr = pcall(function()
        for _ in denied:PermissionDatabase(nil):stream("list", nil, nil) do end
      end)
      assert.is_false(dok)
      assert.are.equal("rbac_denied", type(derr) == "table" and derr.code or nil)
    end
  end)

  it("should leave the caller's ctrl", function()
    local explain = {}
    local ctrl = { explain = explain }
    for _ in sdk.test(nil, nil):PermissionDatabase(nil):stream("list", nil, { ctrl = ctrl }) do end
    assert.is_nil(ctrl.stream)
    assert.are.equal(explain, ctrl.explain)
    assert.is_not_nil(next(explain))
  end)

  it("should fire PreUnexpected", function()
    local hook = FailHook.new()
    local client = sdk.new({ feature = { test = { active = true } }, extend = { hook } })

    local out, err = client:PermissionDatabase(nil):list(nil, nil)
    assert.is_nil(out)
    assert.truthy(string.find(errtext(err), "hook failed", 1, true))
    assert.is_true(hook.unexpected > 0)

    local fired = hook.unexpected
    out, err = client:PermissionDatabase(nil):list(nil, { throw = false })
    assert.is_nil(err)
    assert.is_true(hook.unexpected > fired)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:PermissionDatabase(nil):list({ ["api_key"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = permission_database_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "permission_database." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _, _live_key in ipairs({"database01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID")
        end
      end
    end
    if setup.live then
      runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: " .. "the flow updates a permission_database record it did not create")
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local permission_database_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.permission_database")))
    local permission_database_ref01_data = nil
    if #permission_database_ref01_data_raw > 0 then
      permission_database_ref01_data = helpers.to_map(permission_database_ref01_data_raw[1][2])
    end

    -- LIST
    local permission_database_ref01_ent = client:PermissionDatabase(nil)
    local permission_database_ref01_match = {}

    local permission_database_ref01_list_result, err = permission_database_ref01_ent:list(permission_database_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(permission_database_ref01_list_result)

    -- UPDATE
    local permission_database_ref01_data_up0_up = {
      id = permission_database_ref01_data["id"],
      ["database_id"] = setup.idmap["database_id"],
    }

    local permission_database_ref01_markdef_up0_name = "description"
    local permission_database_ref01_markdef_up0_value = "Mark01-permission_database_ref01_" .. tostring(setup.now)
    permission_database_ref01_data_up0_up[permission_database_ref01_markdef_up0_name] = permission_database_ref01_markdef_up0_value

    local permission_database_ref01_resdata_up0_result, err = permission_database_ref01_ent:update(permission_database_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local permission_database_ref01_resdata_up0 = helpers.to_map(type(permission_database_ref01_resdata_up0_result) == 'table' and permission_database_ref01_resdata_up0_result.data_get and permission_database_ref01_resdata_up0_result:data_get() or permission_database_ref01_resdata_up0_result)
    assert.is_not_nil(permission_database_ref01_resdata_up0)
    assert.are.equal(permission_database_ref01_resdata_up0["id"], permission_database_ref01_data_up0_up["id"])
    assert.are.equal(permission_database_ref01_resdata_up0[permission_database_ref01_markdef_up0_name], permission_database_ref01_markdef_up0_value)

    -- LOAD
    local permission_database_ref01_match_dt0 = {
      id = permission_database_ref01_data["id"],
    }
    local permission_database_ref01_data_dt0_loaded, err = permission_database_ref01_ent:load(permission_database_ref01_match_dt0, nil)
    assert.is_nil(err)
    local permission_database_ref01_data_dt0_load_result = helpers.to_map(type(permission_database_ref01_data_dt0_loaded) == 'table' and permission_database_ref01_data_dt0_loaded.data_get and permission_database_ref01_data_dt0_loaded:data_get() or permission_database_ref01_data_dt0_loaded)
    assert.is_not_nil(permission_database_ref01_data_dt0_load_result)
    assert.are.equal(permission_database_ref01_data_dt0_load_result["id"], permission_database_ref01_data["id"])

  end)
end)

function permission_database_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/permission_database/PermissionDatabaseTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read permission_database test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "permission_database01", "permission_database02", "permission_database03", "database01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID"] = idmap,
    ["LM_UMBRELLA_TEST_LIVE"] = "FALSE",
    ["LM_UMBRELLA_TEST_EXPLAIN"] = "FALSE",
    ["LM_UMBRELLA_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["database_id"] == nil then
    idmap_resolved["database_id"] = idmap_resolved["database01"]
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
