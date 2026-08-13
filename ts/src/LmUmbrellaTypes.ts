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
  active?: boolean
  empty?: boolean
  msisdn?: string
  source?: string
}

export interface ImportStatus {
  errors?: any[]
  importId?: string
  msisdn?: string
  permissionsInserted?: number
  permissionsUpdated?: number
  status?: string
}

export interface ImportStatusListMatch {
  database_id: number
}

export interface ImportStatusCreateData {
  database_id: number
  errors?: any[]
  importId?: string
  msisdn?: string
  permissionsInserted?: number
  permissionsUpdated?: number
  status?: string
}

export interface Metadata {
  contents?: Record<string, any>
  created?: string
  databaseId?: number
  key?: string
  label?: string
  multiValue?: boolean
  rangeEnd?: number
  rangeStart?: number
  type?: string
  updated?: string
  validation?: string
  values?: any[]
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
  contents?: Record<string, any>
  created?: string
  databaseId?: number
  key?: string
  label?: string
  multiValue?: boolean
  rangeEnd?: number
  rangeStart?: number
  type?: string
  updated?: string
  validation?: string
  values?: any[]
}

export interface MetadataUpdateData {
  database_id: number
  id: string
  contents?: Record<string, any>
  created?: string
  databaseId?: number
  key?: string
  label?: string
  multiValue?: boolean
  rangeEnd?: number
  rangeStart?: number
  type?: string
  updated?: string
  validation?: string
  values?: any[]
}

export interface PaginatedPermissionList {
  ascending?: boolean
  columns?: any[]
  endRow?: number
  groups?: any[]
  metadata?: any[]
  msisdnList?: any[]
  onlyActive?: boolean
  page?: number
  permissions?: any[]
  quickFilterText?: string
  sort?: string
  sources?: any[]
  startRow?: number
  totalActive?: number
  totalElements?: number
  totalPages?: number
}

export interface PaginatedPermissionListCreateData {
  database_id: number
  ascending?: boolean
  columns?: any[]
  endRow?: number
  groups?: any[]
  metadata?: any[]
  msisdnList?: any[]
  onlyActive?: boolean
  page?: number
  permissions?: any[]
  quickFilterText?: string
  sort?: string
  sources?: any[]
  startRow?: number
  totalActive?: number
  totalElements?: number
  totalPages?: number
}

export interface Permission {
  empty?: boolean
  msisdn?: string
}

export interface PermissionUpdateData {
  database_id: number
  id: string
  empty?: boolean
  msisdn?: string
}

export interface PermissionRemoveMatch {
  database_id: number
  id?: string
  msisdn?: string
}

export interface PermissionDatabase {
  customerId?: number
  deleteOnOptout?: boolean
  description?: string
  hooks?: any[]
  id?: number
  name?: string
  routes?: any[]
  senderAlias?: string
  serviceId?: number
}

export interface PermissionDatabaseLoadMatch {
  database_id: number
}

export interface PermissionDatabaseListMatch {
  customerId?: number
  deleteOnOptout?: boolean
  description?: string
  hooks?: any[]
  id?: number
  name?: string
  routes?: any[]
  senderAlias?: string
  serviceId?: number
}

export interface PermissionDatabaseUpdateData {
  database_id: number
  customerId?: number
  deleteOnOptout?: boolean
  description?: string
  hooks?: any[]
  id?: number
  name?: string
  routes?: any[]
  senderAlias?: string
  serviceId?: number
}

