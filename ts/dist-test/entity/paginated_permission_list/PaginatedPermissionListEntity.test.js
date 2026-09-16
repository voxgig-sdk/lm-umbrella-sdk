"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PaginatedPermissionListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_UMBRELLA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmUmbrellaSDK.test();
        const ent = testsdk.PaginatedPermissionList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'paginated_permission_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "ascending", "req": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "columns", "req": false, "short": "the column data", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "format": "int32", "name": "endRow", "req": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "groups", "req": false, "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "metadata", "req": false, "type": "`$ARRAY`", "index$": 4 }, { "active": true, "name": "msisdnList", "req": false, "type": "`$ARRAY`", "index$": 5 }, { "active": true, "name": "onlyActive", "req": false, "type": "`$BOOLEAN`", "index$": 6 }, { "active": true, "format": "int32", "name": "page", "req": false, "short": "page number", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "permissions", "req": false, "short": "the permissions for the page", "type": "`$ARRAY`", "index$": 8 }, { "active": true, "name": "quickFilterText", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "sort", "req": false, "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "sources", "req": false, "short": "the possible sources for the database", "type": "`$ARRAY`", "index$": 11 }, { "active": true, "format": "int32", "name": "startRow", "req": false, "type": "`$INTEGER`", "index$": 12 }, { "active": true, "format": "int32", "name": "totalActive", "req": false, "short": "total number of active permissions", "type": "`$INTEGER`", "index$": 13 }, { "active": true, "format": "int32", "name": "totalElements", "req": false, "short": "total number of permissions", "type": "`$INTEGER`", "index$": 14 }, { "active": true, "format": "int32", "name": "totalPages", "req": false, "short": "total number of pages", "type": "`$INTEGER`", "index$": 15 }], "name": "paginated_permission_list", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "database_id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "api_key", "orig": "api_key", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /public/database/{id}/permission/paged/list", "json": "{\"operationId\":\"list_2\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ascending\":{\"type\":\"boolean\"},\"endRow\":{\"format\":\"int32\",\"type\":\"integer\"},\"groups\":{\"items\":{\"properties\":{\"groups\":{\"items\":{\"properties\":\"[Circular *paths./public/database/{id}/permission/paged/list.post.requestBody.content.application/json.schema.properties.groups.items.properties]\",\"type\":\"object\"},\"type\":\"array\"},\"metadata\":{\"items\":{\"properties\":{\"key\":{\"type\":\"string\"},\"rules\":{\"items\":{\"properties\":{\"op\":{\"enum\":[\"EQUALS\",\"RANGE\",\"NONE\",\"ONE_OF\",\"ALL_OF\",\"NONE_OF\",\"IS_EMPTY\",\"IS_NOT_EMPTY\",\"SETDIFF\",\"AMOUNT\",\"PERCENTAGE\",\"DAY_OF_YEAR_TODAY\",\"DAY_OF_WEEK\",\"DAYS_AGO\",\"DAYS_UNTIL\",\"DAYS_WITHIN\"],\"type\":\"string\"},\"value\":{\"type\":\"object\"},\"value2\":{\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"operation\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"metadata\":{\"items\":{\"properties\":{\"key\":{\"type\":\"string\"},\"rules\":{\"items\":{\"properties\":{\"op\":{\"enum\":[\"EQUALS\",\"RANGE\",\"NONE\",\"ONE_OF\",\"ALL_OF\",\"NONE_OF\",\"IS_EMPTY\",\"IS_NOT_EMPTY\",\"SETDIFF\",\"AMOUNT\",\"PERCENTAGE\",\"DAY_OF_YEAR_TODAY\",\"DAY_OF_WEEK\",\"DAYS_AGO\",\"DAYS_UNTIL\",\"DAYS_WITHIN\"],\"type\":\"string\"},\"value\":{\"type\":\"object\"},\"value2\":{\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"msisdnList\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"onlyActive\":{\"type\":\"boolean\"},\"quickFilterText\":{\"type\":\"string\"},\"sort\":{\"type\":\"string\"},\"sources\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"startRow\":{\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Container for a page in a list of permissions\",\"properties\":{\"columns\":{\"description\":\"the column data\",\"items\":{\"description\":\"the column data\",\"properties\":{\"cellRenderer\":{\"type\":\"string\"},\"contents\":{\"description\":\"Contains extra info for a field\",\"properties\":{\"rangeEnd\":{\"description\":\"end on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"rangeStart\":{\"description\":\"start on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"validation\":{\"description\":\"type of validation on TEXT field\",\"enum\":[\"NONE\",\"EMAIL\"],\"type\":\"string\"},\"values\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"items\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"field\":{\"type\":\"string\"},\"headerName\":{\"type\":\"string\"},\"multiValue\":{\"type\":\"boolean\"},\"pinned\":{\"type\":\"boolean\"},\"type\":{\"enum\":[\"INTEGER\",\"TEXT\",\"ENUMERATION\",\"BOOLEAN\",\"DATE\"],\"type\":\"string\"},\"visible\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"type\":\"array\"},\"page\":{\"description\":\"page number\",\"format\":\"int32\",\"type\":\"integer\"},\"permissions\":{\"description\":\"the permissions for the page\",\"items\":{\"additionalProperties\":{\"type\":\"object\"},\"properties\":{\"empty\":{\"type\":\"boolean\"},\"msisdn\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"sources\":{\"description\":\"the possible sources for the database\",\"items\":{\"description\":\"the possible sources for the database\",\"type\":\"string\"},\"type\":\"array\"},\"totalActive\":{\"description\":\"total number of active permissions\",\"format\":\"int32\",\"type\":\"integer\"},\"totalElements\":{\"description\":\"total number of permissions\",\"format\":\"int32\",\"type\":\"integer\"},\"totalPages\":{\"description\":\"total number of pages\",\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/public/database/{id}/permission/paged/list", "rename": { "param": { "id": "database_id" } }, "segments": [{ "lit": "public" }, { "lit": "database" }, { "var": "database_id" }, { "lit": "permission" }, { "lit": "paged" }, { "lit": "list" }], "select": { "exist": ["api_key", "database_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["database"]] }, "key$": "paginated_permission_list", "name__orig": "paginated_permission_list", "Name": "PaginatedPermissionList", "name_": "paginated_permission_list", "name-": "paginated-permission-list", "NAME": "PAGINATED_PERMISSION_LIST", "index$": 5 }, { "active": true, "entity": "paginated_permission_list", "key$": "BasicPaginatedPermissionListFlow", "kind": "basic", "name": "BasicPaginatedPermissionListFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "paginated_permission_list_ref01" }, "match": { "database_id": "database01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'PaginatedPermissionList');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const paginated_permission_list_ref01_ent = client.PaginatedPermissionList();
        let paginated_permission_list_ref01_data = setup.data.new.paginated_permission_list['paginated_permission_list_ref01'];
        paginated_permission_list_ref01_data['database_id'] = setup.idmap['database01'];
        paginated_permission_list_ref01_data = (await paginated_permission_list_ref01_ent.create(paginated_permission_list_ref01_data)).data();
        (0, node_assert_1.default)(null != paginated_permission_list_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/paginated_permission_list/PaginatedPermissionListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmUmbrellaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['paginated_permission_list01', 'paginated_permission_list02', 'paginated_permission_list03', 'database01', 'database02', 'database03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID': idmap,
        'LM_UMBRELLA_TEST_LIVE': 'FALSE',
        'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
        'LM_UMBRELLA_APIKEY': '',
    });
    idmap = env['LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID'];
    const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LmUmbrellaSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.LM_UMBRELLA_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LM_UMBRELLA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PaginatedPermissionListEntity.test.js.map