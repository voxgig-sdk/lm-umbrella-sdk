# LmUmbrella Python SDK



The Python SDK for the LmUmbrella API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Database()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/lm-umbrella-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from lmumbrella_sdk import LmUmbrellaSDK

client = LmUmbrellaSDK({
    "apikey": os.environ.get("LM_UMBRELLA_APIKEY"),
})
```

### 3. Load a flatpermission

FlatPermission is nested under database, so provide the `database_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    flatpermission = client.FlatPermission().load({"database_id": 1, "id": "example_id"})
    print(flatpermission)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Remove
client.Database().remove({"database_id": 1})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    importstatuss = client.ImportStatus().list()
    print(importstatuss)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = LmUmbrellaSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
importstatus = client.ImportStatus().list()
# importstatus contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = LmUmbrellaSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### LmUmbrellaSDK

```python
from lmumbrella_sdk import LmUmbrellaSDK

client = LmUmbrellaSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = LmUmbrellaSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### LmUmbrellaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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
| `active` | if permission is active in the database |
| `empty` |  |
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

Create an instance: `database = client.Database()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### FlatPermission

Create an instance: `flat_permission = client.FlatPermission()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `bool` |  |
| `msisdn` | `str` |  |

#### Example: Load

```python
flat_permission = client.FlatPermission().load({"id": "flat_permission_id", "database_id": 1})
```


### FlattenedPermission

Create an instance: `flattened_permission = client.FlattenedPermission()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` | if permission is active in the database |
| `empty` | `bool` |  |
| `msisdn` | `str` | phone number |
| `source` | `str` | comma separated list of sources |

#### Example: Load

```python
flattened_permission = client.FlattenedPermission().load({"database_id": 1})
```

#### Example: List

```python
flattened_permissions = client.FlattenedPermission().list({"database_id": 1})
```

#### Example: Create

```python
flattened_permission = client.FlattenedPermission().create({
    "database_id": 1,  # int
    "id": "example_id",  # str
})
```


### ImportStatus

Create an instance: `import_status = client.ImportStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `list` | Import errors (List of ImportError) |
| `importId` | `str` | Import id |
| `msisdn` | `str` |  |
| `permissionsInserted` | `int` | Number of permissions inserted into database |
| `permissionsUpdated` | `int` | Number of permissions updated in database |
| `status` | `str` | Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL) |

#### Example: List

```python
import_statuss = client.ImportStatus().list({"database_id": 1})
```

#### Example: Create

```python
import_status = client.ImportStatus().create({
    "database_id": 1,  # int
})
```


### Metadata

Create an instance: `metadata = client.Metadata()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contents` | `dict` | Contains extra info for a field |
| `created` | `str` | created date of the field |
| `databaseId` | `int` | id of the database |
| `key` | `str` | key for the field (used for the value internally - cannot be changed after creation) |
| `label` | `str` | label for the field (used for displaying in the interface) |
| `multiValue` | `bool` | if the field is a multi value field |
| `rangeEnd` | `int` | end on range for validation on INTEGER field |
| `rangeStart` | `int` | start on range for validation on INTEGER field |
| `type` | `str` | the type of field |
| `updated` | `str` | deletion date of the field |
| `validation` | `str` | type of validation on TEXT field |
| `values` | `list` | Possible enumeration of values for ENUMERATION field |

#### Example: Load

```python
metadata = client.Metadata().load({"id": "metadata_id", "database_id": 1})
```

#### Example: List

```python
metadatas = client.Metadata().list({"database_id": 1})
```

#### Example: Create

```python
metadata = client.Metadata().create({
    "database_id": 1,  # int
})
```


### PaginatedPermissionList

Create an instance: `paginated_permission_list = client.PaginatedPermissionList()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ascending` | `bool` |  |
| `columns` | `list` | the column data |
| `endRow` | `int` |  |
| `groups` | `list` |  |
| `metadata` | `list` |  |
| `msisdnList` | `list` |  |
| `onlyActive` | `bool` |  |
| `page` | `int` | page number |
| `permissions` | `list` | the permissions for the page |
| `quickFilterText` | `str` |  |
| `sort` | `str` |  |
| `sources` | `list` | the possible sources for the database |
| `startRow` | `int` |  |
| `totalActive` | `int` | total number of active permissions |
| `totalElements` | `int` | total number of permissions |
| `totalPages` | `int` | total number of pages |

#### Example: Create

```python
paginated_permission_list = client.PaginatedPermissionList().create({
    "database_id": 1,  # int
})
```


### Permission

Create an instance: `permission = client.Permission()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `bool` |  |
| `msisdn` | `str` |  |


### PermissionDatabase

Create an instance: `permission_database = client.PermissionDatabase()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customerId` | `int` |  |
| `deleteOnOptout` | `bool` |  |
| `description` | `str` |  |
| `hooks` | `list` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `routes` | `list` |  |
| `senderAlias` | `str` |  |
| `serviceId` | `int` |  |

#### Example: Load

```python
permission_database = client.PermissionDatabase().load({"database_id": 1})
```

#### Example: List

```python
permission_databases = client.PermissionDatabase().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── lmumbrella_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`lmumbrella_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
importstatus = client.ImportStatus()
importstatus.list()

# importstatus.data_get() now returns the importstatus data from the last list
# importstatus.match_get() returns the last match criteria
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
