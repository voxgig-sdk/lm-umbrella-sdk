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
const paginated_permission_listEntityLiveStrict = true


func TestPaginatedPermissionListEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PaginatedPermissionList(nil)
		if ent == nil {
			t.Fatal("expected non-nil PaginatedPermissionListEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PaginatedPermissionList(nil).Create(map[string]any{"database_id": "x"}, nil)
		if sdkerr, ok := err.(*core.LmUmbrellaError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := paginated_permission_listBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "paginated_permission_list." + _op, _mode); _shouldSkip {
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
					liveMiss(t, paginated_permission_listEntityLiveStrict, "Live entity test blocked: needs %s via LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		paginatedPermissionListRef01Ent := client.PaginatedPermissionList(nil)
		paginatedPermissionListRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "paginated_permission_list"}), "paginated_permission_list_ref01"))
		paginatedPermissionListRef01Data["database_id"] = setup.idmap["database01"]

		paginatedPermissionListRef01DataResult, err := paginatedPermissionListRef01Ent.Create(paginatedPermissionListRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		paginatedPermissionListRef01Data = core.ToMapAny(entityData(paginatedPermissionListRef01DataResult))
		if paginatedPermissionListRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func paginated_permission_listBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "paginated_permission_list", "PaginatedPermissionListTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read paginated_permission_list test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse paginated_permission_list test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"paginated_permission_list01", "paginated_permission_list02", "paginated_permission_list03", "database01", "database02", "database03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID": idmap,
		"LM_UMBRELLA_TEST_LIVE":      "FALSE",
		"LM_UMBRELLA_TEST_EXPLAIN":   "FALSE",
		"LM_UMBRELLA_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID"])
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
