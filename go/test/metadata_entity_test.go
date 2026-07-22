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

func TestMetadataEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Metadata(nil)
		if ent == nil {
			t.Fatal("expected non-nil MetadataEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"metadata": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Metadata(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.Metadata(nil).Stream("list", nil, nil) {
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
		setup := metadataBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "metadata." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_METADATA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		metadataRef01Ent := client.Metadata(nil)
		metadataRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "metadata"}, setup.data), "metadata_ref01"))
		metadataRef01Data["database_id"] = setup.idmap["database01"]

		metadataRef01DataResult, err := metadataRef01Ent.Create(metadataRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		metadataRef01Data = core.ToMapAny(metadataRef01DataResult)
		if metadataRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		metadataRef01Match := map[string]any{
			"database_id": setup.idmap["database01"],
		}

		metadataRef01ListResult, err := metadataRef01Ent.List(metadataRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		metadataRef01List, metadataRef01ListOk := metadataRef01ListResult.([]any)
		if !metadataRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", metadataRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(metadataRef01List), map[string]any{"id": metadataRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		metadataRef01DataUp0Up := map[string]any{
			"database_id": setup.idmap["database_id"],
		}

		metadataRef01MarkdefUp0Name := "created"
		metadataRef01MarkdefUp0Value := fmt.Sprintf("Mark01-metadata_ref01_%d", setup.now)
		metadataRef01DataUp0Up[metadataRef01MarkdefUp0Name] = metadataRef01MarkdefUp0Value

		metadataRef01ResdataUp0Result, err := metadataRef01Ent.Update(metadataRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		metadataRef01ResdataUp0 := core.ToMapAny(metadataRef01ResdataUp0Result)
		if metadataRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if metadataRef01ResdataUp0[metadataRef01MarkdefUp0Name] != metadataRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", metadataRef01MarkdefUp0Name, metadataRef01ResdataUp0[metadataRef01MarkdefUp0Name])
		}

		// LOAD
		metadataRef01MatchDt0 := map[string]any{}
		metadataRef01DataDt0Loaded, err := metadataRef01Ent.Load(metadataRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if metadataRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func metadataBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "metadata", "MetadataTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read metadata test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse metadata test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"metadata01", "metadata02", "metadata03", "database01", "database02", "database03"},
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
	entidEnvRaw := os.Getenv("LMUMBRELLA_TEST_METADATA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LMUMBRELLA_TEST_METADATA_ENTID": idmap,
		"LMUMBRELLA_TEST_LIVE":      "FALSE",
		"LMUMBRELLA_TEST_EXPLAIN":   "FALSE",
		"LMUMBRELLA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LMUMBRELLA_TEST_METADATA_ENTID"])
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
