# frozen_string_literal: true

# Typed models for the LmUmbrella SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Database entity data model.
class Database
end

# Request payload for Database#remove.
#
# @!attribute [rw] database_id
#   @return [Integer]
DatabaseRemoveMatch = Struct.new(
  :database_id,
  keyword_init: true
)

# FlatPermission entity data model.
#
# @!attribute [rw] empty
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
FlatPermission = Struct.new(
  :empty,
  :id,
  :msisdn,
  keyword_init: true
)

# Request payload for FlatPermission#load.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
FlatPermissionLoadMatch = Struct.new(
  :database_id,
  :id,
  keyword_init: true
)

# FlattenedPermission entity data model.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] empty
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
FlattenedPermission = Struct.new(
  :active,
  :empty,
  :id,
  :msisdn,
  :source,
  keyword_init: true
)

# Request payload for FlattenedPermission#load.
#
# @!attribute [rw] database_id
#   @return [Integer]
FlattenedPermissionLoadMatch = Struct.new(
  :database_id,
  keyword_init: true
)

# Request payload for FlattenedPermission#list.
#
# @!attribute [rw] database_id
#   @return [Integer]
FlattenedPermissionListMatch = Struct.new(
  :database_id,
  keyword_init: true
)

# Request payload for FlattenedPermission#create.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] empty
#   @return [Boolean, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
FlattenedPermissionCreateData = Struct.new(
  :database_id,
  :id,
  :active,
  :empty,
  :msisdn,
  :source,
  keyword_init: true
)

# ImportStatus entity data model.
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] importId
#   @return [String, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
#
# @!attribute [rw] permissionsInserted
#   @return [Integer, nil]
#
# @!attribute [rw] permissionsUpdated
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
ImportStatus = Struct.new(
  :errors,
  :importId,
  :msisdn,
  :permissionsInserted,
  :permissionsUpdated,
  :status,
  keyword_init: true
)

# Request payload for ImportStatus#list.
#
# @!attribute [rw] database_id
#   @return [Integer]
ImportStatusListMatch = Struct.new(
  :database_id,
  keyword_init: true
)

# Request payload for ImportStatus#create.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] importId
#   @return [String, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
#
# @!attribute [rw] permissionsInserted
#   @return [Integer, nil]
#
# @!attribute [rw] permissionsUpdated
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
ImportStatusCreateData = Struct.new(
  :database_id,
  :errors,
  :importId,
  :msisdn,
  :permissionsInserted,
  :permissionsUpdated,
  :status,
  keyword_init: true
)

# Metadata entity data model.
#
# @!attribute [rw] contents
#   @return [Hash, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] databaseId
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] multiValue
#   @return [Boolean, nil]
#
# @!attribute [rw] rangeEnd
#   @return [Integer, nil]
#
# @!attribute [rw] rangeStart
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
#
# @!attribute [rw] validation
#   @return [String, nil]
#
# @!attribute [rw] values
#   @return [Array, nil]
Metadata = Struct.new(
  :contents,
  :created,
  :databaseId,
  :id,
  :key,
  :label,
  :multiValue,
  :rangeEnd,
  :rangeStart,
  :type,
  :updated,
  :validation,
  :values,
  keyword_init: true
)

# Request payload for Metadata#load.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
MetadataLoadMatch = Struct.new(
  :database_id,
  :id,
  keyword_init: true
)

# Request payload for Metadata#list.
#
# @!attribute [rw] database_id
#   @return [Integer]
MetadataListMatch = Struct.new(
  :database_id,
  keyword_init: true
)

# Request payload for Metadata#create.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] contents
#   @return [Hash, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] databaseId
#   @return [Integer, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] multiValue
#   @return [Boolean, nil]
#
# @!attribute [rw] rangeEnd
#   @return [Integer, nil]
#
# @!attribute [rw] rangeStart
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
#
# @!attribute [rw] validation
#   @return [String, nil]
#
# @!attribute [rw] values
#   @return [Array, nil]
MetadataCreateData = Struct.new(
  :database_id,
  :id,
  :contents,
  :created,
  :databaseId,
  :key,
  :label,
  :multiValue,
  :rangeEnd,
  :rangeStart,
  :type,
  :updated,
  :validation,
  :values,
  keyword_init: true
)

# Request payload for Metadata#update.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] contents
#   @return [Hash, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] databaseId
#   @return [Integer, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] multiValue
#   @return [Boolean, nil]
#
# @!attribute [rw] rangeEnd
#   @return [Integer, nil]
#
# @!attribute [rw] rangeStart
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
#
# @!attribute [rw] validation
#   @return [String, nil]
#
# @!attribute [rw] values
#   @return [Array, nil]
MetadataUpdateData = Struct.new(
  :database_id,
  :id,
  :contents,
  :created,
  :databaseId,
  :key,
  :label,
  :multiValue,
  :rangeEnd,
  :rangeStart,
  :type,
  :updated,
  :validation,
  :values,
  keyword_init: true
)

