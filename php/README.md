# LmUmbrella PHP SDK



The PHP SDK for the LmUmbrella API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Database()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/lm-umbrella-sdk/releases](https://github.com/voxgig-sdk/lm-umbrella-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'lmumbrella_sdk.php';

$client = new LmUmbrellaSDK([
    "apikey" => getenv("LM_UMBRELLA_APIKEY"),
]);
```

### 3. Load a flatpermission

FlatPermission is nested under database, so provide the `database_id`.

```php
try {
    // load() returns the bare FlatPermission record (throws on error).
    $flatpermission = $client->FlatPermission()->load(["database_id" => 1, "id" => "example_id"]);
    print_r($flatpermission);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// Remove
$client->Database()->remove(["database_id" => 1]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $flatpermission = $client->FlatPermission()->load(["id" => "example_id"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = LmUmbrellaSDK::test([
    "entity" => ["flatpermission" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$flatpermission = $client->FlatPermission()->load(["id" => "test01"]);
print_r($flatpermission);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new LmUmbrellaSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
LM_UMBRELLA_TEST_LIVE=TRUE
LM_UMBRELLA_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### LmUmbrellaSDK

```php
require_once 'lmumbrella_sdk.php';
$client = new LmUmbrellaSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = LmUmbrellaSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### LmUmbrellaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Database` | `($data): DatabaseEntity` | Create a Database entity instance. |
| `FlatPermission` | `($data): FlatPermissionEntity` | Create a FlatPermission entity instance. |
| `FlattenedPermission` | `($data): FlattenedPermissionEntity` | Create a FlattenedPermission entity instance. |
| `ImportStatus` | `($data): ImportStatusEntity` | Create an ImportStatus entity instance. |
| `Metadata` | `($data): MetadataEntity` | Create a Metadata entity instance. |
| `PaginatedPermissionList` | `($data): PaginatedPermissionListEntity` | Create a PaginatedPermissionList entity instance. |
| `Permission` | `($data): PermissionEntity` | Create a Permission entity instance. |
| `PermissionDatabase` | `($data): PermissionDatabaseEntity` | Create a PermissionDatabase entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Database

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/public/database/{id}`

#### FlatPermission

| Field | Description |
| --- | --- |
| `empty` |  |
| `msisdn` |  |

Operations: Load.

API path: `/public/database/{id}/permission/{msisdn}`

#### FlattenedPermission

| Field | Description |
| --- | --- |
| `active` |  |
| `empty` |  |
| `msisdn` |  |
| `source` |  |

Operations: Create, List, Load.

API path: `/public/database/{id}/permission/{msisdn}`

#### ImportStatus

| Field | Description |
| --- | --- |
| `error` |  |
| `import_id` |  |
| `msisdn` |  |
| `permissions_inserted` |  |
| `permissions_updated` |  |
| `status` |  |

Operations: Create, List.

API path: `/public/database/{id}/permission/bulk`

#### Metadata

| Field | Description |
| --- | --- |
| `content` |  |
| `created` |  |
| `database_id` |  |
| `key` |  |
| `label` |  |
| `multi_value` |  |
| `type` |  |
| `updated` |  |

Operations: Create, List, Load, Update.

API path: `/public/database/{id}/metadata/{key}`

#### PaginatedPermissionList

| Field | Description |
| --- | --- |
| `ascending` |  |
| `column` |  |
| `end_row` |  |
| `group` |  |
| `metadata` |  |
| `msisdn_list` |  |
| `only_active` |  |
| `page` |  |
| `permission` |  |
| `quick_filter_text` |  |
| `sort` |  |
| `source` |  |
| `start_row` |  |
| `total_active` |  |
| `total_element` |  |
| `total_page` |  |

Operations: Create.

API path: `/public/database/{id}/permission/paged/list`

#### Permission

| Field | Description |
| --- | --- |
| `empty` |  |
| `msisdn` |  |

Operations: Remove, Update.

API path: `/public/database/{id}/permission/{msisdn}`

#### PermissionDatabase

| Field | Description |
| --- | --- |
| `customer_id` |  |
| `delete_on_optout` |  |
| `description` |  |
| `hook` |  |
| `id` |  |
| `name` |  |
| `route` |  |
| `sender_alia` |  |
| `service_id` |  |

Operations: List, Load, Update.

API path: `/public/database/list`



## Entities


### Database

Create an instance: `$database = $client->Database();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### FlatPermission

Create an instance: `$flat_permission = $client->FlatPermission();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `bool` |  |
| `msisdn` | `string` |  |

#### Example: Load

```php
// load() returns the bare FlatPermission record (throws on error).
$flat_permission = $client->FlatPermission()->load(["id" => "flat_permission_id", "database_id" => 1]);
```


### FlattenedPermission

Create an instance: `$flattened_permission = $client->FlattenedPermission();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `empty` | `bool` |  |
| `msisdn` | `string` |  |
| `source` | `string` |  |

#### Example: Load

```php
// load() returns the bare FlattenedPermission record (throws on error).
$flattened_permission = $client->FlattenedPermission()->load(["database_id" => 1]);
```

#### Example: List

```php
// list() returns an array of FlattenedPermission records (throws on error).
$flattened_permissions = $client->FlattenedPermission()->list();
```

#### Example: Create

```php
$flattened_permission = $client->FlattenedPermission()->create([
    "database_id" => null, // int
    "id" => null, // string
]);
```


### ImportStatus

Create an instance: `$import_status = $client->ImportStatus();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `array` |  |
| `import_id` | `string` |  |
| `msisdn` | `string` |  |
| `permissions_inserted` | `int` |  |
| `permissions_updated` | `int` |  |
| `status` | `string` |  |

#### Example: List

```php
// list() returns an array of ImportStatus records (throws on error).
$import_statuss = $client->ImportStatus()->list();
```

#### Example: Create

```php
$import_status = $client->ImportStatus()->create([
    "database_id" => null, // int
]);
```


### Metadata

Create an instance: `$metadata = $client->Metadata();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `array` |  |
| `created` | `string` |  |
| `database_id` | `int` |  |
| `key` | `string` |  |
| `label` | `string` |  |
| `multi_value` | `bool` |  |
| `type` | `string` |  |
| `updated` | `string` |  |

#### Example: Load

```php
// load() returns the bare Metadata record (throws on error).
$metadata = $client->Metadata()->load(["id" => "metadata_id", "database_id" => 1]);
```

#### Example: List

```php
// list() returns an array of Metadata records (throws on error).
$metadatas = $client->Metadata()->list();
```

#### Example: Create

```php
$metadata = $client->Metadata()->create([
    "database_id" => null, // int
]);
```


### PaginatedPermissionList

Create an instance: `$paginated_permission_list = $client->PaginatedPermissionList();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ascending` | `bool` |  |
| `column` | `array` |  |
| `end_row` | `int` |  |
| `group` | `array` |  |
| `metadata` | `array` |  |
| `msisdn_list` | `array` |  |
| `only_active` | `bool` |  |
| `page` | `int` |  |
| `permission` | `array` |  |
| `quick_filter_text` | `string` |  |
| `sort` | `string` |  |
| `source` | `array` |  |
| `start_row` | `int` |  |
| `total_active` | `int` |  |
| `total_element` | `int` |  |
| `total_page` | `int` |  |

#### Example: Create

```php
$paginated_permission_list = $client->PaginatedPermissionList()->create([
    "database_id" => null, // int
]);
```


### Permission

Create an instance: `$permission = $client->Permission();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `bool` |  |
| `msisdn` | `string` |  |


### PermissionDatabase

Create an instance: `$permission_database = $client->PermissionDatabase();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customer_id` | `int` |  |
| `delete_on_optout` | `bool` |  |
| `description` | `string` |  |
| `hook` | `array` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `route` | `array` |  |
| `sender_alia` | `string` |  |
| `service_id` | `int` |  |

#### Example: Load

```php
// load() returns the bare PermissionDatabase record (throws on error).
$permission_database = $client->PermissionDatabase()->load(["database_id" => 1]);
```

#### Example: List

```php
// list() returns an array of PermissionDatabase records (throws on error).
$permission_databases = $client->PermissionDatabase()->list();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── lmumbrella_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`lmumbrella_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$flatpermission = $client->FlatPermission();
$flatpermission->load(["id" => "example_id"]);

// $flatpermission->data_get() now returns the flatpermission data from the last load
// $flatpermission->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
