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
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://permission.m2go.dk/permission/api",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "apiKey",
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
								"kind": "http",
								"method": "DELETE",
								"orig": "/public/database/{id}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"public",
									"database",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "database_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
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
						"title": "Empty",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msisdn",
						"title": "Msisdn",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "flat_permission",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/permission/{msisdn}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "msisdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.database",
						},
					},
				},
			},
			"flattened_permission": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "active",
						"title": "Active",
						"type": "`$BOOLEAN`",
						"short": "if permission is active in the database",
					},
					map[string]any{
						"name": "empty",
						"title": "Empty",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msisdn",
						"title": "Msisdn",
						"type": "`$STRING`",
						"short": "phone number",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"short": "comma separated list of sources",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "flattened_permission",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/permission/{msisdn}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "msisdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/permission/list",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"lit": "list",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/permission/query",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"lit": "query",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"database_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.database",
						},
					},
				},
			},
			"import_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"short": "Import errors (List of ImportError)",
					},
					map[string]any{
						"name": "importId",
						"title": "Import Id",
						"type": "`$STRING`",
						"short": "Import id",
					},
					map[string]any{
						"name": "msisdn",
						"title": "Msisdn",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "permissionsInserted",
						"title": "Permissions Inserted",
						"type": "`$INTEGER`",
						"short": "Number of permissions inserted into database",
						"format": "int32",
					},
					map[string]any{
						"name": "permissionsUpdated",
						"title": "Permissions Updated",
						"type": "`$INTEGER`",
						"short": "Number of permissions updated in database",
						"format": "int32",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)",
					},
				},
				"name": "import_status",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/permission/bulk",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"lit": "bulk",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "skip_import_on_error",
											"orig": "skip_import_on_error",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"skip_import_on_error",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/permission/bulk/status",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"lit": "bulk",
									},
									map[string]any{
										"lit": "status",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.errors`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "import_id",
											"orig": "import_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"import_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.database",
						},
					},
				},
			},
			"metadata": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "contents",
						"title": "Contents",
						"type": "`$OBJECT`",
						"short": "Contains extra info for a field",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
						"short": "created date of the field",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "databaseId",
						"title": "Database Id",
						"type": "`$INTEGER`",
						"short": "id of the database",
						"format": "int32",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"title": "Key",
						"type": "`$STRING`",
						"short": "key for the field (used for the value internally - cannot be changed after creation)",
					},
					map[string]any{
						"name": "label",
						"title": "Label",
						"type": "`$STRING`",
						"short": "label for the field (used for displaying in the interface)",
					},
					map[string]any{
						"name": "multiValue",
						"title": "Multi Value",
						"type": "`$BOOLEAN`",
						"short": "if the field is a multi value field",
						"readOnly": true,
					},
					map[string]any{
						"name": "rangeEnd",
						"title": "Range End",
						"type": "`$INTEGER`",
						"short": "end on range for validation on INTEGER field",
						"format": "int32",
					},
					map[string]any{
						"name": "rangeStart",
						"title": "Range Start",
						"type": "`$INTEGER`",
						"short": "start on range for validation on INTEGER field",
						"format": "int32",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "the type of field",
					},
					map[string]any{
						"name": "updated",
						"title": "Updated",
						"type": "`$STRING`",
						"short": "deletion date of the field",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "validation",
						"title": "Validation",
						"type": "`$STRING`",
						"short": "type of validation on TEXT field",
					},
					map[string]any{
						"name": "values",
						"title": "Values",
						"type": "`$ARRAY`",
						"short": "Possible enumeration of values for ENUMERATION field",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "metadata",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/metadata/{key}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "metadata",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "key",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/metadata",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "metadata",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.contents`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/metadata",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "metadata",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}/metadata/{key}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "metadata",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.contents`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "key",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/public/database/{id}/metadata/{key}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "metadata",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.contents`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "key",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.database",
						},
					},
				},
			},
			"paginated_permission_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ascending",
						"title": "Ascending",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "columns",
						"title": "Columns",
						"type": "`$ARRAY`",
						"short": "the column data",
					},
					map[string]any{
						"name": "endRow",
						"title": "End Row",
						"type": "`$INTEGER`",
						"format": "int32",
					},
					map[string]any{
						"name": "groups",
						"title": "Groups",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "msisdnList",
						"title": "Msisdn List",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "onlyActive",
						"title": "Only Active",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
						"short": "page number",
						"format": "int32",
					},
					map[string]any{
						"name": "permissions",
						"title": "Permissions",
						"type": "`$ARRAY`",
						"short": "the permissions for the page",
					},
					map[string]any{
						"name": "quickFilterText",
						"title": "Quick Filter Text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sort",
						"title": "Sort",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sources",
						"title": "Sources",
						"type": "`$ARRAY`",
						"short": "the possible sources for the database",
					},
					map[string]any{
						"name": "startRow",
						"title": "Start Row",
						"type": "`$INTEGER`",
						"format": "int32",
					},
					map[string]any{
						"name": "totalActive",
						"title": "Total Active",
						"type": "`$INTEGER`",
						"short": "total number of active permissions",
						"format": "int32",
					},
					map[string]any{
						"name": "totalElements",
						"title": "Total Elements",
						"type": "`$INTEGER`",
						"short": "total number of permissions",
						"format": "int32",
					},
					map[string]any{
						"name": "totalPages",
						"title": "Total Pages",
						"type": "`$INTEGER`",
						"short": "total number of pages",
						"format": "int32",
					},
				},
				"name": "paginated_permission_list",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/public/database/{id}/permission/paged/list",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"lit": "paged",
									},
									map[string]any{
										"lit": "list",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.database",
						},
					},
				},
			},
			"permission": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "empty",
						"title": "Empty",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msisdn",
						"title": "Msisdn",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "permission",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/public/database/{id}/permission/{msisdn}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "msisdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/public/database/{id}/permission/permanent/{msisdn}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"lit": "permanent",
									},
									map[string]any{
										"var": "msisdn",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "msisdn",
											"orig": "msisdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"msisdn",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/public/database/{id}/permission/{msisdn}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "database_id",
									},
									map[string]any{
										"lit": "permission",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "msisdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.database",
						},
						[]any{
							"$.main.kit.entity.database",
						},
					},
				},
			},
			"permission_database": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "customerId",
						"title": "Customer Id",
						"type": "`$INTEGER`",
						"format": "int32",
					},
					map[string]any{
						"name": "deleteOnOptout",
						"title": "Delete On Optout",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hooks",
						"title": "Hooks",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"format": "int32",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "routes",
						"title": "Routes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "senderAlias",
						"title": "Sender Alias",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "serviceId",
						"title": "Service Id",
						"type": "`$INTEGER`",
						"format": "int32",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "permission_database",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/list",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"lit": "list",
									},
								},
								"parts": []any{
									"public",
									"database",
									"list",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public/database/{id}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"public",
									"database",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "database_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/public/database/{id}",
								"segments": []any{
									map[string]any{
										"lit": "public",
									},
									map[string]any{
										"lit": "database",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"public",
									"database",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "database_id",
											"orig": "database_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"database_id",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
