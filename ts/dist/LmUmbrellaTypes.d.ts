export interface Database {
}
export interface DatabaseRemoveMatch {
    database_id: number;
    api_key?: string;
}
export interface FlatPermission {
    empty?: boolean;
    id?: string;
    msisdn?: string;
}
export interface FlatPermissionLoadMatch {
    database_id: number;
    id: string;
    api_key?: string;
}
export interface FlattenedPermission {
    active?: boolean;
    empty?: boolean;
    id?: string;
    msisdn?: string;
    source?: string;
}
export interface FlattenedPermissionLoadMatch {
    database_id: number;
}
export interface FlattenedPermissionListMatch {
    database_id: number;
    api_key?: string;
}
export interface FlattenedPermissionCreateData {
    database_id: number;
    id: string;
    api_key?: string;
    active?: boolean;
    empty?: boolean;
    msisdn?: string;
    source?: string;
}
export interface ImportStatus {
    errors?: any[];
    importId?: string;
    msisdn?: string;
    permissionsInserted?: number;
    permissionsUpdated?: number;
    status?: string;
}
export interface ImportStatusListMatch {
    database_id: number;
    api_key?: string;
    import_id?: string;
}
export interface ImportStatusCreateData {
    database_id: number;
    api_key?: string;
    skip_import_on_error?: boolean;
    errors?: any[];
    importId?: string;
    msisdn?: string;
    permissionsInserted?: number;
    permissionsUpdated?: number;
    status?: string;
}
export interface Metadata {
    contents?: Record<string, any>;
    created?: string;
    databaseId?: number;
    id?: string;
    key?: string;
    label?: string;
    multiValue?: boolean;
    rangeEnd?: number;
    rangeStart?: number;
    type?: string;
    updated?: string;
    validation?: string;
    values?: any[];
}
export interface MetadataLoadMatch {
    database_id: number;
    id: string;
    api_key?: string;
}
export interface MetadataListMatch {
    database_id: number;
    api_key?: string;
}
export interface MetadataCreateData {
    database_id: number;
    id?: string;
    api_key?: string;
    contents?: Record<string, any>;
    created?: string;
    databaseId?: number;
    key?: string;
    label?: string;
    multiValue?: boolean;
    rangeEnd?: number;
    rangeStart?: number;
    type?: string;
    updated?: string;
    validation?: string;
    values?: any[];
}
export interface MetadataUpdateData {
    database_id: number;
    id: string;
    api_key?: string;
    contents?: Record<string, any>;
    created?: string;
    databaseId?: number;
    key?: string;
    label?: string;
    multiValue?: boolean;
    rangeEnd?: number;
    rangeStart?: number;
    type?: string;
    updated?: string;
    validation?: string;
    values?: any[];
}
export interface PaginatedPermissionList {
    ascending?: boolean;
    columns?: any[];
    endRow?: number;
    groups?: any[];
    metadata?: any[];
    msisdnList?: any[];
    onlyActive?: boolean;
    page?: number;
    permissions?: any[];
    quickFilterText?: string;
    sort?: string;
    sources?: any[];
    startRow?: number;
    totalActive?: number;
    totalElements?: number;
    totalPages?: number;
}
export interface PaginatedPermissionListCreateData {
    database_id: number;
    api_key?: string;
    ascending?: boolean;
    columns?: any[];
    endRow?: number;
    groups?: any[];
    metadata?: any[];
    msisdnList?: any[];
    onlyActive?: boolean;
    page?: number;
    permissions?: any[];
    quickFilterText?: string;
    sort?: string;
    sources?: any[];
    startRow?: number;
    totalActive?: number;
    totalElements?: number;
    totalPages?: number;
}
export interface Permission {
    empty?: boolean;
    id?: string;
    msisdn?: string;
}
export interface PermissionUpdateData {
    database_id: number;
    id: string;
    api_key?: string;
    empty?: boolean;
    msisdn?: string;
}
export interface PermissionRemoveMatch {
    database_id: number;
    id?: string;
    api_key?: string;
    msisdn?: string;
}
export interface PermissionDatabase {
    customerId?: number;
    deleteOnOptout?: boolean;
    description?: string;
    hooks?: any[];
    id?: number;
    name?: string;
    routes?: any[];
    senderAlias?: string;
    serviceId?: number;
}
export interface PermissionDatabaseLoadMatch {
    database_id: number;
    api_key?: string;
}
export interface PermissionDatabaseListMatch {
    api_key?: string;
}
export interface PermissionDatabaseUpdateData {
    database_id: number;
    api_key?: string;
    customerId?: number;
    deleteOnOptout?: boolean;
    description?: string;
    hooks?: any[];
    id?: number;
    name?: string;
    routes?: any[];
    senderAlias?: string;
    serviceId?: number;
}
