// Typed models for the LmUmbrella SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

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
}

// ImportStatus is the typed data model for the import_status entity.
type ImportStatus struct {
	Error *[]any `json:"error,omitempty"`
	ImportId *string `json:"import_id,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
	PermissionsInserted *int `json:"permissions_inserted,omitempty"`
	PermissionsUpdated *int `json:"permissions_updated,omitempty"`
	Status *string `json:"status,omitempty"`
}

// ImportStatusListMatch is the typed request payload for ImportStatus.ListTyped.
type ImportStatusListMatch struct {
	DatabaseId int `json:"database_id"`
}

// ImportStatusCreateData is the typed request payload for ImportStatus.CreateTyped.
type ImportStatusCreateData struct {
	DatabaseId int `json:"database_id"`
}

// Metadata is the typed data model for the metadata entity.
type Metadata struct {
	Content *map[string]any `json:"content,omitempty"`
	Created *string `json:"created,omitempty"`
	DatabaseId *int `json:"database_id,omitempty"`
	Key *string `json:"key,omitempty"`
	Label *string `json:"label,omitempty"`
	MultiValue *bool `json:"multi_value,omitempty"`
	Type *string `json:"type,omitempty"`
	Updated *string `json:"updated,omitempty"`
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
}

// MetadataUpdateData is the typed request payload for Metadata.UpdateTyped.
type MetadataUpdateData struct {
	DatabaseId int `json:"database_id"`
	Id string `json:"id"`
}

// PaginatedPermissionList is the typed data model for the paginated_permission_list entity.
type PaginatedPermissionList struct {
	Ascending *bool `json:"ascending,omitempty"`
	Column *[]any `json:"column,omitempty"`
	EndRow *int `json:"end_row,omitempty"`
	Group *[]any `json:"group,omitempty"`
	Metadata *[]any `json:"metadata,omitempty"`
	MsisdnList *[]any `json:"msisdn_list,omitempty"`
	OnlyActive *bool `json:"only_active,omitempty"`
	Page *int `json:"page,omitempty"`
	Permission *[]any `json:"permission,omitempty"`
	QuickFilterText *string `json:"quick_filter_text,omitempty"`
	Sort *string `json:"sort,omitempty"`
	Source *[]any `json:"source,omitempty"`
	StartRow *int `json:"start_row,omitempty"`
	TotalActive *int `json:"total_active,omitempty"`
	TotalElement *int `json:"total_element,omitempty"`
	TotalPage *int `json:"total_page,omitempty"`
}

// PaginatedPermissionListCreateData is the typed request payload for PaginatedPermissionList.CreateTyped.
type PaginatedPermissionListCreateData struct {
	DatabaseId int `json:"database_id"`
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
}

// PermissionRemoveMatch is the typed request payload for Permission.RemoveTyped.
type PermissionRemoveMatch struct {
	DatabaseId int `json:"database_id"`
	Id *string `json:"id,omitempty"`
	Msisdn *string `json:"msisdn,omitempty"`
}

// PermissionDatabase is the typed data model for the permission_database entity.
type PermissionDatabase struct {
	CustomerId *int `json:"customer_id,omitempty"`
	DeleteOnOptout *bool `json:"delete_on_optout,omitempty"`
	Description *string `json:"description,omitempty"`
	Hook *[]any `json:"hook,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Route *[]any `json:"route,omitempty"`
	SenderAlia *string `json:"sender_alia,omitempty"`
	ServiceId *int `json:"service_id,omitempty"`
}

// PermissionDatabaseLoadMatch is the typed request payload for PermissionDatabase.LoadTyped.
type PermissionDatabaseLoadMatch struct {
	DatabaseId int `json:"database_id"`
}

// PermissionDatabaseListMatch is the typed request payload for PermissionDatabase.ListTyped.
type PermissionDatabaseListMatch struct {
	CustomerId *int `json:"customer_id,omitempty"`
	DeleteOnOptout *bool `json:"delete_on_optout,omitempty"`
	Description *string `json:"description,omitempty"`
	Hook *[]any `json:"hook,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Route *[]any `json:"route,omitempty"`
	SenderAlia *string `json:"sender_alia,omitempty"`
	ServiceId *int `json:"service_id,omitempty"`
}

// PermissionDatabaseUpdateData is the typed request payload for PermissionDatabase.UpdateTyped.
type PermissionDatabaseUpdateData struct {
	DatabaseId int `json:"database_id"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
