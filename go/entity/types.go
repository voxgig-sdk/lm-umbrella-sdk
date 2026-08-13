// Typed models for the LmUmbrella SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/lm-umbrella-sdk/go/core"
)

// Database is the typed data model for the database entity.
type Database struct {
}

// DatabaseRemoveMatch is the typed request payload for Database.RemoveTyped.
type DatabaseRemoveMatch struct {
	DatabaseId int `json:"database_id"`
}

// FlatPermission is the typed data model for the flat_permission entity.
type FlatPermission struct {
	Empty *bool `json:"empty,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
}

// FlatPermissionLoadMatch is the typed request payload for FlatPermission.LoadTyped.
type FlatPermissionLoadMatch struct {
	DatabaseId int `json:"database_id"`
	Id string `json:"id"`
}

// FlattenedPermission is the typed data model for the flattened_permission entity.
type FlattenedPermission struct {
	Active *bool `json:"active,omitempty"`
	Empty *bool `json:"empty,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
	Source *string `json:"source,omitempty"`
}

// FlattenedPermissionLoadMatch is the typed request payload for FlattenedPermission.LoadTyped.
type FlattenedPermissionLoadMatch struct {
	DatabaseId int `json:"database_id"`
}

// FlattenedPermissionListMatch is the typed request payload for FlattenedPermission.ListTyped.
type FlattenedPermissionListMatch struct {
	DatabaseId int `json:"database_id"`
}

// FlattenedPermissionCreateData is the typed request payload for FlattenedPermission.CreateTyped.
type FlattenedPermissionCreateData struct {
	DatabaseId int `json:"database_id"`
	Id string `json:"id"`
	Active *bool `json:"active,omitempty"`
	Empty *bool `json:"empty,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
	Source *string `json:"source,omitempty"`
}

// ImportStatus is the typed data model for the import_status entity.
type ImportStatus struct {
	Errors *[]any `json:"errors,omitempty"`
	ImportId *string `json:"importId,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
	PermissionsInserted *int `json:"permissionsInserted,omitempty"`
	PermissionsUpdated *int `json:"permissionsUpdated,omitempty"`
	Status *string `json:"status,omitempty"`
}

// ImportStatusListMatch is the typed request payload for ImportStatus.ListTyped.
type ImportStatusListMatch struct {
	DatabaseId int `json:"database_id"`
}

