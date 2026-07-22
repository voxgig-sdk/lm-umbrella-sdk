# LmUmbrella SDK configuration


def make_config():
    return {
        "main": {
            "name": "LmUmbrella",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://permission.m2go.dk/permission/api",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "database": {},
                "flat_permission": {},
                "flattened_permission": {},
                "import_status": {},
                "metadata": {},
                "paginated_permission_list": {},
                "permission": {},
                "permission_database": {},
            },
        },
        "entity": {
      "database": {
        "fields": [],
        "name": "database",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "database_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/public/database/{id}",
                "parts": [
                  "public",
                  "database",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "remove",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "flat_permission": {
        "fields": [
          {
            "active": True,
            "name": "empty",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "msisdn",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "flat_permission",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "msisdn",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public/database/{id}/permission/{msisdn}",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                    "msisdn": "id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "database",
            ],
          ],
        },
      },
      "flattened_permission": {
        "fields": [
          {
            "active": True,
            "name": "active",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "empty",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "msisdn",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "source",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "flattened_permission",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "msisdn",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/public/database/{id}/permission/{msisdn}",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                    "msisdn": "id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public/database/{id}/permission/list",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "list",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public/database/{id}/permission/query",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "query",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                  },
                },
                "select": {
                  "exist": [
                    "database_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "database",
            ],
          ],
        },
      },
      "import_status": {
        "fields": [
          {
            "active": True,
            "name": "error",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "import_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "msisdn",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "permissions_inserted",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "permissions_updated",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
        ],
        "name": "import_status",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "skip_import_on_error",
                      "orig": "skip_import_on_error",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/public/database/{id}/permission/bulk",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "bulk",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "skip_import_on_error",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "import_id",
                      "orig": "import_id",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public/database/{id}/permission/bulk/status",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "bulk",
                  "status",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "import_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [
            [
              "database",
            ],
          ],
        },
      },
      "metadata": {
        "fields": [
          {
            "active": True,
            "name": "content",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "created",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "database_id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "key",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "label",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "multi_value",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "updated",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
        ],
        "name": "metadata",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/public/database/{id}/metadata/{key}",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "metadata",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                    "key": "id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/public/database/{id}/metadata",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "metadata",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public/database/{id}/metadata",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "metadata",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public/database/{id}/metadata/{key}",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "metadata",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                    "key": "id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "PUT",
                "orig": "/public/database/{id}/metadata/{key}",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "metadata",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                    "key": "id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [
            [
              "database",
            ],
          ],
        },
      },
      "paginated_permission_list": {
        "fields": [
          {
            "active": True,
            "name": "ascending",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "column",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "end_row",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "group",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "metadata",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "msisdn_list",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "only_active",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "page",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "permission",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "quick_filter_text",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "sort",
            "req": False,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "source",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "start_row",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "total_active",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "total_element",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "total_page",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 15,
          },
        ],
        "name": "paginated_permission_list",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "POST",
                "orig": "/public/database/{id}/permission/paged/list",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "paged",
                  "list",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [
            [
              "database",
            ],
          ],
        },
      },
      "permission": {
        "fields": [
          {
            "active": True,
            "name": "empty",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "msisdn",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "permission",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "msisdn",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/public/database/{id}/permission/{msisdn}",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                    "msisdn": "id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "msisdn",
                      "orig": "msisdn",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "DELETE",
                "orig": "/public/database/{id}/permission/permanent/{msisdn}",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "permanent",
                  "{msisdn}",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "msisdn",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "remove",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "msisdn",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "PUT",
                "orig": "/public/database/{id}/permission/{msisdn}",
                "parts": [
                  "public",
                  "database",
                  "{database_id}",
                  "permission",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "id": "database_id",
                    "msisdn": "id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [
            [
              "database",
            ],
            [
              "database",
              "permanent",
            ],
          ],
        },
      },
      "permission_database": {
        "fields": [
          {
            "active": True,
            "name": "customer_id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "delete_on_optout",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "hook",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "route",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "sender_alia",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "service_id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 8,
          },
        ],
        "name": "permission_database",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public/database/list",
                "parts": [
                  "public",
                  "database",
                  "list",
                ],
                "select": {
                  "exist": [
                    "api_key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "database_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public/database/{id}",
                "parts": [
                  "public",
                  "database",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "database_id",
                      "orig": "database_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "PUT",
                "orig": "/public/database/{id}",
                "parts": [
                  "public",
                  "database",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "api_key",
                    "database_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "update",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
