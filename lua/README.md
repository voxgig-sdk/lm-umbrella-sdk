# LmUmbrella Lua SDK



The Lua SDK for the LmUmbrella API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Database()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/lm-umbrella-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("lm-umbrella_sdk")

local client = sdk.new({
  apikey = os.getenv("LM_UMBRELLA_APIKEY"),
})
```

### 3. Load a flatpermission

FlatPermission is nested under database, so provide the `database_id`.

```lua
local flatpermission, err = client:FlatPermission():load({ database_id = 1, id = "example_id" })
if err then error(err) end
print(flatpermission)
```

### 4. Create, update, and remove

```lua
-- Remove
client:Database():remove({ database_id = 1 })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local importstatuss, err = client:ImportStatus():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:ImportStatus():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### LmUmbrellaSDK

```lua
local sdk = require("lm-umbrella_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LmUmbrellaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local flat_permission, err = client:FlatPermission():load({ id = "example_id" })
    if err then error(err) end
    -- flat_permission is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local database = client:Database(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### FlatPermission

Create an instance: `local flat_permission = client:FlatPermission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `boolean` |  |
| `id` | `string` |  |
| `msisdn` | `string` |  |

#### Example: Load

```lua
local flat_permission, err = client:FlatPermission():load({ id = "flat_permission_id", database_id = 1 })
```


### FlattenedPermission

Create an instance: `local flattened_permission = client:FlattenedPermission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` | if permission is active in the database |
| `empty` | `boolean` |  |
| `id` | `string` |  |
| `msisdn` | `string` | phone number |
| `source` | `string` | comma separated list of sources |

#### Example: Load

```lua
local flattened_permission, err = client:FlattenedPermission():load({ database_id = 1 })
```

#### Example: List

```lua
local flattened_permissions, err = client:FlattenedPermission():list()
```

#### Example: Create

```lua
local flattened_permission, err = client:FlattenedPermission():create({
  database_id = 1, -- number
  id = "example_id", -- string
})
```


### ImportStatus

Create an instance: `local import_status = client:ImportStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `table` | Import errors (List of ImportError) |
| `importId` | `string` | Import id |
| `msisdn` | `string` |  |
| `permissionsInserted` | `number` | Number of permissions inserted into database |
| `permissionsUpdated` | `number` | Number of permissions updated in database |
| `status` | `string` | Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL) |

#### Example: List

```lua
local import_statuss, err = client:ImportStatus():list()
```

#### Example: Create

```lua
local import_status, err = client:ImportStatus():create({
  database_id = 1, -- number
})
```


### Metadata

Create an instance: `local metadata = client:Metadata(nil)`

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
| `contents` | `table` | Contains extra info for a field |
| `created` | `string` | created date of the field |
| `databaseId` | `number` | id of the database |
| `id` | `string` |  |
| `key` | `string` | key for the field (used for the value internally - cannot be changed after creation) |
| `label` | `string` | label for the field (used for displaying in the interface) |
| `multiValue` | `boolean` | if the field is a multi value field |
| `rangeEnd` | `number` | end on range for validation on INTEGER field |
| `rangeStart` | `number` | start on range for validation on INTEGER field |
| `type` | `string` | the type of field |
| `updated` | `string` | deletion date of the field |
| `validation` | `string` | type of validation on TEXT field |
| `values` | `table` | Possible enumeration of values for ENUMERATION field |

#### Example: Load

```lua
local metadata, err = client:Metadata():load({ id = "metadata_id", database_id = 1 })
```

#### Example: List

```lua
local metadatas, err = client:Metadata():list()
```

#### Example: Create

```lua
local metadata, err = client:Metadata():create({
  database_id = 1, -- number
})
```


### PaginatedPermissionList

Create an instance: `local paginated_permission_list = client:PaginatedPermissionList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ascending` | `boolean` |  |
| `columns` | `table` | the column data |
| `endRow` | `number` |  |
| `groups` | `table` |  |
| `metadata` | `table` |  |
| `msisdnList` | `table` |  |
| `onlyActive` | `boolean` |  |
| `page` | `number` | page number |
| `permissions` | `table` | the permissions for the page |
| `quickFilterText` | `string` |  |
| `sort` | `string` |  |
| `sources` | `table` | the possible sources for the database |
| `startRow` | `number` |  |
| `totalActive` | `number` | total number of active permissions |
| `totalElements` | `number` | total number of permissions |
| `totalPages` | `number` | total number of pages |

#### Example: Create

```lua
local paginated_permission_list, err = client:PaginatedPermissionList():create({
  database_id = 1, -- number
})
```


### Permission

Create an instance: `local permission = client:Permission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `boolean` |  |
| `id` | `string` |  |
| `msisdn` | `string` |  |


### PermissionDatabase

Create an instance: `local permission_database = client:PermissionDatabase(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customerId` | `number` |  |
| `deleteOnOptout` | `boolean` |  |
| `description` | `string` |  |
| `hooks` | `table` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `routes` | `table` |  |
| `senderAlias` | `string` |  |
| `serviceId` | `number` |  |

#### Example: Load

```lua
local permission_database, err = client:PermissionDatabase():load({ database_id = 1 })
```

#### Example: List

```lua
local permission_databases, err = client:PermissionDatabase():list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── lm-umbrella_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`lm-umbrella_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local importstatus = client:ImportStatus()
importstatus:list()

-- importstatus:data_get() now returns the importstatus data from the last list
-- importstatus:match_get() returns the last match criteria
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
