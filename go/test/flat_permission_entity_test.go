package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/lm-umbrella-sdk/go"
	"github.com/voxgig-sdk/lm-umbrella-sdk/go/core"

	vs "github.com/voxgig-sdk/lm-umbrella-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const flat_permissionEntityLiveStrict = true


func TestFlatPermissionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.FlatPermission(nil)
		if ent == nil {
			t.Fatal("expected non-nil FlatPermissionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.FlatPermission(nil).Load(map[string]any{"database_id": "x", "id": "x"}, nil)
		if sdkerr, ok := err.(*core.LmUmbrellaError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := flat_permissionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "flat_permission." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			liveMiss(t, flat_permissionEntityLiveStrict, "Live entity test blocked: %s", "the flow loads a flat_permission record it has no list to find")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		flatPermissionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.flat_permission")))
		var flatPermissionRef01Data map[string]any
		if len(flatPermissionRef01DataRaw) > 0 {
			flatPermissionRef01Data = core.ToMapAny(flatPermissionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = flatPermissionRef01Data

		// LOAD
		flatPermissionRef01Ent := client.FlatPermission(nil)
		flatPermissionRef01MatchDt0 := map[string]any{
			"id": flatPermissionRef01Data["id"],
		}
		if v := setup.idmap["database_id"]; v != nil {
			flatPermissionRef01MatchDt0["database_id"] = v
		} else {
			flatPermissionRef01MatchDt0["database_id"] = setup.idmap["database01"]
		}
		flatPermissionRef01DataDt0Loaded, err := flatPermissionRef01Ent.Load(flatPermissionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		flatPermissionRef01DataDt0LoadResult := core.ToMapAny(entityData(flatPermissionRef01DataDt0Loaded))
		if flatPermissionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if flatPermissionRef01DataDt0LoadResult["id"] != flatPermissionRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func flat_permissionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "flat_permission", "FlatPermissionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read flat_permission test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse flat_permission test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"flat_permission01", "flat_permission02", "flat_permission03", "database01", "database02", "database03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("LM_UMBRELLA_TEST_FLAT_PERMISSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_UMBRELLA_TEST_FLAT_PERMISSION_ENTID": idmap,
		"LM_UMBRELLA_TEST_LIVE":      "FALSE",
		"LM_UMBRELLA_TEST_EXPLAIN":   "FALSE",
		"LM_UMBRELLA_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_UMBRELLA_TEST_FLAT_PERMISSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LM_UMBRELLA_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["LM_UMBRELLA_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewLmUmbrellaSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LM_UMBRELLA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LM_UMBRELLA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
