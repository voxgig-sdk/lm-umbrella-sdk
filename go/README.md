# LmUmbrella Golang SDK



The Golang SDK for the LmUmbrella API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Database(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/lm-umbrella-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/lm-umbrella-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/lm-umbrella-sdk/go=../lm-umbrella-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/lm-umbrella-sdk/go"
)

func main() {
    client := sdk.NewLmUmbrellaSDK(map[string]any{
        "apikey": os.Getenv("LM_UMBRELLA_APIKEY"),
    })

    // Remove a database.
    removed, err := client.Database(nil).Remove(map[string]any{"database_id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
importstatuss, err := client.ImportStatus(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = importstatuss
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

importStatus, err := client.ImportStatus(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(importStatus) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewLmUmbrellaSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewLmUmbrellaSDK

```go
func NewLmUmbrellaSDK(options map[string]any) *LmUmbrellaSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *LmUmbrellaSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LmUmbrellaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Database` | `(data map[string]any) LmUmbrellaEntity` | Create a Database entity instance. |
| `FlatPermission` | `(data map[string]any) LmUmbrellaEntity` | Create a FlatPermission entity instance. |
| `FlattenedPermission` | `(data map[string]any) LmUmbrellaEntity` | Create a FlattenedPermission entity instance. |
| `ImportStatus` | `(data map[string]any) LmUmbrellaEntity` | Create an ImportStatus entity instance. |
| `Metadata` | `(data map[string]any) LmUmbrellaEntity` | Create a Metadata entity instance. |
| `PaginatedPermissionList` | `(data map[string]any) LmUmbrellaEntity` | Create a PaginatedPermissionList entity instance. |
| `Permission` | `(data map[string]any) LmUmbrellaEntity` | Create a Permission entity instance. |
| `PermissionDatabase` | `(data map[string]any) LmUmbrellaEntity` | Create a PermissionDatabase entity instance. |

### Entity interface (LmUmbrellaEntity)

All entities implement the `LmUmbrellaEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    database, err := client.Database(nil).Remove(nil, nil)
    if err != nil { /* handle */ }
    // database is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Database

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/public/database/{id}`

#### FlatPermission

| Field | Description |
| --- | --- |
| `"empty"` |  |
| `"id"` |  |
| `"msisdn"` |  |

Operations: Load.

API path: `/public/database/{id}/permission/{msisdn}`

#### FlattenedPermission

| Field | Description |
| --- | --- |
| `"active"` | if permission is active in the database |
| `"empty"` |  |
| `"id"` |  |
| `"msisdn"` | phone number |
| `"source"` | comma separated list of sources |

Operations: Create, List, Load.

API path: `/public/database/{id}/permission/{msisdn}`

#### ImportStatus

| Field | Description |
| --- | --- |
| `"errors"` | Import errors (List of ImportError) |
| `"importId"` | Import id |
| `"msisdn"` |  |
| `"permissionsInserted"` | Number of permissions inserted into database |
| `"permissionsUpdated"` | Number of permissions updated in database |
| `"status"` | Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL) |

Operations: Create, List.

API path: `/public/database/{id}/permission/bulk`

#### Metadata

| Field | Description |
| --- | --- |
| `"contents"` | Contains extra info for a field |
| `"created"` | created date of the field |
| `"databaseId"` | id of the database |
| `"id"` |  |
| `"key"` | key for the field (used for the value internally - cannot be changed after creation) |
| `"label"` | label for the field (used for displaying in the interface) |
| `"multiValue"` | if the field is a multi value field |
| `"rangeEnd"` | end on range for validation on INTEGER field |
| `"rangeStart"` | start on range for validation on INTEGER field |
| `"type"` | the type of field |
| `"updated"` | deletion date of the field |
| `"validation"` | type of validation on TEXT field |
| `"values"` | Possible enumeration of values for ENUMERATION field |

Operations: Create, List, Load, Update.

API path: `/public/database/{id}/metadata/{key}`

#### PaginatedPermissionList

| Field | Description |
| --- | --- |
| `"ascending"` |  |
| `"columns"` | the column data |
| `"endRow"` |  |
| `"groups"` |  |
| `"metadata"` |  |
| `"msisdnList"` |  |
| `"onlyActive"` |  |
| `"page"` | page number |
| `"permissions"` | the permissions for the page |
| `"quickFilterText"` |  |
| `"sort"` |  |
| `"sources"` | the possible sources for the database |
| `"startRow"` |  |
| `"totalActive"` | total number of active permissions |
| `"totalElements"` | total number of permissions |
| `"totalPages"` | total number of pages |

Operations: Create.

API path: `/public/database/{id}/permission/paged/list`

#### Permission

| Field | Description |
| --- | --- |
| `"empty"` |  |
| `"id"` |  |
| `"msisdn"` |  |

Operations: Remove, Update.

API path: `/public/database/{id}/permission/{msisdn}`

#### PermissionDatabase

| Field | Description |
| --- | --- |
| `"customerId"` |  |
| `"deleteOnOptout"` |  |
| `"description"` |  |
| `"hooks"` |  |
| `"id"` |  |
| `"name"` |  |
| `"routes"` |  |
| `"senderAlias"` |  |
| `"serviceId"` |  |

Operations: List, Load, Update.

API path: `/public/database/list`



## Entities


### Database

Create an instance: `database := client.Database(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### FlatPermission

Create an instance: `flatPermission := client.FlatPermission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `bool` |  |
| `id` | `string` |  |
| `msisdn` | `string` |  |

#### Example: Load

```go
flatPermission, err := client.FlatPermission(nil).Load(map[string]any{"id": "flat_permission_id", "database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(flatPermission) // the loaded record
```


### FlattenedPermission

Create an instance: `flattenedPermission := client.FlattenedPermission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` | if permission is active in the database |
| `empty` | `bool` |  |
| `id` | `string` |  |
| `msisdn` | `string` | phone number |
| `source` | `string` | comma separated list of sources |

#### Example: Load

```go
flattenedPermission, err := client.FlattenedPermission(nil).Load(map[string]any{"database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(flattenedPermission) // the loaded record
```

#### Example: List

```go
flattenedPermissions, err := client.FlattenedPermission(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(flattenedPermissions) // the array of records
```

#### Example: Create

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


### ImportStatus

Create an instance: `importStatus := client.ImportStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `[]any` | Import errors (List of ImportError) |
| `importId` | `string` | Import id |
| `msisdn` | `string` |  |
| `permissionsInserted` | `int` | Number of permissions inserted into database |
| `permissionsUpdated` | `int` | Number of permissions updated in database |
| `status` | `string` | Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL) |

#### Example: List

```go
importStatuss, err := client.ImportStatus(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(importStatuss) // the array of records
```

#### Example: Create

```go
result, err := client.ImportStatus(nil).Create(map[string]any{
    "database_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Metadata

Create an instance: `metadata := client.Metadata(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contents` | `map[string]any` | Contains extra info for a field |
| `created` | `string` | created date of the field |
| `databaseId` | `int` | id of the database |
| `id` | `string` |  |
| `key` | `string` | key for the field (used for the value internally - cannot be changed after creation) |
| `label` | `string` | label for the field (used for displaying in the interface) |
| `multiValue` | `bool` | if the field is a multi value field |
| `rangeEnd` | `int` | end on range for validation on INTEGER field |
| `rangeStart` | `int` | start on range for validation on INTEGER field |
| `type` | `string` | the type of field |
| `updated` | `string` | deletion date of the field |
| `validation` | `string` | type of validation on TEXT field |
| `values` | `[]any` | Possible enumeration of values for ENUMERATION field |

#### Example: Load

```go
metadata, err := client.Metadata(nil).Load(map[string]any{"id": "metadata_id", "database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(metadata) // the loaded record
```

#### Example: List

```go
metadatas, err := client.Metadata(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(metadatas) // the array of records
```

#### Example: Create

```go
result, err := client.Metadata(nil).Create(map[string]any{
    "database_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### PaginatedPermissionList

Create an instance: `paginatedPermissionList := client.PaginatedPermissionList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ascending` | `bool` |  |
| `columns` | `[]any` | the column data |
| `endRow` | `int` |  |
| `groups` | `[]any` |  |
| `metadata` | `[]any` |  |
| `msisdnList` | `[]any` |  |
| `onlyActive` | `bool` |  |
| `page` | `int` | page number |
| `permissions` | `[]any` | the permissions for the page |
| `quickFilterText` | `string` |  |
| `sort` | `string` |  |
| `sources` | `[]any` | the possible sources for the database |
| `startRow` | `int` |  |
| `totalActive` | `int` | total number of active permissions |
| `totalElements` | `int` | total number of permissions |
| `totalPages` | `int` | total number of pages |

#### Example: Create

```go
result, err := client.PaginatedPermissionList(nil).Create(map[string]any{
    "database_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Permission

Create an instance: `permission := client.Permission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `bool` |  |
| `id` | `string` |  |
| `msisdn` | `string` |  |


### PermissionDatabase

Create an instance: `permissionDatabase := client.PermissionDatabase(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customerId` | `int` |  |
| `deleteOnOptout` | `bool` |  |
| `description` | `string` |  |
| `hooks` | `[]any` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `routes` | `[]any` |  |
| `senderAlias` | `string` |  |
| `serviceId` | `int` |  |

#### Example: Load

```go
permissionDatabase, err := client.PermissionDatabase(nil).Load(map[string]any{"database_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(permissionDatabase) // the loaded record
```

#### Example: List

```go
permissionDatabases, err := client.PermissionDatabase(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(permissionDatabases) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/lm-umbrella-sdk/go/
├── lm-umbrella.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/lm-umbrella-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
importstatus := client.ImportStatus(nil)
importstatus.List(nil, nil)

// importstatus.Data() now returns the importstatus data from the last list
// importstatus.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
