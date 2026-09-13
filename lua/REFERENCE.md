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
| `id` | `string` | No |  |
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
| `active` | `boolean` | No | if permission is active in the database |
| `empty` | `boolean` | No |  |
| `id` | `string` | No |  |
| `msisdn` | `string` | No | phone number |
| `source` | `string` | No | comma separated list of sources |

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
| `errors` | `table` | No | Import errors (List of ImportError) |
| `importId` | `string` | No | Import id |
| `msisdn` | `string` | No |  |
| `permissionsInserted` | `number` | No | Number of permissions inserted into database |
| `permissionsUpdated` | `number` | No | Number of permissions updated in database |
| `status` | `string` | No | Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL) |

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
| `contents` | `table` | No | Contains extra info for a field |
| `created` | `string` | No | created date of the field |
| `databaseId` | `number` | No | id of the database |
| `id` | `string` | No |  |
| `key` | `string` | No | key for the field (used for the value internally - cannot be changed after creation) |
| `label` | `string` | No | label for the field (used for displaying in the interface) |
| `multiValue` | `boolean` | No | if the field is a multi value field |
| `rangeEnd` | `number` | No | end on range for validation on INTEGER field |
| `rangeStart` | `number` | No | start on range for validation on INTEGER field |
| `type` | `string` | No | the type of field |
| `updated` | `string` | No | deletion date of the field |
| `validation` | `string` | No | type of validation on TEXT field |
| `values` | `table` | No | Possible enumeration of values for ENUMERATION field |

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
| `columns` | `table` | No | the column data |
| `endRow` | `number` | No |  |
| `groups` | `table` | No |  |
| `metadata` | `table` | No |  |
| `msisdnList` | `table` | No |  |
| `onlyActive` | `boolean` | No |  |
| `page` | `number` | No | page number |
| `permissions` | `table` | No | the permissions for the page |
| `quickFilterText` | `string` | No |  |
| `sort` | `string` | No |  |
| `sources` | `table` | No | the possible sources for the database |
| `startRow` | `number` | No |  |
| `totalActive` | `number` | No | total number of active permissions |
| `totalElements` | `number` | No | total number of permissions |
| `totalPages` | `number` | No | total number of pages |

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
| `id` | `string` | No |  |
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
| `customerId` | `number` | No |  |
| `deleteOnOptout` | `boolean` | No |  |
| `description` | `string` | No |  |
| `hooks` | `table` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `routes` | `table` | No |  |
| `senderAlias` | `string` | No |  |
| `serviceId` | `number` | No |  |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

