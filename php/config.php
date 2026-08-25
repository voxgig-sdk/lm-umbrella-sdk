<?php
declare(strict_types=1);

// LmUmbrella SDK configuration

class LmUmbrellaConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "LmUmbrella",
                "slug" => "lm-umbrella",
                "version" => "0.1.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://permission.m2go.dk/permission/api",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "database" => [],
                    "flat_permission" => [],
                    "flattened_permission" => [],
                    "import_status" => [],
                    "metadata" => [],
                    "paginated_permission_list" => [],
                    "permission" => [],
                    "permission_database" => [],
                ],
            ],
            "entity" => [
        'database' => [
          'fields' => [],
          'name' => 'database',
          'op' => [
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'database_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/public/database/{id}',
                  'parts' => [
                    'public',
                    'database',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'flat_permission' => [
          'fields' => [
            [
              'name' => 'empty',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'msisdn',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'flat_permission',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'msisdn',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/database/{id}/permission/{msisdn}',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                      'msisdn' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'database',
              ],
            ],
          ],
        ],
        'flattened_permission' => [
          'fields' => [
            [
              'name' => 'active',
              'short' => 'if permission is active in the database',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'empty',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'msisdn',
              'short' => 'phone number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'short' => 'comma separated list of sources',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'flattened_permission',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'msisdn',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/public/database/{id}/permission/{msisdn}',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                      'msisdn' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/database/{id}/permission/list',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    'list',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/database/{id}/permission/query',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    'query',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'database_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'database',
              ],
            ],
          ],
        ],
        'import_status' => [
          'fields' => [
            [
              'name' => 'errors',
              'short' => 'Import errors (List of ImportError)',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'importId',
              'short' => 'Import id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'msisdn',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'permissionsInserted',
              'short' => 'Number of permissions inserted into database',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'permissionsUpdated',
              'short' => 'Number of permissions updated in database',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'short' => 'Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'import_status',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'skip_import_on_error',
                        'orig' => 'skip_import_on_error',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/public/database/{id}/permission/bulk',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    'bulk',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'skip_import_on_error',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'import_id',
                        'orig' => 'import_id',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/database/{id}/permission/bulk/status',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    'bulk',
                    'status',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'import_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.errors`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'database',
              ],
            ],
          ],
        ],
        'metadata' => [
          'fields' => [
            [
              'name' => 'contents',
              'short' => 'Contains extra info for a field',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'created',
              'short' => 'created date of the field',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'databaseId',
              'short' => 'id of the database',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'short' => 'key for the field (used for the value internally - cannot be changed after creation)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'label',
              'short' => 'label for the field (used for displaying in the interface)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'multiValue',
              'short' => 'if the field is a multi value field',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'rangeEnd',
              'short' => 'end on range for validation on INTEGER field',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'rangeStart',
              'short' => 'start on range for validation on INTEGER field',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'type',
              'short' => 'the type of field',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updated',
              'short' => 'deletion date of the field',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'validation',
              'short' => 'type of validation on TEXT field',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'values',
              'short' => 'Possible enumeration of values for ENUMERATION field',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'metadata',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/public/database/{id}/metadata/{key}',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'metadata',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                      'key' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/public/database/{id}/metadata',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'metadata',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.contents`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/database/{id}/metadata',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'metadata',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/database/{id}/metadata/{key}',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'metadata',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                      'key' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.contents`',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/public/database/{id}/metadata/{key}',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'metadata',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                      'key' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.contents`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'database',
              ],
            ],
          ],
        ],
        'paginated_permission_list' => [
          'fields' => [
            [
              'name' => 'ascending',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'columns',
              'short' => 'the column data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'endRow',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'groups',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'metadata',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'msisdnList',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'onlyActive',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'page',
              'short' => 'page number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'permissions',
              'short' => 'the permissions for the page',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'quickFilterText',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sort',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sources',
              'short' => 'the possible sources for the database',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'startRow',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'totalActive',
              'short' => 'total number of active permissions',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'totalElements',
              'short' => 'total number of permissions',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'totalPages',
              'short' => 'total number of pages',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'paginated_permission_list',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/public/database/{id}/permission/paged/list',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    'paged',
                    'list',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'database',
              ],
            ],
          ],
        ],
        'permission' => [
          'fields' => [
            [
              'name' => 'empty',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'msisdn',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'permission',
          'op' => [
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'msisdn',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/public/database/{id}/permission/{msisdn}',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                      'msisdn' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'msisdn',
                        'orig' => 'msisdn',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/public/database/{id}/permission/permanent/{msisdn}',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    'permanent',
                    '{msisdn}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'msisdn',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'msisdn',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/public/database/{id}/permission/{msisdn}',
                  'parts' => [
                    'public',
                    'database',
                    '{database_id}',
                    'permission',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'database_id',
                      'msisdn' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'database',
              ],
              [
                'database',
                'permanent',
              ],
            ],
          ],
        ],
        'permission_database' => [
          'fields' => [
            [
              'name' => 'customerId',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'deleteOnOptout',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'hooks',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'routes',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'senderAlias',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'serviceId',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'permission_database',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/database/list',
                  'parts' => [
                    'public',
                    'database',
                    'list',
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'database_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/public/database/{id}',
                  'parts' => [
                    'public',
                    'database',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'database_id',
                        'orig' => 'database_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/public/database/{id}',
                  'parts' => [
                    'public',
                    'database',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'database_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return LmUmbrellaFeatures::make_feature($name);
    }
}
