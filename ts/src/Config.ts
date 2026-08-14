
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'LmUmbrella',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://permission.m2go.dk/permission/api',

    auth: {
      prefix: '',
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
      "fields": [],
      "name": "database",
      "op": {
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "database_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/public/database/{id}",
              "parts": [
                "public",
                "database",
                "{id}"
              ],
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
          "type": "`$BOOLEAN`"
        },
        {
          "name": "msisdn",
          "type": "`$STRING`"
        }
      ],
      "name": "flat_permission",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/permission/{msisdn}",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "database"
          ]
        ]
      }
    },
    "flattened_permission": {
      "fields": [
        {
          "name": "active",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "empty",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "msisdn",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "type": "`$STRING`"
        }
      ],
      "name": "flattened_permission",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/permission/{msisdn}",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/permission/list",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/permission/query",
              "parts": [
                "public",
                "database",
                "{database_id}",
                "permission",
                "query"
              ],
              "rename": {
                "param": {
                  "id": "database_id"
                }
              },
              "select": {
                "exist": [
                  "database_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "database"
          ]
        ]
      }
    },
    "import_status": {
      "fields": [
        {
          "name": "errors",
          "type": "`$ARRAY`"
        },
        {
          "name": "importId",
          "type": "`$STRING`"
        },
        {
          "name": "msisdn",
          "type": "`$STRING`"
        },
        {
          "name": "permissionsInserted",
          "type": "`$INTEGER`"
        },
        {
          "name": "permissionsUpdated",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        }
      ],
      "name": "import_status",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "skip_import_on_error",
                    "orig": "skip_import_on_error",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/permission/bulk",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "skip_import_on_error"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "import_id",
                    "orig": "import_id",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/permission/bulk/status",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "import_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "database"
          ]
        ]
      }
    },
    "metadata": {
      "fields": [
        {
          "name": "contents",
          "type": "`$OBJECT`"
        },
        {
          "name": "created",
          "type": "`$STRING`"
        },
        {
          "name": "databaseId",
          "type": "`$INTEGER`"
        },
        {
          "name": "key",
          "type": "`$STRING`"
        },
        {
          "name": "label",
          "type": "`$STRING`"
        },
        {
          "name": "multiValue",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "rangeEnd",
          "type": "`$INTEGER`"
        },
        {
          "name": "rangeStart",
          "type": "`$INTEGER`"
        },
        {
          "name": "type",
          "type": "`$STRING`"
        },
        {
          "name": "updated",
          "type": "`$STRING`"
        },
        {
          "name": "validation",
          "type": "`$STRING`"
        },
        {
          "name": "values",
          "type": "`$ARRAY`"
        }
      ],
      "name": "metadata",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/metadata/{key}",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/metadata",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/metadata",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}/metadata/{key}",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/public/database/{id}/metadata/{key}",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "database"
          ]
        ]
      }
    },
    "paginated_permission_list": {
      "fields": [
        {
          "name": "ascending",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "columns",
          "type": "`$ARRAY`"
        },
        {
          "name": "endRow",
          "type": "`$INTEGER`"
        },
        {
          "name": "groups",
          "type": "`$ARRAY`"
        },
        {
          "name": "metadata",
          "type": "`$ARRAY`"
        },
        {
          "name": "msisdnList",
          "type": "`$ARRAY`"
        },
        {
          "name": "onlyActive",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "page",
          "type": "`$INTEGER`"
        },
        {
          "name": "permissions",
          "type": "`$ARRAY`"
        },
        {
          "name": "quickFilterText",
          "type": "`$STRING`"
        },
        {
          "name": "sort",
          "type": "`$STRING`"
        },
        {
          "name": "sources",
          "type": "`$ARRAY`"
        },
        {
          "name": "startRow",
          "type": "`$INTEGER`"
        },
        {
          "name": "totalActive",
          "type": "`$INTEGER`"
        },
        {
          "name": "totalElements",
          "type": "`$INTEGER`"
        },
        {
          "name": "totalPages",
          "type": "`$INTEGER`"
        }
      ],
      "name": "paginated_permission_list",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/public/database/{id}/permission/paged/list",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "database"
          ]
        ]
      }
    },
    "permission": {
      "fields": [
        {
          "name": "empty",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "msisdn",
          "type": "`$STRING`"
        }
      ],
      "name": "permission",
      "op": {
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/public/database/{id}/permission/{msisdn}",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "param",
                    "name": "msisdn",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/public/database/{id}/permission/permanent/{msisdn}",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "msisdn"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/public/database/{id}/permission/{msisdn}",
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
              "select": {
                "exist": [
                  "api_key",
                  "database_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "database"
          ],
          [
            "database",
            "permanent"
          ]
        ]
      }
    },
    "permission_database": {
      "fields": [
        {
          "name": "customerId",
          "type": "`$INTEGER`"
        },
        {
          "name": "deleteOnOptout",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "hooks",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "routes",
          "type": "`$ARRAY`"
        },
        {
          "name": "senderAlias",
          "type": "`$STRING`"
        },
        {
          "name": "serviceId",
          "type": "`$INTEGER`"
        }
      ],
      "name": "permission_database",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/list",
              "parts": [
                "public",
                "database",
                "list"
              ],
              "select": {
                "exist": [
                  "api_key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "database_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/public/database/{id}",
              "parts": [
                "public",
                "database",
                "{id}"
              ],
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "database_id",
                    "orig": "database_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/public/database/{id}",
              "parts": [
                "public",
                "database",
                "{id}"
              ],
              "select": {
                "exist": [
                  "api_key",
                  "database_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
  config
}

