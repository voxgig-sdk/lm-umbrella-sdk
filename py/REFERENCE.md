# LmUmbrella Python SDK Reference

Complete API reference for the LmUmbrella Python SDK.


## LmUmbrellaSDK

### Constructor

```python
from lmumbrella_sdk import LmUmbrellaSDK

client = LmUmbrellaSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmUmbrellaSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = LmUmbrellaSDK.test()
```


### Instance Methods

#### `Database(data=None)`

Create a new `DatabaseEntity` instance. Pass `None` for no initial data.

#### `FlatPermission(data=None)`

Create a new `FlatPermissionEntity` instance. Pass `None` for no initial data.

#### `FlattenedPermission(data=None)`

Create a new `FlattenedPermissionEntity` instance. Pass `None` for no initial data.

#### `ImportStatus(data=None)`

Create a new `ImportStatusEntity` instance. Pass `None` for no initial data.

#### `Metadata(data=None)`

Create a new `MetadataEntity` instance. Pass `None` for no initial data.

#### `PaginatedPermissionList(data=None)`

Create a new `PaginatedPermissionListEntity` instance. Pass `None` for no initial data.

#### `Permission(data=None)`

Create a new `PermissionEntity` instance. Pass `None` for no initial data.

#### `PermissionDatabase(data=None)`

Create a new `PermissionDatabaseEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DatabaseEntity

```python
database = client.Database()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Database().remove({"database_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DatabaseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FlatPermissionEntity

```python
flat_permission = client.FlatPermission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `bool` | No |  |
| `msisdn` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FlatPermission().load({"id": "flat_permission_id", "database_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FlatPermissionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FlattenedPermissionEntity

```python
flattened_permission = client.FlattenedPermission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No |  |
| `empty` | `bool` | No |  |
| `msisdn` | `str` | No |  |
| `source` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FlattenedPermission().create({
    "database_id": 1,  # int
    "id": "example_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.FlattenedPermission().list()
for flattened_permission in results:
    print(flattened_permission)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FlattenedPermission().load({"database_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FlattenedPermissionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImportStatusEntity

```python
import_status = client.ImportStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `list` | No |  |
| `import_id` | `str` | No |  |
| `msisdn` | `str` | No |  |
| `permissions_inserted` | `int` | No |  |
| `permissions_updated` | `int` | No |  |
| `status` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ImportStatus().create({
    "database_id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ImportStatus().list()
for import_status in results:
    print(import_status)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImportStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MetadataEntity

```python
metadata = client.Metadata()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `dict` | No |  |
| `created` | `str` | No |  |
| `database_id` | `int` | No |  |
| `key` | `str` | No |  |
| `label` | `str` | No |  |
| `multi_value` | `bool` | No |  |
| `type` | `str` | No |  |
| `updated` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Metadata().create({
    "database_id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Metadata().list()
for metadata in results:
    print(metadata)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Metadata().load({"id": "metadata_id", "database_id": 1})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Metadata().update({
    "id": "metadata_id",
    "database_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetadataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaginatedPermissionListEntity

```python
paginated_permission_list = client.PaginatedPermissionList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ascending` | `bool` | No |  |
| `column` | `list` | No |  |
| `end_row` | `int` | No |  |
| `group` | `list` | No |  |
| `metadata` | `list` | No |  |
| `msisdn_list` | `list` | No |  |
| `only_active` | `bool` | No |  |
| `page` | `int` | No |  |
| `permission` | `list` | No |  |
| `quick_filter_text` | `str` | No |  |
| `sort` | `str` | No |  |
| `source` | `list` | No |  |
| `start_row` | `int` | No |  |
| `total_active` | `int` | No |  |
| `total_element` | `int` | No |  |
| `total_page` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PaginatedPermissionList().create({
    "database_id": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaginatedPermissionListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PermissionEntity

```python
permission = client.Permission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `empty` | `bool` | No |  |
| `msisdn` | `str` | No |  |

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Permission().remove({"database_id": 1})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Permission().update({
    "database_id": 1,
    "id": "id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PermissionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PermissionDatabaseEntity

```python
permission_database = client.PermissionDatabase()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customer_id` | `int` | No |  |
| `delete_on_optout` | `bool` | No |  |
| `description` | `str` | No |  |
| `hook` | `list` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `route` | `list` | No |  |
| `sender_alia` | `str` | No |  |
| `service_id` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PermissionDatabase().list()
for permission_database in results:
    print(permission_database)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PermissionDatabase().load({"database_id": 1})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.PermissionDatabase().update({
    "database_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PermissionDatabaseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = LmUmbrellaSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

