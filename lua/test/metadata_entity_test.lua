-- Metadata entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("lm-umbrella_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("MetadataEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Metadata(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["metadata"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:Metadata(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:Metadata(nil):stream("list", nil, nil) do
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

  it("should run basic flow", function()
    local setup = metadata_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "metadata." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_METADATA_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local metadata_ref01_ent = client:Metadata(nil)
    local metadata_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.metadata"), "metadata_ref01"))
    metadata_ref01_data["database_id"] = setup.idmap["database01"]

    local metadata_ref01_data_result, err = metadata_ref01_ent:create(metadata_ref01_data, nil)
    assert.is_nil(err)
    metadata_ref01_data = helpers.to_map(metadata_ref01_data_result)
    assert.is_not_nil(metadata_ref01_data)

    -- LIST
    local metadata_ref01_match = {
      ["database_id"] = setup.idmap["database01"],
    }

    local metadata_ref01_list_result, err = metadata_ref01_ent:list(metadata_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(metadata_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(metadata_ref01_list_result),
      { id = metadata_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- UPDATE
    local metadata_ref01_data_up0_up = {
      ["database_id"] = setup.idmap["database_id"],
    }

    local metadata_ref01_markdef_up0_name = "created"
    local metadata_ref01_markdef_up0_value = "Mark01-metadata_ref01_" .. tostring(setup.now)
    metadata_ref01_data_up0_up[metadata_ref01_markdef_up0_name] = metadata_ref01_markdef_up0_value

    local metadata_ref01_resdata_up0_result, err = metadata_ref01_ent:update(metadata_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local metadata_ref01_resdata_up0 = helpers.to_map(metadata_ref01_resdata_up0_result)
    assert.is_not_nil(metadata_ref01_resdata_up0)
    assert.are.equal(metadata_ref01_resdata_up0[metadata_ref01_markdef_up0_name], metadata_ref01_markdef_up0_value)

    -- LOAD
    local metadata_ref01_match_dt0 = {}
    local metadata_ref01_data_dt0_loaded, err = metadata_ref01_ent:load(metadata_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(metadata_ref01_data_dt0_loaded)

  end)
end)

function metadata_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/metadata/MetadataTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read metadata test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "metadata01", "metadata02", "metadata03", "database01", "database02", "database03" },
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
  local entid_env_raw = os.getenv("LMUMBRELLA_TEST_METADATA_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["LMUMBRELLA_TEST_METADATA_ENTID"] = idmap,
    ["LMUMBRELLA_TEST_LIVE"] = "FALSE",
    ["LMUMBRELLA_TEST_EXPLAIN"] = "FALSE",
    ["LMUMBRELLA_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["LMUMBRELLA_TEST_METADATA_ENTID"])
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
