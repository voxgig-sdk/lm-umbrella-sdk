# LmUmbrella PHP SDK Reference

Complete API reference for the LmUmbrella PHP SDK.


## LmUmbrellaSDK

### Constructor

```php
require_once __DIR__ . '/lmumbrella_sdk.php';

$client = new LmUmbrellaSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmUmbrellaSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = LmUmbrellaSDK::test();
```


### Instance Methods

#### `Database($data = null)`

Create a new `DatabaseEntity` instance. Pass `null` for no initial data.

#### `FlatPermission($data = null)`

Create a new `FlatPermissionEntity` instance. Pass `null` for no initial data.

#### `FlattenedPermission($data = null)`

Create a new `FlattenedPermissionEntity` instance. Pass `null` for no initial data.

#### `ImportStatus($data = null)`

Create a new `ImportStatusEntity` instance. Pass `null` for no initial data.

#### `Metadata($data = null)`

Create a new `MetadataEntity` instance. Pass `null` for no initial data.

#### `PaginatedPermissionList($data = null)`

Create a new `PaginatedPermissionListEntity` instance. Pass `null` for no initial data.

#### `Permission($data = null)`

Create a new `PermissionEntity` instance. Pass `null` for no initial data.

#### `PermissionDatabase($data = null)`

Create a new `PermissionDatabaseEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): LmUmbrellaUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DatabaseEntity

```php
$database = $client->Database();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Database()->remove(["database_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DatabaseEntity`

Create a new `DatabaseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FlatPermissionEntity

```php
$flat_permission = $client->FlatPermission();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `bool` | No |  |
| `msisdn` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->FlatPermission()->load(["id" => "flat_permission_id", "database_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FlatPermissionEntity`

Create a new `FlatPermissionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FlattenedPermissionEntity

```php
$flattened_permission = $client->FlattenedPermission();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No |  |
| `empty` | `bool` | No |  |
| `msisdn` | `string` | No |  |
| `source` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->FlattenedPermission()->create([
  "database_id" => null, // int
  "id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->FlattenedPermission()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->FlattenedPermission()->load(["database_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FlattenedPermissionEntity`

Create a new `FlattenedPermissionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ImportStatusEntity

```php
$import_status = $client->ImportStatus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `array` | No |  |
| `import_id` | `string` | No |  |
| `msisdn` | `string` | No |  |
| `permissions_inserted` | `int` | No |  |
| `permissions_updated` | `int` | No |  |
| `status` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ImportStatus()->create([
  "database_id" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ImportStatus()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ImportStatusEntity`

Create a new `ImportStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MetadataEntity

```php
$metadata = $client->Metadata();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `array` | No |  |
| `created` | `string` | No |  |
| `database_id` | `int` | No |  |
| `key` | `string` | No |  |
| `label` | `string` | No |  |
| `multi_value` | `bool` | No |  |
| `type` | `string` | No |  |
| `updated` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Metadata()->create([
  "database_id" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Metadata()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Metadata()->load(["id" => "metadata_id", "database_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Metadata()->update([
  "id" => "metadata_id",
  "database_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MetadataEntity`

Create a new `MetadataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaginatedPermissionListEntity

```php
$paginated_permission_list = $client->PaginatedPermissionList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ascending` | `bool` | No |  |
| `column` | `array` | No |  |
| `end_row` | `int` | No |  |
| `group` | `array` | No |  |
| `metadata` | `array` | No |  |
| `msisdn_list` | `array` | No |  |
| `only_active` | `bool` | No |  |
| `page` | `int` | No |  |
| `permission` | `array` | No |  |
| `quick_filter_text` | `string` | No |  |
| `sort` | `string` | No |  |
| `source` | `array` | No |  |
| `start_row` | `int` | No |  |
| `total_active` | `int` | No |  |
| `total_element` | `int` | No |  |
| `total_page` | `int` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->PaginatedPermissionList()->create([
  "database_id" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaginatedPermissionListEntity`

Create a new `PaginatedPermissionListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PermissionEntity

```php
$permission = $client->Permission();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `bool` | No |  |
| `msisdn` | `string` | No |  |

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Permission()->remove(["database_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Permission()->update([
  "database_id" => 1,
  "id" => "id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PermissionEntity`

Create a new `PermissionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PermissionDatabaseEntity

```php
$permission_database = $client->PermissionDatabase();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customer_id` | `int` | No |  |
| `delete_on_optout` | `bool` | No |  |
| `description` | `string` | No |  |
| `hook` | `array` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `route` | `array` | No |  |
| `sender_alia` | `string` | No |  |
| `service_id` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PermissionDatabase()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PermissionDatabase()->load(["database_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->PermissionDatabase()->update([
  "database_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PermissionDatabaseEntity`

Create a new `PermissionDatabaseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new LmUmbrellaSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

