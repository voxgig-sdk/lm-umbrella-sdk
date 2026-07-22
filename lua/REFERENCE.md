# LmUmbrella Lua SDK Reference

Complete API reference for the LmUmbrella Lua SDK.


## LmUmbrellaSDK

### Constructor

```lua
local sdk = require("lm-umbrella_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Database(data)`

Create a new `Database` entity instance. Pass `nil` for no initial data.

#### `FlatPermission(data)`

Create a new `FlatPermission` entity instance. Pass `nil` for no initial data.

#### `FlattenedPermission(data)`

Create a new `FlattenedPermission` entity instance. Pass `nil` for no initial data.

#### `ImportStatus(data)`

Create a new `ImportStatus` entity instance. Pass `nil` for no initial data.

#### `Metadata(data)`

Create a new `Metadata` entity instance. Pass `nil` for no initial data.

#### `PaginatedPermissionList(data)`

Create a new `PaginatedPermissionList` entity instance. Pass `nil` for no initial data.

#### `Permission(data)`

Create a new `Permission` entity instance. Pass `nil` for no initial data.

#### `PermissionDatabase(data)`

Create a new `PermissionDatabase` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## DatabaseEntity

```lua
local database = client:Database(nil)
```

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Database():remove({ database_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DatabaseEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FlatPermissionEntity

```lua
local flat_permission = client:FlatPermission(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `boolean` | No |  |
| `msisdn` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:FlatPermission():load({ id = "flat_permission_id", database_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FlatPermissionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FlattenedPermissionEntity

```lua
local flattened_permission = client:FlattenedPermission(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No |  |
| `empty` | `boolean` | No |  |
| `msisdn` | `string` | No |  |
| `source` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:FlattenedPermission():create({
  database_id = --[[ number ]],
  id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:FlattenedPermission():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:FlattenedPermission():load({ database_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FlattenedPermissionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ImportStatusEntity

```lua
local import_status = client:ImportStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `table` | No |  |
| `import_id` | `string` | No |  |
| `msisdn` | `string` | No |  |
| `permissions_inserted` | `number` | No |  |
| `permissions_updated` | `number` | No |  |
| `status` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ImportStatus():create({
  database_id = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ImportStatus():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImportStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MetadataEntity

```lua
local metadata = client:Metadata(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `table` | No |  |
| `created` | `string` | No |  |
| `database_id` | `number` | No |  |
| `key` | `string` | No |  |
| `label` | `string` | No |  |
| `multi_value` | `boolean` | No |  |
| `type` | `string` | No |  |
| `updated` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Metadata():create({
  database_id = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Metadata():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Metadata():load({ id = "metadata_id", database_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Metadata():update({
  id = "metadata_id",
  database_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetadataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaginatedPermissionListEntity

```lua
local paginated_permission_list = client:PaginatedPermissionList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ascending` | `boolean` | No |  |
| `column` | `table` | No |  |
| `end_row` | `number` | No |  |
| `group` | `table` | No |  |
| `metadata` | `table` | No |  |
| `msisdn_list` | `table` | No |  |
| `only_active` | `boolean` | No |  |
| `page` | `number` | No |  |
| `permission` | `table` | No |  |
| `quick_filter_text` | `string` | No |  |
| `sort` | `string` | No |  |
| `source` | `table` | No |  |
| `start_row` | `number` | No |  |
| `total_active` | `number` | No |  |
| `total_element` | `number` | No |  |
| `total_page` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:PaginatedPermissionList():create({
  database_id = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaginatedPermissionListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PermissionEntity

```lua
local permission = client:Permission(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `boolean` | No |  |
| `msisdn` | `string` | No |  |

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Permission():remove({ database_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Permission():update({
  database_id = 1,
  id = "id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PermissionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PermissionDatabaseEntity

```lua
local permission_database = client:PermissionDatabase(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customer_id` | `number` | No |  |
| `delete_on_optout` | `boolean` | No |  |
| `description` | `string` | No |  |
| `hook` | `table` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `route` | `table` | No |  |
| `sender_alia` | `string` | No |  |
| `service_id` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PermissionDatabase():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PermissionDatabase():load({ database_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:PermissionDatabase():update({
  database_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PermissionDatabaseEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

