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

func TestPermissionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Permission(nil)
		if ent == nil {
			t.Fatal("expected non-nil PermissionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
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
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LMUMBRELLA_TEST_PERMISSION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		permissionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.permission", setup.data)))
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
			"database_id": setup.idmap["database_id"],
		}

		permissionRef01MarkdefUp0Name := "msisdn"
		permissionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-permission_ref01_%d", setup.now)
		permissionRef01DataUp0Up[permissionRef01MarkdefUp0Name] = permissionRef01MarkdefUp0Value

		permissionRef01ResdataUp0Result, err := permissionRef01Ent.Update(permissionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		permissionRef01ResdataUp0 := core.ToMapAny(permissionRef01ResdataUp0Result)
		if permissionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
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
	idmap := vs.Transform(
		[]any{"permission01", "permission02", "permission03", "database01", "database02", "database03", "permanent01", "permanent02", "permanent03"},
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
	entidEnvRaw := os.Getenv("LMUMBRELLA_TEST_PERMISSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LMUMBRELLA_TEST_PERMISSION_ENTID": idmap,
		"LMUMBRELLA_TEST_LIVE":      "FALSE",
		"LMUMBRELLA_TEST_EXPLAIN":   "FALSE",
		"LMUMBRELLA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LMUMBRELLA_TEST_PERMISSION_ENTID"])
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
