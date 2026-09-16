# LmUmbrella Ruby SDK



The Ruby SDK for the LmUmbrella API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Database` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/lm-umbrella-sdk/releases](https://github.com/voxgig-sdk/lm-umbrella-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "LmUmbrella_sdk"

client = LmUmbrellaSDK.new({
  "apikey" => ENV["LM_UMBRELLA_APIKEY"],
})
```

### 3. Load a flatpermission

FlatPermission is nested under database, so provide the `database_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the FlatPermission record (raises on error).
  flatpermission = client.FlatPermission.load({ "database_id" => 1, "id" => "example_id" })
  puts flatpermission
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# Remove
client.Database.remove({ "database_id" => 1 })
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  importstatuss = client.ImportStatus.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = LmUmbrellaSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
importstatus = client.ImportStatus.list()
puts importstatus
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = LmUmbrellaSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LM_UMBRELLA_TEST_LIVE=TRUE
LM_UMBRELLA_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### LmUmbrellaSDK

```ruby
require_relative "LmUmbrella_sdk"
client = LmUmbrellaSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = LmUmbrellaSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LmUmbrellaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Database` | `(data) -> DatabaseEntity` | Create a Database entity instance. |
| `FlatPermission` | `(data) -> FlatPermissionEntity` | Create a FlatPermission entity instance. |
| `FlattenedPermission` | `(data) -> FlattenedPermissionEntity` | Create a FlattenedPermission entity instance. |
| `ImportStatus` | `(data) -> ImportStatusEntity` | Create an ImportStatus entity instance. |
| `Metadata` | `(data) -> MetadataEntity` | Create a Metadata entity instance. |
| `PaginatedPermissionList` | `(data) -> PaginatedPermissionListEntity` | Create a PaginatedPermissionList entity instance. |
| `Permission` | `(data) -> PermissionEntity` | Create a Permission entity instance. |
| `PermissionDatabase` | `(data) -> PermissionDatabaseEntity` | Create a PermissionDatabase entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `LmUmbrellaError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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
| `id` |  |
| `msisdn` |  |

Operations: Load.

API path: `/public/database/{id}/permission/{msisdn}`

#### FlattenedPermission

| Field | Description |
| --- | --- |
| `active` | if permission is active in the database |
| `empty` |  |
| `id` |  |
| `msisdn` | phone number |
| `source` | comma separated list of sources |

Operations: Create, List, Load.

API path: `/public/database/{id}/permission/{msisdn}`

#### ImportStatus

| Field | Description |
| --- | --- |
| `errors` | Import errors (List of ImportError) |
| `importId` | Import id |
| `msisdn` |  |
| `permissionsInserted` | Number of permissions inserted into database |
| `permissionsUpdated` | Number of permissions updated in database |
| `status` | Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL) |

Operations: Create, List.

API path: `/public/database/{id}/permission/bulk`

#### Metadata

| Field | Description |
| --- | --- |
| `contents` | Contains extra info for a field |
| `created` | created date of the field |
| `databaseId` | id of the database |
| `id` |  |
| `key` | key for the field (used for the value internally - cannot be changed after creation) |
| `label` | label for the field (used for displaying in the interface) |
| `multiValue` | if the field is a multi value field |
| `rangeEnd` | end on range for validation on INTEGER field |
| `rangeStart` | start on range for validation on INTEGER field |
| `type` | the type of field |
| `updated` | deletion date of the field |
| `validation` | type of validation on TEXT field |
| `values` | Possible enumeration of values for ENUMERATION field |

Operations: Create, List, Load, Update.

API path: `/public/database/{id}/metadata/{key}`

#### PaginatedPermissionList

| Field | Description |
| --- | --- |
| `ascending` |  |
| `columns` | the column data |
| `endRow` |  |
| `groups` |  |
| `metadata` |  |
| `msisdnList` |  |
| `onlyActive` |  |
| `page` | page number |
| `permissions` | the permissions for the page |
| `quickFilterText` |  |
| `sort` |  |
| `sources` | the possible sources for the database |
| `startRow` |  |
| `totalActive` | total number of active permissions |
| `totalElements` | total number of permissions |
| `totalPages` | total number of pages |

Operations: Create.

API path: `/public/database/{id}/permission/paged/list`

#### Permission

| Field | Description |
| --- | --- |
| `empty` |  |
| `id` |  |
| `msisdn` |  |

Operations: Remove, Update.

API path: `/public/database/{id}/permission/{msisdn}`

#### PermissionDatabase

| Field | Description |
| --- | --- |
| `customerId` |  |
| `deleteOnOptout` |  |
| `description` |  |
| `hooks` |  |
| `id` |  |
| `name` |  |
| `routes` |  |
| `senderAlias` |  |
| `serviceId` |  |

