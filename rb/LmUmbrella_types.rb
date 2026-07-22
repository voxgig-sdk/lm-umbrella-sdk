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
# @!attribute [rw] msisdn
#   @return [String, nil]
FlatPermission = Struct.new(
  :empty,
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
# @!attribute [rw] msisdn
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
FlattenedPermission = Struct.new(
  :active,
  :empty,
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
FlattenedPermissionCreateData = Struct.new(
  :database_id,
  :id,
  keyword_init: true
)

# ImportStatus entity data model.
#
# @!attribute [rw] error
#   @return [Array, nil]
#
# @!attribute [rw] import_id
#   @return [String, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
#
# @!attribute [rw] permissions_inserted
#   @return [Integer, nil]
#
# @!attribute [rw] permissions_updated
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
ImportStatus = Struct.new(
  :error,
  :import_id,
  :msisdn,
  :permissions_inserted,
  :permissions_updated,
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
ImportStatusCreateData = Struct.new(
  :database_id,
  keyword_init: true
)

# Metadata entity data model.
#
# @!attribute [rw] content
#   @return [Hash, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] database_id
#   @return [Integer, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] multi_value
#   @return [Boolean, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
Metadata = Struct.new(
  :content,
  :created,
  :database_id,
  :key,
  :label,
  :multi_value,
  :type,
  :updated,
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
MetadataCreateData = Struct.new(
  :database_id,
  :id,
  keyword_init: true
)

# Request payload for Metadata#update.
#
# @!attribute [rw] database_id
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
MetadataUpdateData = Struct.new(
  :database_id,
  :id,
  keyword_init: true
)

# PaginatedPermissionList entity data model.
#
# @!attribute [rw] ascending
#   @return [Boolean, nil]
#
# @!attribute [rw] column
#   @return [Array, nil]
#
# @!attribute [rw] end_row
#   @return [Integer, nil]
#
# @!attribute [rw] group
#   @return [Array, nil]
#
# @!attribute [rw] metadata
#   @return [Array, nil]
#
# @!attribute [rw] msisdn_list
#   @return [Array, nil]
#
# @!attribute [rw] only_active
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] permission
#   @return [Array, nil]
#
# @!attribute [rw] quick_filter_text
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [Array, nil]
#
# @!attribute [rw] start_row
#   @return [Integer, nil]
#
# @!attribute [rw] total_active
#   @return [Integer, nil]
#
# @!attribute [rw] total_element
#   @return [Integer, nil]
#
# @!attribute [rw] total_page
#   @return [Integer, nil]
PaginatedPermissionList = Struct.new(
  :ascending,
  :column,
  :end_row,
  :group,
  :metadata,
  :msisdn_list,
  :only_active,
  :page,
  :permission,
  :quick_filter_text,
  :sort,
  :source,
  :start_row,
  :total_active,
  :total_element,
  :total_page,
  keyword_init: true
)

# Request payload for PaginatedPermissionList#create.
#
# @!attribute [rw] database_id
#   @return [Integer]
PaginatedPermissionListCreateData = Struct.new(
  :database_id,
  keyword_init: true
)

# Permission entity data model.
#
# @!attribute [rw] empty
#   @return [Boolean, nil]
#
# @!attribute [rw] msisdn
#   @return [String, nil]
Permission = Struct.new(
  :empty,
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
PermissionUpdateData = Struct.new(
  :database_id,
  :id,
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
# @!attribute [rw] customer_id
#   @return [Integer, nil]
#
# @!attribute [rw] delete_on_optout
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] hook
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] route
#   @return [Array, nil]
#
# @!attribute [rw] sender_alia
#   @return [String, nil]
#
# @!attribute [rw] service_id
#   @return [Integer, nil]
PermissionDatabase = Struct.new(
  :customer_id,
  :delete_on_optout,
  :description,
  :hook,
  :id,
  :name,
  :route,
  :sender_alia,
  :service_id,
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
# @!attribute [rw] customer_id
#   @return [Integer, nil]
#
# @!attribute [rw] delete_on_optout
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] hook
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] route
#   @return [Array, nil]
#
# @!attribute [rw] sender_alia
#   @return [String, nil]
#
# @!attribute [rw] service_id
#   @return [Integer, nil]
PermissionDatabaseListMatch = Struct.new(
  :customer_id,
  :delete_on_optout,
  :description,
  :hook,
  :id,
  :name,
  :route,
  :sender_alia,
  :service_id,
  keyword_init: true
)

# Request payload for PermissionDatabase#update.
#
# @!attribute [rw] database_id
#   @return [Integer]
PermissionDatabaseUpdateData = Struct.new(
  :database_id,
  keyword_init: true
)

