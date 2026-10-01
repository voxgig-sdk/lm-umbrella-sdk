import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "database",
    "accessor": "Database",
    "op": "remove",
    "method": "DELETE",
    "path": "/public/database/{id}",
    "args": [
      {
        "name": "database_id",
        "wire": "Database ID",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "id",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "flat_permission",
    "accessor": "FlatPermission",
    "op": "load",
    "method": "GET",
    "path": "/public/database/{id}/permission/{msisdn}",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "msisdn",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "msisdn": "x",
      "empty": true
    },
    "idField": "id"
  },
  {
    "entity": "flattened_permission",
    "accessor": "FlattenedPermission",
    "op": "create",
    "method": "POST",
    "path": "/public/database/{id}/permission/{msisdn}",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "msisdn",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "msisdn": "x",
      "active": true,
      "source": "x"
    },
    "idField": "id"
  },
  {
    "entity": "flattened_permission",
    "accessor": "FlattenedPermission",
    "op": "list",
    "method": "GET",
    "path": "/public/database/{id}/permission/list",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "msisdn": "x",
        "active": true,
        "source": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "import_status",
    "accessor": "ImportStatus",
    "op": "create",
    "method": "POST",
    "path": "/public/database/{id}/permission/bulk",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "api_key": "v1",
      "skip_import_on_error": "v1"
    },
    "headers": [],
    "query": [
      "apiKey",
      "skipImportOnError"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "importId": "x",
      "status": "x",
      "permissionsInserted": 1,
      "permissionsUpdated": 1,
      "errors": [
        {
          "errors": [
            "x"
          ],
          "msisdn": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "import_status",
    "accessor": "ImportStatus",
    "op": "list",
    "method": "GET",
    "path": "/public/database/{id}/permission/bulk/status",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "api_key": "v1",
      "import_id": "v1"
    },
    "headers": [],
    "query": [
      "importId",
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "importId": "x",
      "status": "x",
      "permissionsInserted": 1,
      "permissionsUpdated": 1,
      "errors": [
        {
          "errors": [
            "x"
          ],
          "msisdn": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "metadata",
    "accessor": "Metadata",
    "op": "create",
    "method": "POST",
    "path": "/public/database/{id}/metadata",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "databaseId": 1,
      "key": "x",
      "label": "x",
      "type": "INTEGER",
      "contents": {
        "rangeStart": 1,
        "rangeEnd": 1,
        "values": [
          "x"
        ],
        "validation": "NONE"
      },
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z",
      "multiValue": true
    },
    "idField": "id"
  },
  {
    "entity": "metadata",
    "accessor": "Metadata",
    "op": "list",
    "method": "GET",
    "path": "/public/database/{id}/metadata",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "databaseId": 1,
        "key": "x",
        "label": "x",
        "type": "INTEGER",
        "contents": {
          "rangeStart": 1,
          "rangeEnd": 1,
          "values": [
            "x"
          ],
          "validation": "NONE"
        },
        "created": "2026-01-01T00:00:00Z",
        "updated": "2026-01-01T00:00:00Z",
        "multiValue": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "metadata",
    "accessor": "Metadata",
    "op": "load",
    "method": "GET",
    "path": "/public/database/{id}/metadata/{key}",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "key",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "databaseId": 1,
      "key": "x",
      "label": "x",
      "type": "INTEGER",
      "contents": {
        "rangeStart": 1,
        "rangeEnd": 1,
        "values": [
          "x"
        ],
        "validation": "NONE"
      },
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z",
      "multiValue": true
    },
    "idField": "id"
  },
  {
    "entity": "metadata",
    "accessor": "Metadata",
    "op": "remove",
    "method": "POST",
    "path": "/public/database/{id}/metadata/{key}",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "key",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "metadata",
    "accessor": "Metadata",
    "op": "update",
    "method": "PUT",
    "path": "/public/database/{id}/metadata/{key}",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "key",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "databaseId": 1,
      "key": "x",
      "label": "x",
      "type": "INTEGER",
      "contents": {
        "rangeStart": 1,
        "rangeEnd": 1,
        "values": [
          "x"
        ],
        "validation": "NONE"
      },
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z",
      "multiValue": true
    },
    "idField": "id"
  },
  {
    "entity": "paginated_permission_list",
    "accessor": "PaginatedPermissionList",
    "op": "create",
    "method": "POST",
    "path": "/public/database/{id}/permission/paged/list",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "totalPages": 1,
      "totalElements": 1,
      "totalActive": 1,
      "permissions": [
        {
          "msisdn": "x",
          "empty": true
        }
      ],
      "sources": [
        "x"
      ],
      "columns": [
        {
          "field": "x",
          "headerName": "x",
          "type": "INTEGER",
          "multiValue": true,
          "contents": {
            "rangeStart": 1,
            "rangeEnd": 1,
            "values": [
              "x"
            ],
            "validation": "NONE"
          },
          "visible": true,
          "pinned": true,
          "cellRenderer": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "permission",
    "accessor": "Permission",
    "op": "remove",
    "method": "DELETE",
    "path": "/public/database/{id}/permission/{msisdn}",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "msisdn",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "permission",
    "accessor": "Permission",
    "op": "remove",
    "method": "DELETE",
    "path": "/public/database/{id}/permission/permanent/{msisdn}",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      },
      {
        "name": "msisdn",
        "wire": "msisdn",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "permission",
    "accessor": "Permission",
    "op": "update",
    "method": "PUT",
    "path": "/public/database/{id}/permission/{msisdn}",
    "args": [
      {
        "name": "database_id",
        "wire": "id",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "msisdn",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "permission_database",
    "accessor": "PermissionDatabase",
    "op": "list",
    "method": "GET",
    "path": "/public/database/list",
    "args": [],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": 1,
        "serviceId": 1,
        "customerId": 1,
        "name": "x",
        "description": "x",
        "senderAlias": "x",
        "deleteOnOptout": true,
        "routes": [
          {
            "id": 1,
            "name": "x",
            "channel": "x",
            "keywords": [
              {
                "id": 1,
                "permissionDatabaseId": 1,
                "routeId": 1,
                "keyword": "x",
                "extra": "x"
              }
            ],
            "unsubscriptionText": "x",
            "optoutFooterEnabled": true,
            "optoutFooterText": "x",
            "optoutFooterPageText": "x",
            "optoutFooterPageButton": "x"
          }
        ],
        "hooks": [
          {
            "id": 1,
            "hookId": 1,
            "hookName": "x",
            "hookKey": "x",
            "name": "x",
            "enabled": true
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "permission_database",
    "accessor": "PermissionDatabase",
    "op": "load",
    "method": "GET",
    "path": "/public/database/{id}",
    "args": [
      {
        "name": "database_id",
        "wire": "Database ID",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "id",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": 1,
      "serviceId": 1,
      "customerId": 1,
      "name": "x",
      "description": "x",
      "senderAlias": "x",
      "deleteOnOptout": true,
      "routes": [
        {
          "id": 1,
          "name": "x",
          "channel": "x",
          "keywords": [
            {
              "id": 1,
              "permissionDatabaseId": 1,
              "routeId": 1,
              "keyword": "x",
              "extra": "x"
            }
          ],
          "unsubscriptionText": "x",
          "optoutFooterEnabled": true,
          "optoutFooterText": "x",
          "optoutFooterPageText": "x",
          "optoutFooterPageButton": "x"
        }
      ],
      "hooks": [
        {
          "id": 1,
          "hookId": 1,
          "hookName": "x",
          "hookKey": "x",
          "name": "x",
          "enabled": true
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "permission_database",
    "accessor": "PermissionDatabase",
    "op": "update",
    "method": "PUT",
    "path": "/public/database/{id}",
    "args": [
      {
        "name": "database_id",
        "wire": "Database ID",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "id",
        "value": "p2"
      }
    ],
    "select": {
      "api_key": "v1"
    },
    "headers": [],
    "query": [
      "apiKey"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": 1,
      "serviceId": 1,
      "customerId": 1,
      "name": "x",
      "description": "x",
      "senderAlias": "x",
      "deleteOnOptout": true,
      "routes": [
        {
          "id": 1,
          "name": "x",
          "channel": "x",
          "keywords": [
            {
              "id": 1,
              "permissionDatabaseId": 1,
              "routeId": 1,
              "keyword": "x",
              "extra": "x"
            }
          ],
          "unsubscriptionText": "x",
          "optoutFooterEnabled": true,
          "optoutFooterText": "x",
          "optoutFooterPageText": "x",
          "optoutFooterPageButton": "x"
        }
      ],
      "hooks": [
        {
          "id": 1,
          "hookId": 1,
          "hookName": "x",
          "hookKey": "x",
          "name": "x",
          "enabled": true
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
