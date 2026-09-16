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
								"parts": []any{
									"public",
									"database",
									"{id}",
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
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msisdn",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"msisdn": "id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"{id}",
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
						"name": "id",
						"type": "`$STRING`",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"msisdn": "id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"list",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"database_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"query",
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
						"format": "int32",
						"name": "permissionsInserted",
						"short": "Number of permissions inserted into database",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"bulk",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"bulk",
									"status",
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
						"format": "date-time",
						"name": "created",
						"readOnly": true,
						"short": "created date of the field",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "databaseId",
						"short": "id of the database",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
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
						"readOnly": true,
						"short": "if the field is a multi value field",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "int32",
						"name": "rangeEnd",
						"short": "end on range for validation on INTEGER field",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
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
						"format": "date-time",
						"name": "updated",
						"readOnly": true,
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"key": "id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"key": "id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"key": "id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"metadata",
									"{id}",
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
						"format": "int32",
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
						"format": "int32",
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
						"format": "int32",
						"name": "startRow",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
						"name": "totalActive",
						"short": "total number of active permissions",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
						"name": "totalElements",
						"short": "total number of permissions",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"paged",
									"list",
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
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msisdn",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"msisdn": "id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"permanent",
									"{msisdn}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"id": "database_id",
										"msisdn": "id",
									},
								},
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
								"parts": []any{
									"public",
									"database",
									"{database_id}",
									"permission",
									"{id}",
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
						"format": "int32",
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
						"format": "int32",
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
						"format": "int32",
						"name": "serviceId",
						"type": "`$INTEGER`",
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
								"select": map[string]any{
									"exist": []any{
										"api_key",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"public",
									"database",
									"list",
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
								"parts": []any{
									"public",
									"database",
									"{id}",
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
								"parts": []any{
									"public",
									"database",
									"{id}",
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
