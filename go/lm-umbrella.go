package voxgiglmumbrellasdk

import (
	"github.com/voxgig-sdk/lm-umbrella-sdk/go/core"
	"github.com/voxgig-sdk/lm-umbrella-sdk/go/entity"
	"github.com/voxgig-sdk/lm-umbrella-sdk/go/feature"
	_ "github.com/voxgig-sdk/lm-umbrella-sdk/go/utility"
)

// Type aliases preserve external API.
type LmUmbrellaSDK = core.LmUmbrellaSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LmUmbrellaEntity = core.LmUmbrellaEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LmUmbrellaError = core.LmUmbrellaError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDatabaseEntityFunc = func(client *core.LmUmbrellaSDK, entopts map[string]any) core.LmUmbrellaEntity {
		return entity.NewDatabaseEntity(client, entopts)
	}
	core.NewFlatPermissionEntityFunc = func(client *core.LmUmbrellaSDK, entopts map[string]any) core.LmUmbrellaEntity {
		return entity.NewFlatPermissionEntity(client, entopts)
	}
	core.NewFlattenedPermissionEntityFunc = func(client *core.LmUmbrellaSDK, entopts map[string]any) core.LmUmbrellaEntity {
		return entity.NewFlattenedPermissionEntity(client, entopts)
	}
	core.NewImportStatusEntityFunc = func(client *core.LmUmbrellaSDK, entopts map[string]any) core.LmUmbrellaEntity {
		return entity.NewImportStatusEntity(client, entopts)
	}
	core.NewMetadataEntityFunc = func(client *core.LmUmbrellaSDK, entopts map[string]any) core.LmUmbrellaEntity {
		return entity.NewMetadataEntity(client, entopts)
	}
	core.NewPaginatedPermissionListEntityFunc = func(client *core.LmUmbrellaSDK, entopts map[string]any) core.LmUmbrellaEntity {
		return entity.NewPaginatedPermissionListEntity(client, entopts)
	}
	core.NewPermissionEntityFunc = func(client *core.LmUmbrellaSDK, entopts map[string]any) core.LmUmbrellaEntity {
		return entity.NewPermissionEntity(client, entopts)
	}
	core.NewPermissionDatabaseEntityFunc = func(client *core.LmUmbrellaSDK, entopts map[string]any) core.LmUmbrellaEntity {
		return entity.NewPermissionDatabaseEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLmUmbrellaSDK = core.NewLmUmbrellaSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLmUmbrellaSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LmUmbrellaSDK  { return NewLmUmbrellaSDK(nil) }
func Test() *LmUmbrellaSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
