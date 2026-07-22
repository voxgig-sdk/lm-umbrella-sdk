// Typed models for the LmUmbrella SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Database {
}

export interface DatabaseRemoveMatch {
  database_id: number
}

export interface FlatPermission {
  empty?: boolean
  msisdn?: string
}

export interface FlatPermissionLoadMatch {
  database_id: number
  id: string
}

export interface FlattenedPermission {
  active?: boolean
  empty?: boolean
  msisdn?: string
  source?: string
}

export interface FlattenedPermissionLoadMatch {
  database_id: number
}

export interface FlattenedPermissionListMatch {
  database_id: number
}

export interface FlattenedPermissionCreateData {
  database_id: number
  id: string
}

export interface ImportStatus {
  error?: any[]
  import_id?: string
  msisdn?: string
  permissions_inserted?: number
  permissions_updated?: number
  status?: string
}

export interface ImportStatusListMatch {
  database_id: number
}

export interface ImportStatusCreateData {
  database_id: number
}

export interface Metadata {
  content?: Record<string, any>
  created?: string
  database_id?: number
  key?: string
  label?: string
  multi_value?: boolean
  type?: string
  updated?: string
}

export interface MetadataLoadMatch {
  database_id: number
  id: string
}

export interface MetadataListMatch {
  database_id: number
}

export interface MetadataCreateData {
  database_id: number
  id?: string
}

export interface MetadataUpdateData {
  database_id: number
  id: string
}

export interface PaginatedPermissionList {
  ascending?: boolean
  column?: any[]
  end_row?: number
  group?: any[]
  metadata?: any[]
  msisdn_list?: any[]
  only_active?: boolean
  page?: number
  permission?: any[]
  quick_filter_text?: string
  sort?: string
  source?: any[]
  start_row?: number
  total_active?: number
  total_element?: number
  total_page?: number
}

export interface PaginatedPermissionListCreateData {
  database_id: number
}

export interface Permission {
  empty?: boolean
  msisdn?: string
}

export interface PermissionUpdateData {
  database_id: number
  id: string
}

export interface PermissionRemoveMatch {
  database_id: number
  id?: string
  msisdn?: string
}

export interface PermissionDatabase {
  customer_id?: number
  delete_on_optout?: boolean
  description?: string
  hook?: any[]
  id?: number
  name?: string
  route?: any[]
  sender_alia?: string
  service_id?: number
}

export interface PermissionDatabaseLoadMatch {
  database_id: number
}

export interface PermissionDatabaseListMatch {
  customer_id?: number
  delete_on_optout?: boolean
  description?: string
  hook?: any[]
  id?: number
  name?: string
  route?: any[]
  sender_alia?: string
  service_id?: number
}

export interface PermissionDatabaseUpdateData {
  database_id: number
}

