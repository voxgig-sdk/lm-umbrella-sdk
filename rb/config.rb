# LmUmbrella SDK configuration

module LmUmbrellaConfig
  def self.make_config
    {
      "main" => {
        "name" => "LmUmbrella",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://permission.m2go.dk/permission/api",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "database" => {},
          "flat_permission" => {},
          "flattened_permission" => {},
          "import_status" => {},
          "metadata" => {},
          "paginated_permission_list" => {},
          "permission" => {},
          "permission_database" => {},
        },
      },
      "entity" => {
        "database" => {
          "fields" => [],
          "name" => "database",
          "op" => {
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "database_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/public/database/{id}",
                  "parts" => [
                    "public",
                    "database",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "remove",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "flat_permission" => {
          "fields" => [
            {
              "active" => true,
              "name" => "empty",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "msisdn",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "flat_permission",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/permission/{msisdn}",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "msisdn" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "database",
              ],
            ],
          },
        },
        "flattened_permission" => {
          "fields" => [
            {
              "active" => true,
              "name" => "active",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "empty",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "msisdn",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "source",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
          ],
          "name" => "flattened_permission",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/permission/{msisdn}",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "msisdn" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/permission/list",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "list",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/permission/query",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "query",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "database",
              ],
            ],
          },
        },
        "import_status" => {
          "fields" => [
            {
              "active" => true,
              "name" => "errors",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "importId",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "msisdn",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "permissionsInserted",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "permissionsUpdated",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "status",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
          ],
          "name" => "import_status",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => false,
                        "kind" => "query",
                        "name" => "skip_import_on_error",
                        "orig" => "skip_import_on_error",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/permission/bulk",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "bulk",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "skip_import_on_error",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "import_id",
                        "orig" => "import_id",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/permission/bulk/status",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "bulk",
                    "status",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "import_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "database",
              ],
            ],
          },
        },
        "metadata" => {
          "fields" => [
            {
              "active" => true,
              "name" => "contents",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "created",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "databaseId",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "key",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "label",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "multiValue",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "rangeEnd",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "rangeStart",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "type",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "updated",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "validation",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "values",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 11,
            },
          ],
          "name" => "metadata",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/metadata/{key}",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "key" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/metadata",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "create",
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/metadata",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/metadata/{key}",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "key" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/public/database/{id}/metadata/{key}",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "key" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "update",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "database",
              ],
            ],
          },
        },
        "paginated_permission_list" => {
          "fields" => [
            {
              "active" => true,
              "name" => "ascending",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "columns",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "endRow",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "groups",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "metadata",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "msisdnList",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "onlyActive",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "page",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "permissions",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "quickFilterText",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "sort",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "sources",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 11,
            },
            {
              "active" => true,
              "name" => "startRow",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 12,
            },
            {
              "active" => true,
              "name" => "totalActive",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 13,
            },
            {
              "active" => true,
              "name" => "totalElements",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 14,
            },
            {
              "active" => true,
              "name" => "totalPages",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 15,
            },
          ],
          "name" => "paginated_permission_list",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/permission/paged/list",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "paged",
                    "list",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "database",
              ],
            ],
          },
        },
        "permission" => {
          "fields" => [
            {
              "active" => true,
              "name" => "empty",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "msisdn",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "permission",
          "op" => {
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/public/database/{id}/permission/{msisdn}",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "msisdn" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "msisdn",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/public/database/{id}/permission/permanent/{msisdn}",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "permanent",
                    "{msisdn}",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "msisdn",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "remove",
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/public/database/{id}/permission/{msisdn}",
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "msisdn" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "update",
            },
          },
          "relations" => {
            "ancestors" => [
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
        "permission_database" => {
          "fields" => [
            {
              "active" => true,
              "name" => "customerId",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "deleteOnOptout",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "description",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "hooks",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "routes",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "senderAlias",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "serviceId",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 8,
            },
          ],
          "name" => "permission_database",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/list",
                  "parts" => [
                    "public",
                    "database",
                    "list",
                  ],
                  "select" => {
                    "exist" => [
                      "api_key",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "database_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}",
                  "parts" => [
                    "public",
                    "database",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "database_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/public/database/{id}",
                  "parts" => [
                    "public",
                    "database",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "update",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    LmUmbrellaFeatures.make_feature(name)
  end
end
