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
const metadataEntityLiveStrict = true


func TestMetadataEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Metadata(nil)
		if ent == nil {
			t.Fatal("expected non-nil MetadataEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Metadata(nil).List(map[string]any{"database_id": "x"}, nil)
		if sdkerr, ok := err.(*core.LmUmbrellaError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := metadataBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "metadata." + _op, _mode); _shouldSkip {
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
					liveMiss(t, metadataEntityLiveStrict, "Live entity test blocked: needs %s via LM_UMBRELLA_TEST_METADATA_ENTID", _liveKey)
				}
			}
		}
		client := setup.client

		// CREATE
		metadataRef01Ent := client.Metadata(nil)
		metadataRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "metadata"}), "metadata_ref01"))
		metadataRef01Data["database_id"] = setup.idmap["database01"]

		metadataRef01DataResult, err := metadataRef01Ent.Create(metadataRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		metadataRef01Data = core.ToMapAny(entityData(metadataRef01DataResult))
		if metadataRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if metadataRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
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
			"id": metadataRef01Data["id"],
			"database_id": setup.idmap["database_id"],
		}

		metadataRef01MarkdefUp0Name := "key"
		metadataRef01MarkdefUp0Value := fmt.Sprintf("Mark01-metadata_ref01_%d", setup.now)
		metadataRef01DataUp0Up[metadataRef01MarkdefUp0Name] = metadataRef01MarkdefUp0Value

		metadataRef01ResdataUp0Result, err := metadataRef01Ent.Update(metadataRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		metadataRef01ResdataUp0 := core.ToMapAny(entityData(metadataRef01ResdataUp0Result))
		if metadataRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if metadataRef01ResdataUp0["id"] != metadataRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if metadataRef01ResdataUp0[metadataRef01MarkdefUp0Name] != metadataRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", metadataRef01MarkdefUp0Name, metadataRef01ResdataUp0[metadataRef01MarkdefUp0Name])
		}

		// LOAD
		metadataRef01MatchDt0 := map[string]any{
			"id": metadataRef01Data["id"],
		}
		metadataRef01DataDt0Loaded, err := metadataRef01Ent.Load(metadataRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		metadataRef01DataDt0LoadResult := core.ToMapAny(entityData(metadataRef01DataDt0Loaded))
		if metadataRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if metadataRef01DataDt0LoadResult["id"] != metadataRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		metadataRef01MatchRm0 := map[string]any{
			"id": metadataRef01Data["id"],
		}
		_, err = metadataRef01Ent.Remove(metadataRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		metadataRef01MatchRt0 := map[string]any{
			"database_id": setup.idmap["database01"],
		}

		metadataRef01ListRt0Result, err := metadataRef01Ent.List(metadataRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		metadataRef01ListRt0, metadataRef01ListRt0Ok := metadataRef01ListRt0Result.([]any)
		if !metadataRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", metadataRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(metadataRef01ListRt0), map[string]any{"id": metadataRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
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
	idmap, _ := vs.Transform(
		[]any{"metadata01", "metadata02", "metadata03", "database01", "database02", "database03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("LM_UMBRELLA_TEST_METADATA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_UMBRELLA_TEST_METADATA_ENTID": idmap,
		"LM_UMBRELLA_TEST_LIVE":      "FALSE",
		"LM_UMBRELLA_TEST_EXPLAIN":   "FALSE",
		"LM_UMBRELLA_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_UMBRELLA_TEST_METADATA_ENTID"])
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
