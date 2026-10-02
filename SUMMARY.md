# Permission Public API

> Welcome to the Umbrella Permission API. This API follows REST conventions with resource-oriented URLs and standard HTTP status codes for error handling.
>
> The Permission system stores collections (*databases*) of mobile numbers (*permissions*) enriched with additional attributes (*metadata*) such as name, zip code, age, etc. It integrates with the broader Umbrella platform, making it straightforward to communicate via SMS with all or part of a database.
>
> Requests must be authenticated with an `Authorization: Bearer &lt;key&gt;` header, using an API key generated in the Umbrella portal. The legacy `apiKey` query parameter is still accepted but deprecated and will be removed in a future version.
>
> **Terminology**
> * *MSISDN*, A number uniquely identifying a mobile subscription (country code + local number, for example `45XXXXXXXX` for Denmark).
> * *Database*, A collection of permissions. Each database has at least one SMS-based unsubscribe method.
> * *Permission*, An MSISDN entry that can be linked to metadata.
> * *Metadata*, Additional information associated with a permission (for example name, zip code). Several data types are supported.
> * *Source*, A tag identifying how a permission entered or interacted with the database, useful when data originates from multiple channels.
>
> **Internal errors**
>
> A `500 Internal Server Error` indicates an internal system issue that cannot be resolved by modifying the request. These errors are typically transient, but if they persist please contact support.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 8 entities and 18 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Database

Results: Successful operation.

SDK operations: `remove`.

### FlatPermission

Results: Successful operation.

SDK operations: `load`.

### FlattenedPermission

Results: Successful operation.

SDK operations: `create`, `list`.

Key fields to recognise:

- `active`: if permission is active in the database
- `msisdn`: phone number
- `source`: comma separated list of sources

### ImportStatus

Results: Successful operation.

SDK operations: `create`, `list`.

Key fields to recognise:

- `errors`: Import errors (List of ImportError)
- `importId`: Import id
- `permissionsInserted`: Number of permissions inserted into database
- `permissionsUpdated`: Number of permissions updated in database
- `status`: Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)

### Metadata

Results: Successful operation.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `contents`: Contains extra info for a field
- `created`: created date of the field
- `databaseId`: id of the database
- `key`: key for the field (used for the value internally - cannot be changed after creation)
- `label`: label for the field (used for displaying in the interface)

### PaginatedPermissionList

Results: Successful operation.

SDK operations: `create`.

Key fields to recognise:

- `columns`: the column data
- `page`: page number
- `permissions`: the permissions for the page
- `sources`: the possible sources for the database
- `totalActive`: total number of active permissions

### Permission

Results: Successful operation.

SDK operations: `remove`, `update`.

### PermissionDatabase

Results: Successful operation.

SDK operations: `list`, `load`, `update`.

Key fields to recognise:

- `id`: internal database id of the route

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Database | `remove` | `DELETE /public/database/{id}` | Required |
| FlatPermission | `load` | `GET /public/database/{id}/permission/{msisdn}` | Required |
| FlattenedPermission | `create` | `POST /public/database/{id}/permission/{msisdn}` | Required |
| FlattenedPermission | `list` | `GET /public/database/{id}/permission/list` | Required |
| ImportStatus | `create` | `POST /public/database/{id}/permission/bulk` | Required |
| ImportStatus | `list` | `GET /public/database/{id}/permission/bulk/status` | Required |
| Metadata | `create` | `POST /public/database/{id}/metadata` | Required |
| Metadata | `list` | `GET /public/database/{id}/metadata` | Required |
| Metadata | `load` | `GET /public/database/{id}/metadata/{key}` | Required |
| Metadata | `remove` | `POST /public/database/{id}/metadata/{key}` | Required |
| Metadata | `update` | `PUT /public/database/{id}/metadata/{key}` | Required |
| PaginatedPermissionList | `create` | `POST /public/database/{id}/permission/paged/list` | Required |
| Permission | `remove` | `DELETE /public/database/{id}/permission/{msisdn}` | Required |
| Permission | `remove` | `DELETE /public/database/{id}/permission/permanent/{msisdn}` | Required |
| Permission | `update` | `PUT /public/database/{id}/permission/{msisdn}` | Required |
| PermissionDatabase | `list` | `GET /public/database/list` | Required |
| PermissionDatabase | `load` | `GET /public/database/{id}` | Required |
| PermissionDatabase | `update` | `PUT /public/database/{id}` | Required |

## Connect to the API

- API server: `https://permission.m2go.dk/api`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `lm-umbrella_list`: List records for an entity. Supported entities: `flattened_permission`, `import_status`, `metadata`, `permission_database`.
- `lm-umbrella_load`: Load one record for an entity. Supported entities: `flat_permission`, `metadata`, `permission_database`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `debug`: Request/response capture ring buffer for debugging
- `idempotency`: Idempotency keys for safe retries of mutating operations
- `metrics`: Statistics capture: per-operation counters and latency
- `paging`: Pagination signals for list operations
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

