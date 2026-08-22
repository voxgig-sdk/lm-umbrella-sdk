package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "LmUmbrella",
			"slug": "lm-umbrella",
			"version": "0.1.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://permission.m2go.dk/permission/api",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"database": map[string]any{},
				"flat_permission": map[string]any{},
				"flattened_permission": map[string]any{},
				"import_status": map[string]any{},
				"metadata": map[string]any{},
				"paginated_permission_list": map[string]any{},
				"permission": map[string]any{},
				"permission_database": map[string]any{},
			},
		},
		"entity": map[string]any{
			"database": map[string]any{
				"fields": []any{},
				"name": "database",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "database_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/public/database/{id}",
								"parts": []any{
									"public",
									"database",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"flat_permission": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "empty",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "msisdn",
						"type": "`$STRING`",
					},
				},
				"name": "flat_permission",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/permission/{msisdn}",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"msisdn": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"database",
						},
					},
				},
			},
			"flattened_permission": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "active",
						"short": "if permission is active in the database",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "empty",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "msisdn",
						"short": "phone number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"short": "comma separated list of sources",
						"type": "`$STRING`",
					},
				},
				"name": "flattened_permission",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/permission/{msisdn}",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"msisdn": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/permission/list",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"list",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/permission/query",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"query",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"database_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"database",
						},
					},
				},
			},
			"import_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"short": "Import errors (List of ImportError)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "importId",
						"short": "Import id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msisdn",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "permissionsInserted",
						"short": "Number of permissions inserted into database",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "permissionsUpdated",
						"short": "Number of permissions updated in database",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"short": "Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)",
						"type": "`$STRING`",
					},
				},
				"name": "import_status",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "skip_import_on_error",
											"orig": "skip_import_on_error",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/permission/bulk",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"bulk",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"skip_import_on_error",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "import_id",
											"orig": "import_id",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/permission/bulk/status",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"bulk",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"import_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.errors`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"database",
						},
					},
				},
			},
			"metadata": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "contents",
						"short": "Contains extra info for a field",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "created",
						"short": "created date of the field",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "databaseId",
						"short": "id of the database",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "key",
						"short": "key for the field (used for the value internally - cannot be changed after creation)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "label",
						"short": "label for the field (used for displaying in the interface)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "multiValue",
						"short": "if the field is a multi value field",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "rangeEnd",
						"short": "end on range for validation on INTEGER field",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rangeStart",
						"short": "start on range for validation on INTEGER field",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"short": "the type of field",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated",
						"short": "deletion date of the field",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "validation",
						"short": "type of validation on TEXT field",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "values",
						"short": "Possible enumeration of values for ENUMERATION field",
						"type": "`$ARRAY`",
					},
				},
				"name": "metadata",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/metadata/{key}",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"key": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/metadata",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.contents`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/metadata",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/metadata/{key}",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"key": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.contents`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/public/database/{id}/metadata/{key}",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"key": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.contents`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"database",
						},
					},
				},
			},
			"paginated_permission_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ascending",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "columns",
						"short": "the column data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "endRow",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "groups",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "metadata",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "msisdnList",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "onlyActive",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "page",
						"short": "page number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "permissions",
						"short": "the permissions for the page",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "quickFilterText",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sort",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sources",
						"short": "the possible sources for the database",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "startRow",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "totalActive",
						"short": "total number of active permissions",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "totalElements",
						"short": "total number of permissions",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "totalPages",
						"short": "total number of pages",
						"type": "`$INTEGER`",
					},
				},
				"name": "paginated_permission_list",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/permission/paged/list",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"paged",
									"list",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"database",
						},
					},
				},
			},
			"permission": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "empty",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "msisdn",
						"type": "`$STRING`",
					},
				},
				"name": "permission",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/public/database/{id}/permission/{msisdn}",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"msisdn": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "msisdn",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/public/database/{id}/permission/permanent/{msisdn}",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"permanent",
									"{msisdn}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"msisdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/public/database/{id}/permission/{msisdn}",
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"msisdn": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"database",
						},
						[]any{
							"database",
							"permanent",
						},
					},
				},
			},
			"permission_database": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "customerId",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "deleteOnOptout",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hooks",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "routes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "senderAlias",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "serviceId",
						"type": "`$INTEGER`",
					},
				},
				"name": "permission_database",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/list",
								"parts": []any{
									"public",
									"database",
									"list",
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "database_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}",
								"parts": []any{
									"public",
									"database",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "database_id",
											"orig": "database_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/public/database/{id}",
								"parts": []any{
									"public",
									"database",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
