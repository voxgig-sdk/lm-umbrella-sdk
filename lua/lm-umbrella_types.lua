-- Typed models for the LmUmbrella SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Database
---@field id? string

---@class DatabaseRemoveMatch
---@field database_id number
---@field id string
---@field api_key? string

---@class FlatPermission
---@field empty? boolean
---@field id? string
---@field msisdn? string

---@class FlatPermissionLoadMatch
---@field database_id number
---@field id string
---@field api_key? string

---@class FlattenedPermission
---@field active? boolean
---@field empty? boolean
---@field id? string
---@field msisdn? string
---@field source? string

---@class FlattenedPermissionListMatch
---@field database_id number
---@field api_key? string

---@class FlattenedPermissionCreateData
---@field database_id number
---@field id string
---@field api_key? string
---@field active? boolean
---@field empty? boolean
---@field msisdn? string
---@field source? string

---@class ImportStatus
---@field errors? table
---@field importId? string
---@field msisdn? string
---@field permissions? table
---@field permissionsInserted? number
---@field permissionsUpdated? number
---@field status? string

---@class ImportStatusListMatch
---@field database_id number
---@field api_key? string
---@field import_id? string

---@class ImportStatusCreateData
---@field database_id number
---@field api_key? string
---@field skip_import_on_error? boolean
---@field errors? table
---@field importId? string
---@field msisdn? string
---@field permissions? table
---@field permissionsInserted? number
---@field permissionsUpdated? number
---@field status? string

---@class Metadata
---@field contents? table
---@field created? string
---@field databaseId? number
---@field id? string
---@field key? string
---@field label? string
---@field multiValue? boolean
---@field type? string
---@field updated? string

---@class MetadataLoadMatch
---@field database_id number
---@field id string
---@field api_key? string

---@class MetadataListMatch
---@field database_id number
---@field api_key? string

---@class MetadataCreateData
---@field database_id number
---@field api_key? string
---@field contents? table
---@field created? string
---@field databaseId? number
---@field id? string
---@field key? string
---@field label? string
---@field multiValue? boolean
---@field type? string
---@field updated? string

---@class MetadataUpdateData
---@field database_id number
---@field id string
---@field api_key? string
---@field contents? table
---@field created? string
---@field databaseId? number
---@field key? string
---@field label? string
---@field multiValue? boolean
---@field type? string
---@field updated? string

---@class MetadataRemoveMatch
---@field database_id number
---@field id string
---@field api_key? string

---@class PaginatedPermissionList
---@field ascending? boolean
---@field columns? table
---@field endRow? number
---@field groups? table
---@field metadata? table
---@field msisdnList? table
---@field onlyActive? boolean
---@field page? number
---@field permissions? table
---@field quickFilterText? string
---@field sort? string
---@field sources? table
---@field startRow? number
---@field totalActive? number
---@field totalElements? number
---@field totalPages? number

---@class PaginatedPermissionListCreateData
---@field database_id number
---@field api_key? string
---@field ascending? boolean
---@field columns? table
---@field endRow? number
---@field groups? table
---@field metadata? table
---@field msisdnList? table
---@field onlyActive? boolean
---@field page? number
---@field permissions? table
---@field quickFilterText? string
---@field sort? string
---@field sources? table
---@field startRow? number
---@field totalActive? number
---@field totalElements? number
---@field totalPages? number

---@class Permission
---@field empty? boolean
---@field id? string
---@field msisdn? string

---@class PermissionUpdateData
---@field database_id number
---@field id string
---@field api_key? string
---@field empty? boolean
---@field msisdn? string

---@class PermissionRemoveMatch
---@field database_id number
---@field id? string
---@field api_key? string
---@field msisdn? string

---@class PermissionDatabase
---@field customerId? number
---@field deleteOnOptout? boolean
---@field description? string
---@field hooks? table
---@field id? number
---@field name? string
---@field routes? table
---@field senderAlias? string
---@field serviceId? number

---@class PermissionDatabaseLoadMatch
---@field database_id number
---@field id string
---@field api_key? string

---@class PermissionDatabaseListMatch
---@field api_key? string

---@class PermissionDatabaseUpdateData
---@field database_id number
---@field id string
---@field api_key? string
---@field customerId? number
---@field deleteOnOptout? boolean
---@field description? string
---@field hooks? table
---@field name? string
---@field routes? table
---@field senderAlias? string
---@field serviceId? number

local M = {}

return M
