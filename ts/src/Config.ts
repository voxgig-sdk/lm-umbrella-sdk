
import { BaseFeature } from './feature/base/BaseFeature'
import { DebugFeature } from './feature/debug/DebugFeature'
import { IdempotencyFeature } from './feature/idempotency/IdempotencyFeature'
import { MetricsFeature } from './feature/metrics/MetricsFeature'
import { PagingFeature } from './feature/paging/PagingFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'LmUmbrella',
        slug: "lm-umbrella",
    version: "0.1.1",
    target: "ts",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://permission.m2go.dk/api",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        database: {
        },
  
        flat_permission: {
        },
  
        flattened_permission: {
        },
  
        import_status: {
        },
  
        metadata: {
        },
  
        paginated_permission_list: {
        },
  
        permission: {
        },
  
        permission_database: {
        },
  
    }
  }


  entity = {
    "database": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "database",
      "op": {
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/public/database/{id}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "Database ID",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "flat_permission": {
      "fields": [
        {
          "name": "empty",
          "title": "Empty",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "msisdn",
          "title": "Msisdn",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "flat_permission",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/permission/{msisdn}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "permission"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "{id}"
              ],
              "rename": {
                "param": {
                  "id": "database_id",
                  "msisdn": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "msisdn",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.database"
          ]
        ]
      }
    },
    "flattened_permission": {
      "fields": [
        {
          "name": "active",
          "title": "Active",
          "type": "`$BOOLEAN`",
          "short": "if permission is active in the database"
        },
        {
          "name": "empty",
          "title": "Empty",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "msisdn",
          "title": "Msisdn",
          "type": "`$STRING`",
          "short": "phone number"
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "short": "comma separated list of sources"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "flattened_permission",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/permission/{msisdn}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "permission"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "{id}"
              ],
              "rename": {
                "param": {
                  "id": "database_id",
                  "msisdn": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "msisdn",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/permission/list",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "permission"
                },
                {
                  "lit": "list"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "list"
              ],
              "rename": {
                "param": {
                  "id": "database_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.database"
          ]
        ]
      }
    },
    "import_status": {
      "fields": [
        {
          "name": "errors",
          "title": "Errors",
          "type": "`$ARRAY`",
          "short": "Import errors (List of ImportError)"
        },
        {
          "name": "importId",
          "title": "Import Id",
          "type": "`$STRING`",
          "short": "Import id"
        },
        {
          "name": "msisdn",
          "title": "Msisdn",
          "type": "`$STRING`"
        },
        {
          "name": "permissionsInserted",
          "title": "Permissions Inserted",
          "type": "`$INTEGER`",
          "short": "Number of permissions inserted into database",
          "format": "int32"
        },
        {
          "name": "permissionsUpdated",
          "title": "Permissions Updated",
          "type": "`$INTEGER`",
          "short": "Number of permissions updated in database",
          "format": "int32"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)"
        }
      ],
      "name": "import_status",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/permission/bulk",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "permission"
                },
                {
                  "lit": "bulk"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "bulk"
              ],
              "rename": {
                "param": {
                  "id": "database_id"
                }
              },
              "transform": {
                "req": "`reqdata.permissions`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "skip_import_on_error",
                    "orig": "skipImportOnError",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "skip_import_on_error"
                ]
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/permission/bulk/status",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "permission"
                },
                {
                  "lit": "bulk"
                },
                {
                  "lit": "status"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "bulk",
                "status"
              ],
              "rename": {
                "param": {
                  "id": "database_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.errors`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "import_id",
                    "orig": "importId",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "import_id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.database"
          ]
        ]
      }
    },
    "metadata": {
      "fields": [
        {
          "name": "contents",
          "title": "Contents",
          "type": "`$OBJECT`",
          "short": "Contains extra info for a field"
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "short": "created date of the field",
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "databaseId",
          "title": "Database Id",
          "type": "`$INTEGER`",
          "short": "id of the database",
          "format": "int32"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "key for the field (used for the value internally - cannot be changed after creation)"
        },
        {
          "name": "label",
          "title": "Label",
          "type": "`$STRING`",
          "short": "label for the field (used for displaying in the interface)"
        },
        {
          "name": "multiValue",
          "title": "Multi Value",
          "type": "`$BOOLEAN`",
          "short": "if the field is a multi value field",
          "readOnly": true
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "the type of field"
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "short": "deletion date of the field",
          "readOnly": true,
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "metadata",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/metadata",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "metadata"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "metadata"
              ],
              "rename": {
                "param": {
                  "id": "database_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/metadata",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "metadata"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "metadata"
              ],
              "rename": {
                "param": {
                  "id": "database_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/metadata/{key}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "metadata"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "metadata",
                "{id}"
              ],
              "rename": {
                "param": {
                  "id": "database_id",
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/metadata/{key}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "metadata"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "metadata",
                "{id}"
              ],
              "rename": {
                "param": {
                  "id": "database_id",
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/public/database/{id}/metadata/{key}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "metadata"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "metadata",
                "{id}"
              ],
              "rename": {
                "param": {
                  "id": "database_id",
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.database"
          ]
        ]
      }
    },
    "paginated_permission_list": {
      "fields": [
        {
          "name": "ascending",
          "title": "Ascending",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "columns",
          "title": "Columns",
          "type": "`$ARRAY`",
          "short": "the column data"
        },
        {
          "name": "endRow",
          "title": "End Row",
          "type": "`$INTEGER`",
          "format": "int32"
        },
        {
          "name": "groups",
          "title": "Groups",
          "type": "`$ARRAY`"
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$ARRAY`"
        },
        {
          "name": "msisdnList",
          "title": "Msisdn List",
          "type": "`$ARRAY`"
        },
        {
          "name": "onlyActive",
          "title": "Only Active",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "page",
          "title": "Page",
          "type": "`$INTEGER`",
          "short": "page number",
          "format": "int32"
        },
        {
          "name": "permissions",
          "title": "Permissions",
          "type": "`$ARRAY`",
          "short": "the permissions for the page"
        },
        {
          "name": "quickFilterText",
          "title": "Quick Filter Text",
          "type": "`$STRING`"
        },
        {
          "name": "sort",
          "title": "Sort",
          "type": "`$STRING`"
        },
        {
          "name": "sources",
          "title": "Sources",
          "type": "`$ARRAY`",
          "short": "the possible sources for the database"
        },
        {
          "name": "startRow",
          "title": "Start Row",
          "type": "`$INTEGER`",
          "format": "int32"
        },
        {
          "name": "totalActive",
          "title": "Total Active",
          "type": "`$INTEGER`",
          "short": "total number of active permissions",
          "format": "int32"
        },
        {
          "name": "totalElements",
          "title": "Total Elements",
          "type": "`$INTEGER`",
          "short": "total number of permissions",
          "format": "int32"
        },
        {
          "name": "totalPages",
          "title": "Total Pages",
          "type": "`$INTEGER`",
          "short": "total number of pages",
          "format": "int32"
        }
      ],
      "name": "paginated_permission_list",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/permission/paged/list",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "permission"
                },
                {
                  "lit": "paged"
                },
                {
                  "lit": "list"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "paged",
                "list"
              ],
              "rename": {
                "param": {
                  "id": "database_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.database"
          ]
        ]
      }
    },
    "permission": {
      "fields": [
        {
          "name": "empty",
          "title": "Empty",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "msisdn",
          "title": "Msisdn",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "permission",
      "op": {
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/public/database/{id}/permission/{msisdn}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "permission"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "{id}"
              ],
              "rename": {
                "param": {
                  "id": "database_id",
                  "msisdn": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "msisdn",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/public/database/{id}/permission/permanent/{msisdn}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "permission"
                },
                {
                  "lit": "permanent"
                },
                {
                  "var": "msisdn"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "permanent",
                "{msisdn}"
              ],
              "rename": {
                "param": {
                  "id": "database_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "msisdn",
                    "orig": "msisdn",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "msisdn"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/public/database/{id}/permission/{msisdn}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "database_id"
                },
                {
                  "lit": "permission"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "{id}"
              ],
              "rename": {
                "param": {
                  "id": "database_id",
                  "msisdn": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "msisdn",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.database"
          ],
          [
            "$.main.kit.entity.database"
          ]
        ]
      }
    },
    "permission_database": {
      "fields": [
        {
          "name": "customerId",
          "title": "Customer Id",
          "type": "`$INTEGER`",
          "format": "int32"
        },
        {
          "name": "deleteOnOptout",
          "title": "Delete On Optout",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`"
        },
        {
          "name": "hooks",
          "title": "Hooks",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "format": "int32"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "routes",
          "title": "Routes",
          "type": "`$ARRAY`"
        },
        {
          "name": "senderAlias",
          "title": "Sender Alias",
          "type": "`$STRING`"
        },
        {
          "name": "serviceId",
          "title": "Service Id",
          "type": "`$INTEGER`",
          "format": "int32"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "permission_database",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/list",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "lit": "list"
                }
              ],
              "parts": [
                "public",
                "database",
                "list"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "Database ID",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/public/database/{id}",
              "segments": [
                {
                  "lit": "public"
                },
                {
                  "lit": "database"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "public",
                "database",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "database_id",
                    "orig": "Database ID",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

