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

func TestFlattenedPermissionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.FlattenedPermission(nil)
		if ent == nil {
			t.Fatal("expected non-nil FlattenedPermissionEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"flattened_permission": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.FlattenedPermission(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.FlattenedPermission(nil).Stream("list", nil, nil) {
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
		setup := flattened_permissionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "flattened_permission." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_FLATTENED_PERMISSION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		flattenedPermissionRef01Ent := client.FlattenedPermission(nil)
		flattenedPermissionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "flattened_permission"}, setup.data), "flattened_permission_ref01"))
		flattenedPermissionRef01Data["database_id"] = setup.idmap["database01"]
		flattenedPermissionRef01Data["msisdn"] = setup.idmap["msisdn01"]

		flattenedPermissionRef01DataResult, err := flattenedPermissionRef01Ent.Create(flattenedPermissionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		flattenedPermissionRef01Data = core.ToMapAny(flattenedPermissionRef01DataResult)
		if flattenedPermissionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		flattenedPermissionRef01Match := map[string]any{
			"database_id": setup.idmap["database01"],
		}

		flattenedPermissionRef01ListResult, err := flattenedPermissionRef01Ent.List(flattenedPermissionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		flattenedPermissionRef01List, flattenedPermissionRef01ListOk := flattenedPermissionRef01ListResult.([]any)
		if !flattenedPermissionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", flattenedPermissionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(flattenedPermissionRef01List), map[string]any{"id": flattenedPermissionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		flattenedPermissionRef01MatchDt0 := map[string]any{}
		flattenedPermissionRef01DataDt0Loaded, err := flattenedPermissionRef01Ent.Load(flattenedPermissionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if flattenedPermissionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func flattened_permissionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "flattened_permission", "FlattenedPermissionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read flattened_permission test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse flattened_permission test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"flattened_permission01", "flattened_permission02", "flattened_permission03", "database01", "database02", "database03", "msisdn01"},
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
	entidEnvRaw := os.Getenv("LMUMBRELLA_TEST_FLATTENED_PERMISSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LMUMBRELLA_TEST_FLATTENED_PERMISSION_ENTID": idmap,
		"LMUMBRELLA_TEST_LIVE":      "FALSE",
		"LMUMBRELLA_TEST_EXPLAIN":   "FALSE",
		"LMUMBRELLA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LMUMBRELLA_TEST_FLATTENED_PERMISSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
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
