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
    public ?bool $active = null;
    public ?bool $empty = null;
    public ?string $msisdn = null;
    public ?string $source = null;
}

/** ImportStatus entity data model. */
class ImportStatus
{
    public ?array $errors = null;
    public ?string $importId = null;
    public ?string $msisdn = null;
    public ?int $permissionsInserted = null;
    public ?int $permissionsUpdated = null;
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
    public ?array $errors = null;
    public ?string $importId = null;
    public ?string $msisdn = null;
    public ?int $permissionsInserted = null;
    public ?int $permissionsUpdated = null;
    public ?string $status = null;
}

/** Metadata entity data model. */
class Metadata
{
    public ?array $contents = null;
    public ?string $created = null;
    public ?int $databaseId = null;
    public ?string $key = null;
    public ?string $label = null;
    public ?bool $multiValue = null;
    public ?int $rangeEnd = null;
    public ?int $rangeStart = null;
    public ?string $type = null;
    public ?string $updated = null;
    public ?string $validation = null;
    public ?array $values = null;
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
    public ?array $contents = null;
    public ?string $created = null;
    public ?int $databaseId = null;
    public ?string $key = null;
    public ?string $label = null;
    public ?bool $multiValue = null;
    public ?int $rangeEnd = null;
    public ?int $rangeStart = null;
    public ?string $type = null;
    public ?string $updated = null;
    public ?string $validation = null;
    public ?array $values = null;
}

/** Request payload for Metadata#update. */
class MetadataUpdateData
{
    public int $database_id;
    public string $id;
    public ?array $contents = null;
    public ?string $created = null;
    public ?int $databaseId = null;
    public ?string $key = null;
    public ?string $label = null;
    public ?bool $multiValue = null;
    public ?int $rangeEnd = null;
    public ?int $rangeStart = null;
    public ?string $type = null;
    public ?string $updated = null;
    public ?string $validation = null;
    public ?array $values = null;
}

/** PaginatedPermissionList entity data model. */
class PaginatedPermissionList
{
    public ?bool $ascending = null;
    public ?array $columns = null;
    public ?int $endRow = null;
    public ?array $groups = null;
    public ?array $metadata = null;
    public ?array $msisdnList = null;
    public ?bool $onlyActive = null;
    public ?int $page = null;
    public ?array $permissions = null;
    public ?string $quickFilterText = null;
    public ?string $sort = null;
    public ?array $sources = null;
    public ?int $startRow = null;
    public ?int $totalActive = null;
    public ?int $totalElements = null;
    public ?int $totalPages = null;
}

/** Request payload for PaginatedPermissionList#create. */
class PaginatedPermissionListCreateData
{
    public int $database_id;
    public ?bool $ascending = null;
    public ?array $columns = null;
    public ?int $endRow = null;
    public ?array $groups = null;
    public ?array $metadata = null;
    public ?array $msisdnList = null;
    public ?bool $onlyActive = null;
    public ?int $page = null;
    public ?array $permissions = null;
    public ?string $quickFilterText = null;
    public ?string $sort = null;
    public ?array $sources = null;
    public ?int $startRow = null;
    public ?int $totalActive = null;
    public ?int $totalElements = null;
    public ?int $totalPages = null;
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
    public ?bool $empty = null;
    public ?string $msisdn = null;
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
    public ?int $customerId = null;
    public ?bool $deleteOnOptout = null;
    public ?string $description = null;
    public ?array $hooks = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $routes = null;
    public ?string $senderAlias = null;
    public ?int $serviceId = null;
}

/** Request payload for PermissionDatabase#load. */
class PermissionDatabaseLoadMatch
{
    public int $database_id;
}

/** Request payload for PermissionDatabase#list. */
class PermissionDatabaseListMatch
{
    public ?int $customerId = null;
    public ?bool $deleteOnOptout = null;
    public ?string $description = null;
    public ?array $hooks = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $routes = null;
    public ?string $senderAlias = null;
    public ?int $serviceId = null;
}

/** Request payload for PermissionDatabase#update. */
class PermissionDatabaseUpdateData
{
    public int $database_id;
    public ?int $customerId = null;
    public ?bool $deleteOnOptout = null;
    public ?string $description = null;
    public ?array $hooks = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $routes = null;
    public ?string $senderAlias = null;
    public ?int $serviceId = null;
}

