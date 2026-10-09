package sdktest

import (
	"encoding/json"
	"fmt"
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
const permissionEntityLiveStrict = true


func TestPermissionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Permission(nil)
		if ent == nil {
			t.Fatal("expected non-nil PermissionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Permission(nil).Update(map[string]any{"database_id": "x", "id": "x"}, nil)
		if sdkerr, ok := err.(*core.LmUmbrellaError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := permissionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "permission." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"database01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, permissionEntityLiveStrict, "Live entity test blocked: needs %s via LM_UMBRELLA_TEST_PERMISSION_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, permissionEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a permission record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		permissionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.permission")))
		var permissionRef01Data map[string]any
		if len(permissionRef01DataRaw) > 0 {
			permissionRef01Data = core.ToMapAny(permissionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = permissionRef01Data

		// UPDATE
		permissionRef01Ent := client.Permission(nil)
		permissionRef01DataUp0Up := map[string]any{
			"id": permissionRef01Data["id"],
			"database_id": setup.idmap["database_id"],
		}

		permissionRef01MarkdefUp0Name := "msisdn"
		permissionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-permission_ref01_%d", setup.now)
		permissionRef01DataUp0Up[permissionRef01MarkdefUp0Name] = permissionRef01MarkdefUp0Value

		permissionRef01ResdataUp0Result, err := permissionRef01Ent.Update(permissionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		permissionRef01ResdataUp0 := core.ToMapAny(entityData(permissionRef01ResdataUp0Result))
		if permissionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if permissionRef01ResdataUp0["id"] != permissionRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if permissionRef01ResdataUp0[permissionRef01MarkdefUp0Name] != permissionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", permissionRef01MarkdefUp0Name, permissionRef01ResdataUp0[permissionRef01MarkdefUp0Name])
		}

	})
}

func permissionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "permission", "PermissionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read permission test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse permission test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"permission01", "permission02", "permission03", "database01", "database02", "database03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("LM_UMBRELLA_TEST_PERMISSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_UMBRELLA_TEST_PERMISSION_ENTID": idmap,
		"LM_UMBRELLA_TEST_LIVE":      "FALSE",
		"LM_UMBRELLA_TEST_EXPLAIN":   "FALSE",
		"LM_UMBRELLA_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_UMBRELLA_TEST_PERMISSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add database_id alias for update test.
	if idmapResolved["database_id"] == nil {
		idmapResolved["database_id"] = idmapResolved["database01"]
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
