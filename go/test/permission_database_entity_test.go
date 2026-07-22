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
		for item := range base.PermissionDatabase(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.PermissionDatabase(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
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
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		permissionDatabaseRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.permission_database", setup.data)))
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
		permissionDatabaseRef01ResdataUp0 := core.ToMapAny(permissionDatabaseRef01ResdataUp0Result)
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
		permissionDatabaseRef01DataDt0LoadResult := core.ToMapAny(permissionDatabaseRef01DataDt0Loaded)
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
	idmap := vs.Transform(
		[]any{"permission_database01", "permission_database02", "permission_database03", "database01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID": idmap,
		"LMUMBRELLA_TEST_LIVE":      "FALSE",
		"LMUMBRELLA_TEST_EXPLAIN":   "FALSE",
		"LMUMBRELLA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LMUMBRELLA_TEST_PERMISSION_DATABASE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add database_id alias for update test.
	if idmapResolved["database_id"] == nil {
		idmapResolved["database_id"] = idmapResolved["database01"]
	}

	if env["LMUMBRELLA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LMUMBRELLA_APIKEY"],
			},
			extra,
		})
		client = sdk.NewLmUmbrellaSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LMUMBRELLA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LMUMBRELLA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
