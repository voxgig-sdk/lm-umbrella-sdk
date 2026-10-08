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
const permission_databaseEntityLiveStrict = true


type permission_databaseFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *permission_databaseFailHook) PreSpec(ctx *sdk.Context) {
	panic("permission_database hook failed")
}

func (f *permission_databaseFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestPermissionDatabaseEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PermissionDatabase(nil)
		if ent == nil {
			t.Fatal("expected non-nil PermissionDatabaseEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"permission_database": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.PermissionDatabase(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				t.Fatalf("stream failed: %v", si.Err)
			}
			seen = append(seen, si.Item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for si := range streamSdk.PermissionDatabase(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					t.Fatalf("stream failed: %v", si.Err)
				}
				if sub, ok := si.Item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, si.Item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("stream-error", func(t *testing.T) {
		offline := map[string]any{"net": map[string]any{"offline": true}}
		var streamerr error
		for si := range sdk.TestSDK(offline, nil).PermissionDatabase(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).PermissionDatabase(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.PermissionDatabase(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					denyerr = si.Err
				}
			}
			if sdkerr, ok := denyerr.(*core.LmUmbrellaError); !ok || "rbac_denied" != sdkerr.Code {
				t.Fatalf("expected the rbac denial as a stream value, got %v", denyerr)
			}
		}
	})

	t.Run("stream-ctrl", func(t *testing.T) {
		explain := map[string]any{}
		ctrl := map[string]any{"explain": explain}
		for range sdk.TestSDK(nil, nil).PermissionDatabase(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &permission_databaseFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.PermissionDatabase(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.PermissionDatabase(nil).List(nil, map[string]any{"throw": false}); nil != err {
			t.Fatalf("throw false: expected no error, got %v", err)
		}
		if fired == hook.unexpected {
			t.Fatalf("throw false: PreUnexpected did not fire")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PermissionDatabase(nil).List(map[string]any{"api_key": 1}, nil)
		if sdkerr, ok := err.(*core.LmUmbrellaError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := permission_databaseBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "permission_database." + _op, _mode); _shouldSkip {
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
					liveMiss(t, permission_databaseEntityLiveStrict, "Live entity test blocked: needs %s via LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, permission_databaseEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a permission_database record it did not create")
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		permissionDatabaseRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.permission_database")))
		var permissionDatabaseRef01Data map[string]any
		if len(permissionDatabaseRef01DataRaw) > 0 {
			permissionDatabaseRef01Data = core.ToMapAny(permissionDatabaseRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = permissionDatabaseRef01Data

		// LIST
		permissionDatabaseRef01Ent := client.PermissionDatabase(nil)
		permissionDatabaseRef01Match := map[string]any{}

		permissionDatabaseRef01ListResult, err := permissionDatabaseRef01Ent.List(permissionDatabaseRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, permissionDatabaseRef01ListOk := permissionDatabaseRef01ListResult.([]any)
		if !permissionDatabaseRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", permissionDatabaseRef01ListResult)
		}

		// UPDATE
		permissionDatabaseRef01DataUp0Up := map[string]any{
			"id": permissionDatabaseRef01Data["id"],
			"database_id": setup.idmap["database_id"],
		}

		permissionDatabaseRef01MarkdefUp0Name := "description"
		permissionDatabaseRef01MarkdefUp0Value := fmt.Sprintf("Mark01-permission_database_ref01_%d", setup.now)
		permissionDatabaseRef01DataUp0Up[permissionDatabaseRef01MarkdefUp0Name] = permissionDatabaseRef01MarkdefUp0Value

		permissionDatabaseRef01ResdataUp0Result, err := permissionDatabaseRef01Ent.Update(permissionDatabaseRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		permissionDatabaseRef01ResdataUp0 := core.ToMapAny(entityData(permissionDatabaseRef01ResdataUp0Result))
		if permissionDatabaseRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if permissionDatabaseRef01ResdataUp0["id"] != permissionDatabaseRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if permissionDatabaseRef01ResdataUp0[permissionDatabaseRef01MarkdefUp0Name] != permissionDatabaseRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", permissionDatabaseRef01MarkdefUp0Name, permissionDatabaseRef01ResdataUp0[permissionDatabaseRef01MarkdefUp0Name])
		}

		// LOAD
		permissionDatabaseRef01MatchDt0 := map[string]any{
			"id": permissionDatabaseRef01Data["id"],
		}
		permissionDatabaseRef01DataDt0Loaded, err := permissionDatabaseRef01Ent.Load(permissionDatabaseRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		permissionDatabaseRef01DataDt0LoadResult := core.ToMapAny(entityData(permissionDatabaseRef01DataDt0Loaded))
		if permissionDatabaseRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if permissionDatabaseRef01DataDt0LoadResult["id"] != permissionDatabaseRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func permission_databaseBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "permission_database", "PermissionDatabaseTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read permission_database test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse permission_database test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"permission_database01", "permission_database02", "permission_database03", "database01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID": idmap,
		"LM_UMBRELLA_TEST_LIVE":      "FALSE",
		"LM_UMBRELLA_TEST_EXPLAIN":   "FALSE",
		"LM_UMBRELLA_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID"])
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
