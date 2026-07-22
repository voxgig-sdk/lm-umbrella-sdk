
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
    name: 'ProjectName',
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
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "database_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "flat_permission": {
      "fields": [
        {
          "active": true,
          "name": "empty",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 0
        },
        {
          "active": true,
          "name": "msisdn",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "flat_permission",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "active",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 0
        },
        {
          "active": true,
          "name": "empty",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 1
        },
        {
          "active": true,
          "name": "msisdn",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "source",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "flattened_permission",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "error",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "import_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "msisdn",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "permissions_inserted",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "permissions_updated",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        }
      ],
      "name": "import_status",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "skip_import_on_error",
                    "orig": "skip_import_on_error",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "import_id",
                    "orig": "import_id",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
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
          "active": true,
          "name": "content",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "created",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "database_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "key",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "label",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "multi_value",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 5
        },
        {
          "active": true,
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "updated",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        }
      ],
      "name": "metadata",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 1
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "update"
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
          "active": true,
          "name": "ascending",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 0
        },
        {
          "active": true,
          "name": "column",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "end_row",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "group",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "metadata",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 4
        },
        {
          "active": true,
          "name": "msisdn_list",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 5
        },
        {
          "active": true,
          "name": "only_active",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 6
        },
        {
          "active": true,
          "name": "page",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 7
        },
        {
          "active": true,
          "name": "permission",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 8
        },
        {
          "active": true,
          "name": "quick_filter_text",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "sort",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "source",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 11
        },
        {
          "active": true,
          "name": "start_row",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 12
        },
        {
          "active": true,
          "name": "total_active",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 13
        },
        {
          "active": true,
          "name": "total_element",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 14
        },
        {
          "active": true,
          "name": "total_page",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 15
        }
      ],
      "name": "paginated_permission_list",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "create"
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
          "active": true,
          "name": "empty",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 0
        },
        {
          "active": true,
          "name": "msisdn",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "permission",
      "op": {
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "msisdn",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 1
            }
          ],
          "key$": "remove"
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "msisdn",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "update"
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
          "active": true,
          "name": "customer_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "delete_on_optout",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 1
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "hook",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "route",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 6
        },
        {
          "active": true,
          "name": "sender_alia",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "service_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 8
        }
      ],
      "name": "permission_database",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "database_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "database_id",
                    "orig": "database_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "update"
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

