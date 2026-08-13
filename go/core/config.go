package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "LmUmbrella",
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
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "database_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
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
						"active": true,
						"name": "empty",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "msisdn",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "flat_permission",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
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
						"active": true,
						"name": "active",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "empty",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "msisdn",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "source",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
				},
				"name": "flattened_permission",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
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
								"index$": 0,
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
						"active": true,
						"name": "errors",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "importId",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "msisdn",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "permissionsInserted",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "permissionsUpdated",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
				},
				"name": "import_status",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": false,
											"kind": "query",
											"name": "skip_import_on_error",
											"orig": "skip_import_on_error",
											"reqd": false,
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
								"index$": 0,
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "import_id",
											"orig": "import_id",
											"reqd": false,
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
									"res": "`body`",
								},
								"index$": 0,
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
						"active": true,
						"name": "contents",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "created",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "databaseId",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "key",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "label",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "multiValue",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "rangeEnd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "rangeStart",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "updated",
						"req": false,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "validation",
						"req": false,
						"type": "`$STRING`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "values",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 11,
					},
				},
				"name": "metadata",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
									"res": "`body`",
								},
								"index$": 1,
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
									"res": "`body`",
								},
								"index$": 0,
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
						"active": true,
						"name": "ascending",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "columns",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "endRow",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "groups",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "metadata",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "msisdnList",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "onlyActive",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "page",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "permissions",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "quickFilterText",
						"req": false,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "sort",
						"req": false,
						"type": "`$STRING`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "sources",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "startRow",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "totalActive",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "totalElements",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "totalPages",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 15,
					},
				},
				"name": "paginated_permission_list",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
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
						"active": true,
						"name": "empty",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "msisdn",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "permission",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "msisdn",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 1,
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "msisdn",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
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
						"active": true,
						"name": "customerId",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "deleteOnOptout",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "hooks",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "routes",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "senderAlias",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "serviceId",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 8,
					},
				},
				"name": "permission_database",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "database_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "database_id",
											"orig": "database_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
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
								"index$": 0,
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
