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
						"key$": "remove",
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
						"key$": "load",
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
						"key$": "create",
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
						"key$": "list",
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
						"key$": "load",
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
						"name": "error",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "import_id",
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
						"name": "permissions_inserted",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "permissions_updated",
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
						"key$": "create",
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
						"key$": "list",
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
						"name": "content",
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
						"name": "database_id",
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
						"name": "multi_value",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "updated",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
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
						"key$": "create",
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
						"key$": "list",
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
						"key$": "load",
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
						"key$": "update",
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
						"name": "column",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "end_row",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "group",
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
						"name": "msisdn_list",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "only_active",
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
						"name": "permission",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "quick_filter_text",
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
						"name": "source",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "start_row",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "total_active",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "total_element",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "total_page",
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
						"key$": "create",
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
						"key$": "remove",
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
						"key$": "update",
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
						"name": "customer_id",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "delete_on_optout",
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
						"name": "hook",
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
						"name": "route",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "sender_alia",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "service_id",
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
						"key$": "list",
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
						"key$": "load",
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
						"key$": "update",
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
