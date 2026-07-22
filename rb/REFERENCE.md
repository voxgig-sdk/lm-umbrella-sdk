# LmUmbrella Ruby SDK Reference

Complete API reference for the LmUmbrella Ruby SDK.


## LmUmbrellaSDK

### Constructor

```ruby
require_relative 'LmUmbrella_sdk'

client = LmUmbrellaSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmUmbrellaSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = LmUmbrellaSDK.test
```


### Instance Methods

#### `Database(data = nil)`

Create a new `Database` entity instance. Pass `nil` for no initial data.

#### `FlatPermission(data = nil)`

Create a new `FlatPermission` entity instance. Pass `nil` for no initial data.

#### `FlattenedPermission(data = nil)`

Create a new `FlattenedPermission` entity instance. Pass `nil` for no initial data.

#### `ImportStatus(data = nil)`

Create a new `ImportStatus` entity instance. Pass `nil` for no initial data.

#### `Metadata(data = nil)`

Create a new `Metadata` entity instance. Pass `nil` for no initial data.

#### `PaginatedPermissionList(data = nil)`

Create a new `PaginatedPermissionList` entity instance. Pass `nil` for no initial data.

#### `Permission(data = nil)`

Create a new `Permission` entity instance. Pass `nil` for no initial data.

#### `PermissionDatabase(data = nil)`

Create a new `PermissionDatabase` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DatabaseEntity

```ruby
database = client.Database
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Database.remove({ "database_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DatabaseEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FlatPermissionEntity

```ruby
flat_permission = client.FlatPermission
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `Boolean` | No |  |
| `msisdn` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.FlatPermission.load({ "id" => "flat_permission_id", "database_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FlatPermissionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FlattenedPermissionEntity

```ruby
flattened_permission = client.FlattenedPermission
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `Boolean` | No |  |
| `empty` | `Boolean` | No |  |
| `msisdn` | `String` | No |  |
| `source` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.FlattenedPermission.create({
  "database_id" => 1, # Integer
  "id" => "example_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.FlattenedPermission.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.FlattenedPermission.load({ "database_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FlattenedPermissionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ImportStatusEntity

```ruby
import_status = client.ImportStatus
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `Array` | No |  |
| `import_id` | `String` | No |  |
| `msisdn` | `String` | No |  |
| `permissions_inserted` | `Integer` | No |  |
| `permissions_updated` | `Integer` | No |  |
| `status` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ImportStatus.create({
  "database_id" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ImportStatus.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ImportStatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MetadataEntity

```ruby
metadata = client.Metadata
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `Hash` | No |  |
| `created` | `String` | No |  |
| `database_id` | `Integer` | No |  |
| `key` | `String` | No |  |
| `label` | `String` | No |  |
| `multi_value` | `Boolean` | No |  |
| `type` | `String` | No |  |
| `updated` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Metadata.create({
  "database_id" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Metadata.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Metadata.load({ "id" => "metadata_id", "database_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Metadata.update({
  "id" => "metadata_id",
  "database_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MetadataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaginatedPermissionListEntity

```ruby
paginated_permission_list = client.PaginatedPermissionList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ascending` | `Boolean` | No |  |
| `column` | `Array` | No |  |
| `end_row` | `Integer` | No |  |
| `group` | `Array` | No |  |
| `metadata` | `Array` | No |  |
| `msisdn_list` | `Array` | No |  |
| `only_active` | `Boolean` | No |  |
| `page` | `Integer` | No |  |
| `permission` | `Array` | No |  |
| `quick_filter_text` | `String` | No |  |
| `sort` | `String` | No |  |
| `source` | `Array` | No |  |
| `start_row` | `Integer` | No |  |
| `total_active` | `Integer` | No |  |
| `total_element` | `Integer` | No |  |
| `total_page` | `Integer` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.PaginatedPermissionList.create({
  "database_id" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaginatedPermissionListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PermissionEntity

```ruby
permission = client.Permission
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `Boolean` | No |  |
| `msisdn` | `String` | No |  |

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Permission.remove({ "database_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Permission.update({
  "database_id" => 1,
  "id" => "id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PermissionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PermissionDatabaseEntity

```ruby
permission_database = client.PermissionDatabase
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customer_id` | `Integer` | No |  |
| `delete_on_optout` | `Boolean` | No |  |
| `description` | `String` | No |  |
| `hook` | `Array` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `route` | `Array` | No |  |
| `sender_alia` | `String` | No |  |
| `service_id` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PermissionDatabase.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PermissionDatabase.load({ "database_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.PermissionDatabase.update({
  "database_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PermissionDatabaseEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = LmUmbrellaSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

