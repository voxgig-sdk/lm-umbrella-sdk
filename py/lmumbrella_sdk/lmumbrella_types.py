# Typed models for the LmUmbrella SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Database(TypedDict):
    pass


class DatabaseRemoveMatch(TypedDict):
    database_id: int


class FlatPermission(TypedDict, total=False):
    empty: bool
    msisdn: str


class FlatPermissionLoadMatch(TypedDict):
    database_id: int
    id: str


class FlattenedPermission(TypedDict, total=False):
    active: bool
    empty: bool
    msisdn: str
    source: str


class FlattenedPermissionLoadMatch(TypedDict):
    database_id: int


class FlattenedPermissionListMatch(TypedDict):
    database_id: int


class FlattenedPermissionCreateDataRequired(TypedDict):
    database_id: int
    id: str


class FlattenedPermissionCreateData(FlattenedPermissionCreateDataRequired, total=False):
    active: bool
    empty: bool
    msisdn: str
    source: str


class ImportStatus(TypedDict, total=False):
    errors: list
    importId: str
    msisdn: str
    permissionsInserted: int
    permissionsUpdated: int
    status: str


class ImportStatusListMatch(TypedDict):
    database_id: int


class ImportStatusCreateDataRequired(TypedDict):
    database_id: int


class ImportStatusCreateData(ImportStatusCreateDataRequired, total=False):
    errors: list
    importId: str
    msisdn: str
    permissionsInserted: int
    permissionsUpdated: int
    status: str


class Metadata(TypedDict, total=False):
    contents: dict
    created: str
    databaseId: int
    key: str
    label: str
    multiValue: bool
    rangeEnd: int
    rangeStart: int
    type: str
    updated: str
    validation: str
    values: list


class MetadataLoadMatch(TypedDict):
    database_id: int
    id: str


class MetadataListMatch(TypedDict):
    database_id: int


class MetadataCreateDataRequired(TypedDict):
    database_id: int


class MetadataCreateData(MetadataCreateDataRequired, total=False):
    id: str
    contents: dict
    created: str
    databaseId: int
    key: str
    label: str
    multiValue: bool
    rangeEnd: int
    rangeStart: int
    type: str
    updated: str
    validation: str
    values: list


class MetadataUpdateDataRequired(TypedDict):
    database_id: int
    id: str


class MetadataUpdateData(MetadataUpdateDataRequired, total=False):
    contents: dict
    created: str
    databaseId: int
    key: str
    label: str
    multiValue: bool
    rangeEnd: int
    rangeStart: int
    type: str
    updated: str
    validation: str
    values: list


class PaginatedPermissionList(TypedDict, total=False):
    ascending: bool
    columns: list
    endRow: int
    groups: list
    metadata: list
    msisdnList: list
    onlyActive: bool
    page: int
    permissions: list
    quickFilterText: str
    sort: str
    sources: list
    startRow: int
    totalActive: int
    totalElements: int
    totalPages: int


class PaginatedPermissionListCreateDataRequired(TypedDict):
    database_id: int


class PaginatedPermissionListCreateData(PaginatedPermissionListCreateDataRequired, total=False):
    ascending: bool
    columns: list
    endRow: int
    groups: list
    metadata: list
    msisdnList: list
    onlyActive: bool
    page: int
    permissions: list
    quickFilterText: str
    sort: str
    sources: list
    startRow: int
    totalActive: int
    totalElements: int
    totalPages: int


class Permission(TypedDict, total=False):
    empty: bool
    msisdn: str


class PermissionUpdateDataRequired(TypedDict):
    database_id: int
    id: str


class PermissionUpdateData(PermissionUpdateDataRequired, total=False):
    empty: bool
    msisdn: str


class PermissionRemoveMatchRequired(TypedDict):
    database_id: int


class PermissionRemoveMatch(PermissionRemoveMatchRequired, total=False):
    id: str
    msisdn: str


class PermissionDatabase(TypedDict, total=False):
    customerId: int
    deleteOnOptout: bool
    description: str
    hooks: list
    id: int
    name: str
    routes: list
    senderAlias: str
    serviceId: int


class PermissionDatabaseLoadMatch(TypedDict):
    database_id: int


class PermissionDatabaseListMatch(TypedDict, total=False):
    customerId: int
    deleteOnOptout: bool
    description: str
    hooks: list
    id: int
    name: str
    routes: list
    senderAlias: str
    serviceId: int


class PermissionDatabaseUpdateDataRequired(TypedDict):
    database_id: int


class PermissionDatabaseUpdateData(PermissionDatabaseUpdateDataRequired, total=False):
    customerId: int
    deleteOnOptout: bool
    description: str
    hooks: list
    id: int
    name: str
    routes: list
    senderAlias: str
    serviceId: int
