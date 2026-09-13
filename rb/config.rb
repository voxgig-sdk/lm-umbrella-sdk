# LmUmbrella SDK configuration

module LmUmbrellaConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "LmUmbrella",
        "slug" => "lm-umbrella",
        "version" => "0.1.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "database_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/public/database/{id}",
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "id",
                    },
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
                  "parts" => [
                    "public",
                    "database",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "flat_permission" => {
          "fields" => [
            {
              "name" => "empty",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "msisdn",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "flat_permission",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/permission/{msisdn}",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "msisdn" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "{id}",
                  ],
                },
              ],
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
              "name" => "active",
              "short" => "if permission is active in the database",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "empty",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "msisdn",
              "short" => "phone number",
              "type" => "`$STRING`",
            },
            {
              "name" => "source",
              "short" => "comma separated list of sources",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "flattened_permission",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/permission/{msisdn}",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "msisdn" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "{id}",
                  ],
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/permission/list",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "lit" => "list",
                    },
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "list",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/permission/query",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "lit" => "query",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "query",
                  ],
                },
              ],
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
              "name" => "errors",
              "short" => "Import errors (List of ImportError)",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "importId",
              "short" => "Import id",
              "type" => "`$STRING`",
            },
            {
              "name" => "msisdn",
              "type" => "`$STRING`",
            },
            {
              "format" => "int32",
              "name" => "permissionsInserted",
              "short" => "Number of permissions inserted into database",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "int32",
              "name" => "permissionsUpdated",
              "short" => "Number of permissions updated in database",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "status",
              "short" => "Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)",
              "type" => "`$STRING`",
            },
          ],
          "name" => "import_status",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "skip_import_on_error",
                        "orig" => "skip_import_on_error",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/permission/bulk",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "lit" => "bulk",
                    },
                  ],
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "bulk",
                  ],
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "import_id",
                        "orig" => "import_id",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/permission/bulk/status",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "lit" => "bulk",
                    },
                    {
                      "lit" => "status",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "import_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.errors`",
                  },
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "bulk",
                    "status",
                  ],
                },
              ],
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
              "name" => "contents",
              "short" => "Contains extra info for a field",
              "type" => "`$OBJECT`",
            },
            {
              "format" => "date-time",
              "name" => "created",
              "readOnly" => true,
              "short" => "created date of the field",
              "type" => "`$STRING`",
            },
            {
              "format" => "int32",
              "name" => "databaseId",
              "short" => "id of the database",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "key",
              "short" => "key for the field (used for the value internally - cannot be changed after creation)",
              "type" => "`$STRING`",
            },
            {
              "name" => "label",
              "short" => "label for the field (used for displaying in the interface)",
              "type" => "`$STRING`",
            },
            {
              "name" => "multiValue",
              "readOnly" => true,
              "short" => "if the field is a multi value field",
              "type" => "`$BOOLEAN`",
            },
            {
              "format" => "int32",
              "name" => "rangeEnd",
              "short" => "end on range for validation on INTEGER field",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "int32",
              "name" => "rangeStart",
              "short" => "start on range for validation on INTEGER field",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "type",
              "short" => "the type of field",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "updated",
              "readOnly" => true,
              "short" => "deletion date of the field",
              "type" => "`$STRING`",
            },
            {
              "name" => "validation",
              "short" => "type of validation on TEXT field",
              "type" => "`$STRING`",
            },
            {
              "name" => "values",
              "short" => "Possible enumeration of values for ENUMERATION field",
              "type" => "`$ARRAY`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "metadata",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/metadata/{key}",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "key" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "metadata",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                    "{id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/metadata",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "metadata",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.contents`",
                  },
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                  ],
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/metadata",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "metadata",
                    },
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}/metadata/{key}",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "key" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "metadata",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.contents`",
                  },
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                    "{id}",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/public/database/{id}/metadata/{key}",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "key" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "metadata",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "api_key",
                      "database_id",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.contents`",
                  },
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "metadata",
                    "{id}",
                  ],
                },
              ],
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
              "name" => "ascending",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "columns",
              "short" => "the column data",
              "type" => "`$ARRAY`",
            },
            {
              "format" => "int32",
              "name" => "endRow",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "groups",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "metadata",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "msisdnList",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "onlyActive",
              "type" => "`$BOOLEAN`",
            },
            {
              "format" => "int32",
              "name" => "page",
              "short" => "page number",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "permissions",
              "short" => "the permissions for the page",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "quickFilterText",
              "type" => "`$STRING`",
            },
            {
              "name" => "sort",
              "type" => "`$STRING`",
            },
            {
              "name" => "sources",
              "short" => "the possible sources for the database",
              "type" => "`$ARRAY`",
            },
            {
              "format" => "int32",
              "name" => "startRow",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "int32",
              "name" => "totalActive",
              "short" => "total number of active permissions",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "int32",
              "name" => "totalElements",
              "short" => "total number of permissions",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "int32",
              "name" => "totalPages",
              "short" => "total number of pages",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "paginated_permission_list",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/public/database/{id}/permission/paged/list",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "lit" => "paged",
                    },
                    {
                      "lit" => "list",
                    },
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "paged",
                    "list",
                  ],
                },
              ],
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
              "name" => "empty",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "msisdn",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "permission",
          "op" => {
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/public/database/{id}/permission/{msisdn}",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "msisdn" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "{id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "param",
                        "name" => "msisdn",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/public/database/{id}/permission/permanent/{msisdn}",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "lit" => "permanent",
                    },
                    {
                      "var" => "msisdn",
                    },
                  ],
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "permanent",
                    "{msisdn}",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "msisdn",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/public/database/{id}/permission/{msisdn}",
                  "rename" => {
                    "param" => {
                      "id" => "database_id",
                      "msisdn" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "database_id",
                    },
                    {
                      "lit" => "permission",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "parts" => [
                    "public",
                    "database",
                    "{database_id}",
                    "permission",
                    "{id}",
                  ],
                },
              ],
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
              "format" => "int32",
              "name" => "customerId",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "deleteOnOptout",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "description",
              "type" => "`$STRING`",
            },
            {
              "name" => "hooks",
              "type" => "`$ARRAY`",
            },
            {
              "format" => "int32",
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "routes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "senderAlias",
              "type" => "`$STRING`",
            },
            {
              "format" => "int32",
              "name" => "serviceId",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "permission_database",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/list",
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "lit" => "list",
                    },
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
                  "parts" => [
                    "public",
                    "database",
                    "list",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "database_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/public/database/{id}",
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "id",
                    },
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
                  "parts" => [
                    "public",
                    "database",
                    "{id}",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "database_id",
                        "orig" => "database_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/public/database/{id}",
                  "segments" => [
                    {
                      "lit" => "public",
                    },
                    {
                      "lit" => "database",
                    },
                    {
                      "var" => "id",
                    },
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
                  "parts" => [
                    "public",
                    "database",
                    "{id}",
                  ],
                },
              ],
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
