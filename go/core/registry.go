package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDatabaseEntityFunc func(client *LmUmbrellaSDK, entopts map[string]any) LmUmbrellaEntity

var NewFlatPermissionEntityFunc func(client *LmUmbrellaSDK, entopts map[string]any) LmUmbrellaEntity

var NewFlattenedPermissionEntityFunc func(client *LmUmbrellaSDK, entopts map[string]any) LmUmbrellaEntity

var NewImportStatusEntityFunc func(client *LmUmbrellaSDK, entopts map[string]any) LmUmbrellaEntity

var NewMetadataEntityFunc func(client *LmUmbrellaSDK, entopts map[string]any) LmUmbrellaEntity

var NewPaginatedPermissionListEntityFunc func(client *LmUmbrellaSDK, entopts map[string]any) LmUmbrellaEntity

var NewPermissionEntityFunc func(client *LmUmbrellaSDK, entopts map[string]any) LmUmbrellaEntity

var NewPermissionDatabaseEntityFunc func(client *LmUmbrellaSDK, entopts map[string]any) LmUmbrellaEntity

