# LmUmbrella TypeScript SDK



The TypeScript SDK for the LmUmbrella API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Database()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/lm-umbrella-sdk/releases](https://github.com/voxgig-sdk/lm-umbrella-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { LmUmbrellaSDK } from '@voxgig-sdk/lm-umbrella'

const client = new LmUmbrellaSDK({
  apikey: process.env.LM_UMBRELLA_APIKEY,
})
```

### 3. Load a flatpermission

FlatPermission is nested under database, so provide the `database_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const flatpermission = await client.FlatPermission().load({
    database_id: 1,
    id: 'example_id',
  })
  console.log(flatpermission)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Remove
await client.Database().remove({
  database_id: 1,
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const flatpermission = await client.FlatPermission().load({ database_id: 1, id: "example_id" })
  console.log(flatpermission)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = LmUmbrellaSDK.test()

const flatpermission = await client.FlatPermission().load({ id: 'test01', database_id: 1 })
// flatpermission is a bare entity populated with mock response data
console.log(flatpermission)
```

You can also use the instance method:

```ts
const client = new LmUmbrellaSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.FlatPermission()

// First call runs the operation and stores its result
await entity.load({ id: 'example', database_id: 1 })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new LmUmbrellaSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### LmUmbrellaSDK

#### Constructor

```ts
new LmUmbrellaSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Database(data?)` | `DatabaseEntity` | Create a Database entity instance. |
| `FlatPermission(data?)` | `FlatPermissionEntity` | Create a FlatPermission entity instance. |
| `FlattenedPermission(data?)` | `FlattenedPermissionEntity` | Create a FlattenedPermission entity instance. |
| `ImportStatus(data?)` | `ImportStatusEntity` | Create an ImportStatus entity instance. |
| `Metadata(data?)` | `MetadataEntity` | Create a Metadata entity instance. |
| `PaginatedPermissionList(data?)` | `PaginatedPermissionListEntity` | Create a PaginatedPermissionList entity instance. |
| `Permission(data?)` | `PermissionEntity` | Create a Permission entity instance. |
| `PermissionDatabase(data?)` | `PermissionDatabaseEntity` | Create a PermissionDatabase entity instance. |
| `tester(testopts?, sdkopts?)` | `LmUmbrellaSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `LmUmbrellaSDK.test(testopts?, sdkopts?)` | `LmUmbrellaSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): LmUmbrellaSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Database

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/public/database/{id}`

#### FlatPermission

| Field | Description |
| --- | --- |
| `empty` |  |
| `msisdn` |  |

Operations: load.

API path: `/public/database/{id}/permission/{msisdn}`

#### FlattenedPermission

| Field | Description |
| --- | --- |
| `active` |  |
| `empty` |  |
| `msisdn` |  |
| `source` |  |

Operations: create, list, load.

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

Operations: create, list.

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

Operations: create, list, load, update.

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

Operations: create.

API path: `/public/database/{id}/permission/paged/list`

#### Permission

| Field | Description |
| --- | --- |
| `empty` |  |
| `msisdn` |  |

Operations: remove, update.

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

Operations: list, load, update.

API path: `/public/database/list`



## Entities


### Database

Create an instance: `const database = client.Database()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### FlatPermission

Create an instance: `const flat_permission = client.FlatPermission()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `boolean` |  |
| `msisdn` | `string` |  |

#### Example: Load

```ts
const flat_permission = await client.FlatPermission().load({ id: 'flat_permission_id', database_id: 1 })
```


### FlattenedPermission

Create an instance: `const flattened_permission = client.FlattenedPermission()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `empty` | `boolean` |  |
| `msisdn` | `string` |  |
| `source` | `string` |  |

#### Example: Load

```ts
const flattened_permission = await client.FlattenedPermission().load({ database_id: 1 })
```

#### Example: List

```ts
const flattened_permissions = await client.FlattenedPermission().list()
```

#### Example: Create

```ts
const flattened_permission = await client.FlattenedPermission().create({
  database_id: 1,
  id: 'example_id',
})
```


### ImportStatus

Create an instance: `const import_status = client.ImportStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `any[]` |  |
| `import_id` | `string` |  |
| `msisdn` | `string` |  |
| `permissions_inserted` | `number` |  |
| `permissions_updated` | `number` |  |
| `status` | `string` |  |

#### Example: List

```ts
const import_statuss = await client.ImportStatus().list()
```

#### Example: Create

```ts
const import_status = await client.ImportStatus().create({
  database_id: 1,
})
```


### Metadata

Create an instance: `const metadata = client.Metadata()`

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
| `content` | `Record<string, any>` |  |
| `created` | `string` |  |
| `database_id` | `number` |  |
| `key` | `string` |  |
| `label` | `string` |  |
| `multi_value` | `boolean` |  |
| `type` | `string` |  |
| `updated` | `string` |  |

#### Example: Load

```ts
const metadata = await client.Metadata().load({ id: 'metadata_id', database_id: 1 })
```

#### Example: List

```ts
const metadatas = await client.Metadata().list()
```

#### Example: Create

```ts
const metadata = await client.Metadata().create({
  database_id: 1,
})
```


### PaginatedPermissionList

Create an instance: `const paginated_permission_list = client.PaginatedPermissionList()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ascending` | `boolean` |  |
| `column` | `any[]` |  |
| `end_row` | `number` |  |
| `group` | `any[]` |  |
| `metadata` | `any[]` |  |
| `msisdn_list` | `any[]` |  |
| `only_active` | `boolean` |  |
| `page` | `number` |  |
| `permission` | `any[]` |  |
| `quick_filter_text` | `string` |  |
| `sort` | `string` |  |
| `source` | `any[]` |  |
| `start_row` | `number` |  |
| `total_active` | `number` |  |
| `total_element` | `number` |  |
| `total_page` | `number` |  |

#### Example: Create

```ts
const paginated_permission_list = await client.PaginatedPermissionList().create({
  database_id: 1,
})
```


### Permission

Create an instance: `const permission = client.Permission()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `empty` | `boolean` |  |
| `msisdn` | `string` |  |


### PermissionDatabase

Create an instance: `const permission_database = client.PermissionDatabase()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customer_id` | `number` |  |
| `delete_on_optout` | `boolean` |  |
| `description` | `string` |  |
| `hook` | `any[]` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `route` | `any[]` |  |
| `sender_alia` | `string` |  |
| `service_id` | `number` |  |

#### Example: Load

```ts
const permission_database = await client.PermissionDatabase().load({ database_id: 1 })
```

#### Example: List

```ts
const permission_databases = await client.PermissionDatabase().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
lm-umbrella/
├── src/
│   ├── LmUmbrellaSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { LmUmbrellaSDK } from '@voxgig-sdk/lm-umbrella'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const flatpermission = client.FlatPermission()
await flatpermission.load({ database_id: 1, id: "example_id" })

// flatpermission.data() now returns the flatpermission data from the last `load`
// flatpermission.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
