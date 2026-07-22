-- Typed models for the LmUmbrella SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Database

---@class DatabaseRemoveMatch
---@field database_id number

---@class FlatPermission
---@field empty? boolean
---@field msisdn? string

---@class FlatPermissionLoadMatch
---@field database_id number
---@field id string

---@class FlattenedPermission
---@field active? boolean
---@field empty? boolean
---@field msisdn? string
---@field source? string

---@class FlattenedPermissionLoadMatch
---@field database_id number

---@class FlattenedPermissionListMatch
---@field database_id number

---@class FlattenedPermissionCreateData
---@field database_id number
---@field id string

---@class ImportStatus
---@field error? table
---@field import_id? string
---@field msisdn? string
---@field permissions_inserted? number
---@field permissions_updated? number
---@field status? string

---@class ImportStatusListMatch
---@field database_id number

---@class ImportStatusCreateData
---@field database_id number

---@class Metadata
---@field content? table
---@field created? string
---@field database_id? number
---@field key? string
---@field label? string
---@field multi_value? boolean
---@field type? string
---@field updated? string

---@class MetadataLoadMatch
---@field database_id number
---@field id string

---@class MetadataListMatch
---@field database_id number

---@class MetadataCreateData
---@field database_id number
---@field id? string

---@class MetadataUpdateData
---@field database_id number
---@field id string

---@class PaginatedPermissionList
---@field ascending? boolean
---@field column? table
---@field end_row? number
---@field group? table
---@field metadata? table
---@field msisdn_list? table
---@field only_active? boolean
---@field page? number
---@field permission? table
---@field quick_filter_text? string
---@field sort? string
---@field source? table
---@field start_row? number
---@field total_active? number
---@field total_element? number
---@field total_page? number

---@class PaginatedPermissionListCreateData
---@field database_id number

---@class Permission
---@field empty? boolean
---@field msisdn? string

---@class PermissionUpdateData
---@field database_id number
---@field id string

---@class PermissionRemoveMatch
---@field database_id number
---@field id? string
---@field msisdn? string

---@class PermissionDatabase
---@field customer_id? number
---@field delete_on_optout? boolean
---@field description? string
---@field hook? table
---@field id? number
---@field name? string
---@field route? table
---@field sender_alia? string
---@field service_id? number

---@class PermissionDatabaseLoadMatch
---@field database_id number

---@class PermissionDatabaseListMatch
---@field customer_id? number
---@field delete_on_optout? boolean
---@field description? string
---@field hook? table
---@field id? number
---@field name? string
---@field route? table
---@field sender_alia? string
---@field service_id? number

---@class PermissionDatabaseUpdateData
---@field database_id number

local M = {}

return M
