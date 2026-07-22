# LmUmbrella TypeScript SDK Reference

Complete API reference for the LmUmbrella TypeScript SDK.


## LmUmbrellaSDK

### Constructor

```ts
new LmUmbrellaSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmUmbrellaSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LmUmbrellaSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LmUmbrellaSDK` instance in test mode.


### Instance Methods

#### `Database(data?: object)`

Create a new `Database` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatabaseEntity` instance.

#### `FlatPermission(data?: object)`

Create a new `FlatPermission` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FlatPermissionEntity` instance.

#### `FlattenedPermission(data?: object)`

Create a new `FlattenedPermission` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FlattenedPermissionEntity` instance.

#### `ImportStatus(data?: object)`

Create a new `ImportStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImportStatusEntity` instance.

#### `Metadata(data?: object)`

Create a new `Metadata` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MetadataEntity` instance.

#### `PaginatedPermissionList(data?: object)`

Create a new `PaginatedPermissionList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaginatedPermissionListEntity` instance.

#### `Permission(data?: object)`

Create a new `Permission` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PermissionEntity` instance.

#### `PermissionDatabase(data?: object)`

Create a new `PermissionDatabase` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PermissionDatabaseEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LmUmbrellaSDK.test()`.

**Returns:** `LmUmbrellaSDK` instance in test mode.


---

## DatabaseEntity

```ts
const database = client.Database()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Database().remove({ database_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatabaseEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmUmbrellaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FlatPermissionEntity

```ts
const flat_permission = client.FlatPermission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `boolean` | No |  |
| `msisdn` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FlatPermission().load({ id: 'flat_permission_id', database_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FlatPermissionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmUmbrellaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FlattenedPermissionEntity

```ts
const flattened_permission = client.FlattenedPermission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No |  |
| `empty` | `boolean` | No |  |
| `msisdn` | `string` | No |  |
| `source` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FlattenedPermission().create({
  database_id: 1,
  id: 'example_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.FlattenedPermission().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FlattenedPermission().load({ database_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FlattenedPermissionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmUmbrellaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImportStatusEntity

```ts
const import_status = client.ImportStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `any[]` | No |  |
| `import_id` | `string` | No |  |
| `msisdn` | `string` | No |  |
| `permissions_inserted` | `number` | No |  |
| `permissions_updated` | `number` | No |  |
| `status` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ImportStatus().create({
  database_id: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ImportStatus().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImportStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmUmbrellaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MetadataEntity

```ts
const metadata = client.Metadata()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `Record<string, any>` | No |  |
| `created` | `string` | No |  |
| `database_id` | `number` | No |  |
| `key` | `string` | No |  |
| `label` | `string` | No |  |
| `multi_value` | `boolean` | No |  |
| `type` | `string` | No |  |
| `updated` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Metadata().create({
  database_id: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Metadata().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Metadata().load({ id: 'metadata_id', database_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Metadata().update({
  id: 'metadata_id',
  database_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MetadataEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmUmbrellaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaginatedPermissionListEntity

```ts
const paginated_permission_list = client.PaginatedPermissionList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ascending` | `boolean` | No |  |
| `column` | `any[]` | No |  |
| `end_row` | `number` | No |  |
| `group` | `any[]` | No |  |
| `metadata` | `any[]` | No |  |
| `msisdn_list` | `any[]` | No |  |
| `only_active` | `boolean` | No |  |
| `page` | `number` | No |  |
| `permission` | `any[]` | No |  |
| `quick_filter_text` | `string` | No |  |
| `sort` | `string` | No |  |
| `source` | `any[]` | No |  |
| `start_row` | `number` | No |  |
| `total_active` | `number` | No |  |
| `total_element` | `number` | No |  |
| `total_page` | `number` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PaginatedPermissionList().create({
  database_id: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaginatedPermissionListEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmUmbrellaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PermissionEntity

```ts
const permission = client.Permission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `boolean` | No |  |
| `msisdn` | `string` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Permission().remove({ database_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Permission().update({
  database_id: 1,
  id: 'id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PermissionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmUmbrellaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PermissionDatabaseEntity

```ts
const permission_database = client.PermissionDatabase()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customer_id` | `number` | No |  |
| `delete_on_optout` | `boolean` | No |  |
| `description` | `string` | No |  |
| `hook` | `any[]` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `route` | `any[]` | No |  |
| `sender_alia` | `string` | No |  |
| `service_id` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PermissionDatabase().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PermissionDatabase().load({ database_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.PermissionDatabase().update({
  database_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PermissionDatabaseEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmUmbrellaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new LmUmbrellaSDK({
  feature: {
    test: { active: true },
  }
})
```