# PaginatedPermissionList entity data model.
#
# @!attribute [rw] ascending
#   @return [Boolean, nil]
#
# @!attribute [rw] columns
#   @return [Array, nil]
#
# @!attribute [rw] endRow
#   @return [Integer, nil]
#
# @!attribute [rw] groups
#   @return [Array, nil]
#
# @!attribute [rw] metadata
#   @return [Array, nil]
#
# @!attribute [rw] msisdnList
#   @return [Array, nil]
#
# @!attribute [rw] onlyActive
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] permissions
#   @return [Array, nil]
#
# @!attribute [rw] quickFilterText
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] sources
#   @return [Array, nil]
#
# @!attribute [rw] startRow
#   @return [Integer, nil]
#
# @!attribute [rw] totalActive
#   @return [Integer, nil]
#
# @!attribute [rw] totalElements
#   @return [Integer, nil]
#
# @!attribute [rw] totalPages
#   @return [Integer, nil]
PaginatedPermissionList = Struct.new(
  :ascending,
  :columns,
  :endRow,
  :groups,
  :metadata,
  :msisdnList,
  :onlyActive,
  :page,
  :permissions,
  :quickFilterText,
  :sort,
  :sources,
  :startRow,
  :totalActive,
  :totalElements,
  :totalPages,
  keyword_init: true
)

# Request payload for PaginatedPermissionList#create.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] ascending
#   @return [Boolean, nil]
#
# @!attribute [rw] columns
#   @return [Array, nil]
#
# @!attribute [rw] endRow
#   @return [Integer, nil]
#
# @!attribute [rw] groups
#   @return [Array, nil]
#
# @!attribute [rw] metadata
#   @return [Array, nil]
#
# @!attribute [rw] msisdnList
#   @return [Array, nil]
#
# @!attribute [rw] onlyActive
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] permissions
#   @return [Array, nil]
#
# @!attribute [rw] quickFilterText
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] sources
#   @return [Array, nil]
#
# @!attribute [rw] startRow
#   @return [Integer, nil]
#
# @!attribute [rw] totalActive
#   @return [Integer, nil]
#
# @!attribute [rw] totalElements
#   @return [Integer, nil]
#
# @!attribute [rw] totalPages
#   @return [Integer, nil]
PaginatedPermissionListCreateData = Struct.new(
  :database_id,
  :ascending,
  :columns,
  :endRow,
  :groups,
  :metadata,
  :msisdnList,
  :onlyActive,
  :page,
  :permissions,
  :quickFilterText,
  :sort,
  :sources,
  :startRow,
  :totalActive,
  :totalElements,
  :totalPages,
  keyword_init: true
)

# Permission entity data model.
#
# @!attribute [rw] empty
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
Permission = Struct.new(
  :empty,
  :id,
  :msisdn,
  keyword_init: true
)

# Request payload for Permission#update.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] empty
#   @return [Boolean, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
PermissionUpdateData = Struct.new(
  :database_id,
  :id,
  :empty,
  :msisdn,
  keyword_init: true
)

# Request payload for Permission#remove.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
PermissionRemoveMatch = Struct.new(
  :database_id,
  :id,
  :msisdn,
  keyword_init: true
)

# PermissionDatabase entity data model.
#
# @!attribute [rw] customerId
#   @return [Integer, nil]
#
# @!attribute [rw] deleteOnOptout
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] hooks
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] routes
#   @return [Array, nil]
#
# @!attribute [rw] senderAlias
#   @return [String, nil]
#
# @!attribute [rw] serviceId
#   @return [Integer, nil]
PermissionDatabase = Struct.new(
  :customerId,
  :deleteOnOptout,
  :description,
  :hooks,
  :id,
  :name,
  :routes,
  :senderAlias,
  :serviceId,
  keyword_init: true
)

# Request payload for PermissionDatabase#load.
#
# @!attribute [rw] database_id
#   @return [Integer]
PermissionDatabaseLoadMatch = Struct.new(
  :database_id,
  keyword_init: true
)

# Request payload for PermissionDatabase#list.
#
# @!attribute [rw] customerId
#   @return [Integer, nil]
#
# @!attribute [rw] deleteOnOptout
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] hooks
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] routes
#   @return [Array, nil]
#
# @!attribute [rw] senderAlias
#   @return [String, nil]
#
# @!attribute [rw] serviceId
#   @return [Integer, nil]
PermissionDatabaseListMatch = Struct.new(
  :customerId,
  :deleteOnOptout,
  :description,
  :hooks,
  :id,
  :name,
  :routes,
  :senderAlias,
  :serviceId,
  keyword_init: true
)

# Request payload for PermissionDatabase#update.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] customerId
#   @return [Integer, nil]
#
# @!attribute [rw] deleteOnOptout
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] hooks
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] routes
#   @return [Array, nil]
#
# @!attribute [rw] senderAlias
#   @return [String, nil]
#
# @!attribute [rw] serviceId
#   @return [Integer, nil]
PermissionDatabaseUpdateData = Struct.new(
  :database_id,
  :customerId,
  :deleteOnOptout,
  :description,
  :hooks,
  :id,
  :name,
  :routes,
  :senderAlias,
  :serviceId,
  keyword_init: true
)

