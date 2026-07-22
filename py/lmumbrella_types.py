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


class FlattenedPermissionCreateData(TypedDict):
    database_id: int
    id: str


class ImportStatus(TypedDict, total=False):
    error: list
    import_id: str
    msisdn: str
    permissions_inserted: int
    permissions_updated: int
    status: str


class ImportStatusListMatch(TypedDict):
    database_id: int


class ImportStatusCreateData(TypedDict):
    database_id: int


class Metadata(TypedDict, total=False):
    content: dict
    created: str
    database_id: int
    key: str
    label: str
    multi_value: bool
    type: str
    updated: str


class MetadataLoadMatch(TypedDict):
    database_id: int
    id: str


class MetadataListMatch(TypedDict):
    database_id: int


class MetadataCreateDataRequired(TypedDict):
    database_id: int


class MetadataCreateData(MetadataCreateDataRequired, total=False):
    id: str


class MetadataUpdateData(TypedDict):
    database_id: int
    id: str


class PaginatedPermissionList(TypedDict, total=False):
    ascending: bool
    column: list
    end_row: int
    group: list
    metadata: list
    msisdn_list: list
    only_active: bool
    page: int
    permission: list
    quick_filter_text: str
    sort: str
    source: list
    start_row: int
    total_active: int
    total_element: int
    total_page: int


class PaginatedPermissionListCreateData(TypedDict):
    database_id: int


class Permission(TypedDict, total=False):
    empty: bool
    msisdn: str


class PermissionUpdateData(TypedDict):
    database_id: int
    id: str


class PermissionRemoveMatchRequired(TypedDict):
    database_id: int


class PermissionRemoveMatch(PermissionRemoveMatchRequired, total=False):
    id: str
    msisdn: str


class PermissionDatabase(TypedDict, total=False):
    customer_id: int
    delete_on_optout: bool
    description: str
    hook: list
    id: int
    name: str
    route: list
    sender_alia: str
    service_id: int


class PermissionDatabaseLoadMatch(TypedDict):
    database_id: int


class PermissionDatabaseListMatch(TypedDict, total=False):
    customer_id: int
    delete_on_optout: bool
    description: str
    hook: list
    id: int
    name: str
    route: list
    sender_alia: str
    service_id: int


class PermissionDatabaseUpdateData(TypedDict):
    database_id: int