// ImportStatusCreateData is the typed request payload for ImportStatus.CreateTyped.
type ImportStatusCreateData struct {
	DatabaseId int `json:"database_id"`
	Errors *[]any `json:"errors,omitempty"`
	ImportId *string `json:"importId,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
	PermissionsInserted *int `json:"permissionsInserted,omitempty"`
	PermissionsUpdated *int `json:"permissionsUpdated,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Metadata is the typed data model for the metadata entity.
type Metadata struct {
	Contents *map[string]any `json:"contents,omitempty"`
	Created *string `json:"created,omitempty"`
	DatabaseId *int `json:"databaseId,omitempty"`
	Key *string `json:"key,omitempty"`
	Label *string `json:"label,omitempty"`
	MultiValue *bool `json:"multiValue,omitempty"`
	RangeEnd *int `json:"rangeEnd,omitempty"`
	RangeStart *int `json:"rangeStart,omitempty"`
	Type *string `json:"type,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Validation *string `json:"validation,omitempty"`
	Values *[]any `json:"values,omitempty"`
}

// MetadataLoadMatch is the typed request payload for Metadata.LoadTyped.
type MetadataLoadMatch struct {
	DatabaseId int `json:"database_id"`
	Id string `json:"id"`
}

// MetadataListMatch is the typed request payload for Metadata.ListTyped.
type MetadataListMatch struct {
	DatabaseId int `json:"database_id"`
}

// MetadataCreateData is the typed request payload for Metadata.CreateTyped.
type MetadataCreateData struct {
	DatabaseId int `json:"database_id"`
	Id *string `json:"id,omitempty"`
	Contents *map[string]any `json:"contents,omitempty"`
	Created *string `json:"created,omitempty"`
	DatabaseId2 *int `json:"databaseId,omitempty"`
	Key *string `json:"key,omitempty"`
	Label *string `json:"label,omitempty"`
	MultiValue *bool `json:"multiValue,omitempty"`
	RangeEnd *int `json:"rangeEnd,omitempty"`
	RangeStart *int `json:"rangeStart,omitempty"`
	Type *string `json:"type,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Validation *string `json:"validation,omitempty"`
	Values *[]any `json:"values,omitempty"`
}

// MetadataUpdateData is the typed request payload for Metadata.UpdateTyped.
type MetadataUpdateData struct {
	DatabaseId int `json:"database_id"`
	Id string `json:"id"`
	Contents *map[string]any `json:"contents,omitempty"`
	Created *string `json:"created,omitempty"`
	DatabaseId2 *int `json:"databaseId,omitempty"`
	Key *string `json:"key,omitempty"`
	Label *string `json:"label,omitempty"`
	MultiValue *bool `json:"multiValue,omitempty"`
	RangeEnd *int `json:"rangeEnd,omitempty"`
	RangeStart *int `json:"rangeStart,omitempty"`
	Type *string `json:"type,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Validation *string `json:"validation,omitempty"`
	Values *[]any `json:"values,omitempty"`
}

// PaginatedPermissionList is the typed data model for the paginated_permission_list entity.
type PaginatedPermissionList struct {
	Ascending *bool `json:"ascending,omitempty"`
	Columns *[]any `json:"columns,omitempty"`
	EndRow *int `json:"endRow,omitempty"`
	Groups *[]any `json:"groups,omitempty"`
	Metadata *[]any `json:"metadata,omitempty"`
	MsisdnList *[]any `json:"msisdnList,omitempty"`
	OnlyActive *bool `json:"onlyActive,omitempty"`
	Page *int `json:"page,omitempty"`
	Permissions *[]any `json:"permissions,omitempty"`
	QuickFilterText *string `json:"quickFilterText,omitempty"`
	Sort *string `json:"sort,omitempty"`
	Sources *[]any `json:"sources,omitempty"`
	StartRow *int `json:"startRow,omitempty"`
	TotalActive *int `json:"totalActive,omitempty"`
	TotalElements *int `json:"totalElements,omitempty"`
	TotalPages *int `json:"totalPages,omitempty"`
}

// PaginatedPermissionListCreateData is the typed request payload for PaginatedPermissionList.CreateTyped.
type PaginatedPermissionListCreateData struct {
	DatabaseId int `json:"database_id"`
	Ascending *bool `json:"ascending,omitempty"`
	Columns *[]any `json:"columns,omitempty"`
	EndRow *int `json:"endRow,omitempty"`
	Groups *[]any `json:"groups,omitempty"`
	Metadata *[]any `json:"metadata,omitempty"`
	MsisdnList *[]any `json:"msisdnList,omitempty"`
	OnlyActive *bool `json:"onlyActive,omitempty"`
	Page *int `json:"page,omitempty"`
	Permissions *[]any `json:"permissions,omitempty"`
	QuickFilterText *string `json:"quickFilterText,omitempty"`
	Sort *string `json:"sort,omitempty"`
	Sources *[]any `json:"sources,omitempty"`
	StartRow *int `json:"startRow,omitempty"`
	TotalActive *int `json:"totalActive,omitempty"`
	TotalElements *int `json:"totalElements,omitempty"`
	TotalPages *int `json:"totalPages,omitempty"`
}

// Permission is the typed data model for the permission entity.
type Permission struct {
	Empty *bool `json:"empty,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
}

// PermissionUpdateData is the typed request payload for Permission.UpdateTyped.
type PermissionUpdateData struct {
	DatabaseId int `json:"database_id"`
	Id string `json:"id"`
	Empty *bool `json:"empty,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
}

// PermissionRemoveMatch is the typed request payload for Permission.RemoveTyped.
type PermissionRemoveMatch struct {
	DatabaseId int `json:"database_id"`
	Id *string `json:"id,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
}

// PermissionDatabase is the typed data model for the permission_database entity.
type PermissionDatabase struct {
	CustomerId *int `json:"customerId,omitempty"`
	DeleteOnOptout *bool `json:"deleteOnOptout,omitempty"`
	Description *string `json:"description,omitempty"`
	Hooks *[]any `json:"hooks,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Routes *[]any `json:"routes,omitempty"`
	SenderAlias *string `json:"senderAlias,omitempty"`
	ServiceId *int `json:"serviceId,omitempty"`
}

// PermissionDatabaseLoadMatch is the typed request payload for PermissionDatabase.LoadTyped.
type PermissionDatabaseLoadMatch struct {
	DatabaseId int `json:"database_id"`
}

// PermissionDatabaseListMatch is the typed request payload for PermissionDatabase.ListTyped.
type PermissionDatabaseListMatch struct {
	CustomerId *int `json:"customerId,omitempty"`
	DeleteOnOptout *bool `json:"deleteOnOptout,omitempty"`
	Description *string `json:"description,omitempty"`
	Hooks *[]any `json:"hooks,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Routes *[]any `json:"routes,omitempty"`
	SenderAlias *string `json:"senderAlias,omitempty"`
	ServiceId *int `json:"serviceId,omitempty"`
}

// PermissionDatabaseUpdateData is the typed request payload for PermissionDatabase.UpdateTyped.
type PermissionDatabaseUpdateData struct {
	DatabaseId int `json:"database_id"`
	CustomerId *int `json:"customerId,omitempty"`
	DeleteOnOptout *bool `json:"deleteOnOptout,omitempty"`
	Description *string `json:"description,omitempty"`
	Hooks *[]any `json:"hooks,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Routes *[]any `json:"routes,omitempty"`
	SenderAlias *string `json:"senderAlias,omitempty"`
	ServiceId *int `json:"serviceId,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
