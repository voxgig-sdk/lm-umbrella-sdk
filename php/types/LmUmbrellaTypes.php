<?php
declare(strict_types=1);

// Typed models for the LmUmbrella SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Database entity data model. */
class Database
{
}

/** Request payload for Database#remove. */
class DatabaseRemoveMatch
{
    public int $database_id;
}

/** FlatPermission entity data model. */
class FlatPermission
{
    public ?bool $empty = null;
    public ?string $msisdn = null;
}

/** Request payload for FlatPermission#load. */
class FlatPermissionLoadMatch
{
    public int $database_id;
    public string $id;
}

/** FlattenedPermission entity data model. */
class FlattenedPermission
{
    public ?bool $active = null;
    public ?bool $empty = null;
    public ?string $msisdn = null;
    public ?string $source = null;
}

/** Request payload for FlattenedPermission#load. */
class FlattenedPermissionLoadMatch
{
    public int $database_id;
}

/** Request payload for FlattenedPermission#list. */
class FlattenedPermissionListMatch
{
    public int $database_id;
}

/** Request payload for FlattenedPermission#create. */
class FlattenedPermissionCreateData
{
    public int $database_id;
    public string $id;
}

/** ImportStatus entity data model. */
class ImportStatus
{
    public ?array $error = null;
    public ?string $import_id = null;
    public ?string $msisdn = null;
    public ?int $permissions_inserted = null;
    public ?int $permissions_updated = null;
    public ?string $status = null;
}

/** Request payload for ImportStatus#list. */
class ImportStatusListMatch
{
    public int $database_id;
}

/** Request payload for ImportStatus#create. */
class ImportStatusCreateData
{
    public int $database_id;
}

/** Metadata entity data model. */
class Metadata
{
    public ?array $content = null;
    public ?string $created = null;
    public ?int $database_id = null;
    public ?string $key = null;
    public ?string $label = null;
    public ?bool $multi_value = null;
    public ?string $type = null;
    public ?string $updated = null;
}

/** Request payload for Metadata#load. */
class MetadataLoadMatch
{
    public int $database_id;
    public string $id;
}

/** Request payload for Metadata#list. */
class MetadataListMatch
{
    public int $database_id;
}

/** Request payload for Metadata#create. */
class MetadataCreateData
{
    public int $database_id;
    public ?string $id = null;
}

/** Request payload for Metadata#update. */
class MetadataUpdateData
{
    public int $database_id;
    public string $id;
}

/** PaginatedPermissionList entity data model. */
class PaginatedPermissionList
{
    public ?bool $ascending = null;
    public ?array $column = null;
    public ?int $end_row = null;
    public ?array $group = null;
    public ?array $metadata = null;
    public ?array $msisdn_list = null;
    public ?bool $only_active = null;
    public ?int $page = null;
    public ?array $permission = null;
    public ?string $quick_filter_text = null;
    public ?string $sort = null;
    public ?array $source = null;
    public ?int $start_row = null;
    public ?int $total_active = null;
    public ?int $total_element = null;
    public ?int $total_page = null;
}

/** Request payload for PaginatedPermissionList#create. */
class PaginatedPermissionListCreateData
{
    public int $database_id;
}

/** Permission entity data model. */
class Permission
{
    public ?bool $empty = null;
    public ?string $msisdn = null;
}

/** Request payload for Permission#update. */
class PermissionUpdateData
{
    public int $database_id;
    public string $id;
}

/** Request payload for Permission#remove. */
class PermissionRemoveMatch
{
    public int $database_id;
    public ?string $id = null;
    public ?string $msisdn = null;
}

/** PermissionDatabase entity data model. */
class PermissionDatabase
{
    public ?int $customer_id = null;
    public ?bool $delete_on_optout = null;
    public ?string $description = null;
    public ?array $hook = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $route = null;
    public ?string $sender_alia = null;
    public ?int $service_id = null;
}

/** Request payload for PermissionDatabase#load. */
class PermissionDatabaseLoadMatch
{
    public int $database_id;
}

/** Request payload for PermissionDatabase#list. */
class PermissionDatabaseListMatch
{
    public ?int $customer_id = null;
    public ?bool $delete_on_optout = null;
    public ?string $description = null;
    public ?array $hook = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $route = null;
    public ?string $sender_alia = null;
    public ?int $service_id = null;
}

/** Request payload for PermissionDatabase#update. */
class PermissionDatabaseUpdateData
{
    public int $database_id;
}