Operations: List, Load, Update.

API path: `/public/database/list`



## Entities


### Database

Create an instance: `database = client.Database`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### FlatPermission

Create an instance: `flat_permission = client.FlatPermission`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `Boolean` |  |
| `id` | `String` |  |
| `msisdn` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the FlatPermission record (raises on error).
flat_permission = client.FlatPermission.load({ "id" => "flat_permission_id", "database_id" => 1 })
```


### FlattenedPermission

Create an instance: `flattened_permission = client.FlattenedPermission`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` | if permission is active in the database |
| `empty` | `Boolean` |  |
| `id` | `String` |  |
| `msisdn` | `String` | phone number |
| `source` | `String` | comma separated list of sources |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the FlattenedPermission record (raises on error).
flattened_permission = client.FlattenedPermission.load({ "database_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of FlattenedPermission records (raises on error).
flattened_permissions = client.FlattenedPermission.list
```

#### Example: Create

```ruby
flattened_permission = client.FlattenedPermission.create({
  "database_id" => 1, # Integer
  "id" => "example_id", # String
})
```


### ImportStatus

Create an instance: `import_status = client.ImportStatus`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `Array` | Import errors (List of ImportError) |
| `importId` | `String` | Import id |
| `msisdn` | `String` |  |
| `permissionsInserted` | `Integer` | Number of permissions inserted into database |
| `permissionsUpdated` | `Integer` | Number of permissions updated in database |
| `status` | `String` | Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL) |

#### Example: List

```ruby
# list returns an Array of ImportStatus records (raises on error).
import_statuss = client.ImportStatus.list
```

#### Example: Create

```ruby
import_status = client.ImportStatus.create({
  "database_id" => 1, # Integer
})
```


### Metadata

Create an instance: `metadata = client.Metadata`

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
| `contents` | `Hash` | Contains extra info for a field |
| `created` | `String` | created date of the field |
| `databaseId` | `Integer` | id of the database |
| `id` | `String` |  |
| `key` | `String` | key for the field (used for the value internally - cannot be changed after creation) |
| `label` | `String` | label for the field (used for displaying in the interface) |
| `multiValue` | `Boolean` | if the field is a multi value field |
| `rangeEnd` | `Integer` | end on range for validation on INTEGER field |
| `rangeStart` | `Integer` | start on range for validation on INTEGER field |
| `type` | `String` | the type of field |
| `updated` | `String` | deletion date of the field |
| `validation` | `String` | type of validation on TEXT field |
| `values` | `Array` | Possible enumeration of values for ENUMERATION field |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Metadata record (raises on error).
metadata = client.Metadata.load({ "id" => "metadata_id", "database_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Metadata records (raises on error).
metadatas = client.Metadata.list
```

#### Example: Create

```ruby
metadata = client.Metadata.create({
  "database_id" => 1, # Integer
})
```


### PaginatedPermissionList

Create an instance: `paginated_permission_list = client.PaginatedPermissionList`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ascending` | `Boolean` |  |
| `columns` | `Array` | the column data |
| `endRow` | `Integer` |  |
| `groups` | `Array` |  |
| `metadata` | `Array` |  |
| `msisdnList` | `Array` |  |
| `onlyActive` | `Boolean` |  |
| `page` | `Integer` | page number |
| `permissions` | `Array` | the permissions for the page |
| `quickFilterText` | `String` |  |
| `sort` | `String` |  |
| `sources` | `Array` | the possible sources for the database |
| `startRow` | `Integer` |  |
| `totalActive` | `Integer` | total number of active permissions |
| `totalElements` | `Integer` | total number of permissions |
| `totalPages` | `Integer` | total number of pages |

#### Example: Create

```ruby
paginated_permission_list = client.PaginatedPermissionList.create({
  "database_id" => 1, # Integer
})
```


### Permission

Create an instance: `permission = client.Permission`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `Boolean` |  |
| `id` | `String` |  |
| `msisdn` | `String` |  |


### PermissionDatabase

Create an instance: `permission_database = client.PermissionDatabase`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customerId` | `Integer` |  |
| `deleteOnOptout` | `Boolean` |  |
| `description` | `String` |  |
| `hooks` | `Array` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `routes` | `Array` |  |
| `senderAlias` | `String` |  |
| `serviceId` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PermissionDatabase record (raises on error).
permission_database = client.PermissionDatabase.load({ "database_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of PermissionDatabase records (raises on error).
permission_databases = client.PermissionDatabase.list
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── LmUmbrella_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`LmUmbrella_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
importstatus = client.ImportStatus
importstatus.list()

# importstatus.data_get now returns the importstatus data from the last list
# importstatus.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
