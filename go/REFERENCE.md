# LmUmbrella Golang SDK Reference

Complete API reference for the LmUmbrella Golang SDK.


## LmUmbrellaSDK

### Constructor

```go
func NewLmUmbrellaSDK(options map[string]any) *LmUmbrellaSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *LmUmbrellaSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *LmUmbrellaSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Database(data map[string]any) LmUmbrellaEntity`

Create a new `Database` entity instance. Pass `nil` for no initial data.

#### `FlatPermission(data map[string]any) LmUmbrellaEntity`

Create a new `FlatPermission` entity instance. Pass `nil` for no initial data.

#### `FlattenedPermission(data map[string]any) LmUmbrellaEntity`

Create a new `FlattenedPermission` entity instance. Pass `nil` for no initial data.

#### `ImportStatus(data map[string]any) LmUmbrellaEntity`

Create a new `ImportStatus` entity instance. Pass `nil` for no initial data.

#### `Metadata(data map[string]any) LmUmbrellaEntity`

Create a new `Metadata` entity instance. Pass `nil` for no initial data.

#### `PaginatedPermissionList(data map[string]any) LmUmbrellaEntity`

Create a new `PaginatedPermissionList` entity instance. Pass `nil` for no initial data.

#### `Permission(data map[string]any) LmUmbrellaEntity`

Create a new `Permission` entity instance. Pass `nil` for no initial data.

#### `PermissionDatabase(data map[string]any) LmUmbrellaEntity`

Create a new `PermissionDatabase` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## DatabaseEntity

```go
database := client.Database(nil)
fmt.Println(database.GetName()) // "database"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Database(nil).Remove(map[string]any{"database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DatabaseEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FlatPermissionEntity

```go
flatPermission := client.FlatPermission(nil)
fmt.Println(flatPermission.GetName()) // "flat_permission"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `bool` | No |  |
| `msisdn` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FlatPermission(nil).Load(map[string]any{"id": "flat_permission_id", "database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FlatPermissionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FlattenedPermissionEntity

```go
flattenedPermission := client.FlattenedPermission(nil)
fmt.Println(flattenedPermission.GetName()) // "flattened_permission"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No |  |
| `empty` | `bool` | No |  |
| `msisdn` | `string` | No |  |
| `source` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.FlattenedPermission(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FlattenedPermission(nil).Load(map[string]any{"database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.FlattenedPermission(nil).Create(map[string]any{
    "database_id": 1,
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FlattenedPermissionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ImportStatusEntity

```go
importStatus := client.ImportStatus(nil)
fmt.Println(importStatus.GetName()) // "import_status"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `[]any` | No |  |
| `import_id` | `string` | No |  |
| `msisdn` | `string` | No |  |
| `permissions_inserted` | `int` | No |  |
| `permissions_updated` | `int` | No |  |
| `status` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ImportStatus(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ImportStatus(nil).Create(map[string]any{
    "database_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ImportStatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MetadataEntity

```go
metadata := client.Metadata(nil)
fmt.Println(metadata.GetName()) // "metadata"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `map[string]any` | No |  |
| `created` | `string` | No |  |
| `database_id` | `int` | No |  |
| `key` | `string` | No |  |
| `label` | `string` | No |  |
| `multi_value` | `bool` | No |  |
| `type` | `string` | No |  |
| `updated` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Metadata(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Metadata(nil).Load(map[string]any{"id": "metadata_id", "database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Metadata(nil).Create(map[string]any{
    "database_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Metadata(nil).Update(map[string]any{
    "id": "metadata_id",
    "database_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MetadataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PaginatedPermissionListEntity

```go
paginatedPermissionList := client.PaginatedPermissionList(nil)
fmt.Println(paginatedPermissionList.GetName()) // "paginated_permission_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ascending` | `bool` | No |  |
| `column` | `[]any` | No |  |
| `end_row` | `int` | No |  |
| `group` | `[]any` | No |  |
| `metadata` | `[]any` | No |  |
| `msisdn_list` | `[]any` | No |  |
| `only_active` | `bool` | No |  |
| `page` | `int` | No |  |
| `permission` | `[]any` | No |  |
| `quick_filter_text` | `string` | No |  |
| `sort` | `string` | No |  |
| `source` | `[]any` | No |  |
| `start_row` | `int` | No |  |
| `total_active` | `int` | No |  |
| `total_element` | `int` | No |  |
| `total_page` | `int` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.PaginatedPermissionList(nil).Create(map[string]any{
    "database_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PaginatedPermissionListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PermissionEntity

```go
permission := client.Permission(nil)
fmt.Println(permission.GetName()) // "permission"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `bool` | No |  |
| `msisdn` | `string` | No |  |

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Permission(nil).Update(map[string]any{
    "database_id": 1,
    "id": "id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Permission(nil).Remove(map[string]any{"database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PermissionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PermissionDatabaseEntity

```go
permissionDatabase := client.PermissionDatabase(nil)
fmt.Println(permissionDatabase.GetName()) // "permission_database"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customer_id` | `int` | No |  |
| `delete_on_optout` | `bool` | No |  |
| `description` | `string` | No |  |
| `hook` | `[]any` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `route` | `[]any` | No |  |
| `sender_alia` | `string` | No |  |
| `service_id` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PermissionDatabase(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PermissionDatabase(nil).Load(map[string]any{"database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.PermissionDatabase(nil).Update(map[string]any{
    "database_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PermissionDatabaseEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewLmUmbrellaSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

