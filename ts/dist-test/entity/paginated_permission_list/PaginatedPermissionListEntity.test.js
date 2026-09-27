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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ascending": { "a": true, "h": "Ascending", "n": "ascending", "r": false, "t": "`$BOOLEAN`", "key$": "ascending", "index$": 0 }, "columns": { "a": true, "h": "Columns", "n": "columns", "r": false, "sh": "the column data", "t": "`$ARRAY`", "key$": "columns", "index$": 1 }, "endRow": { "a": true, "fo": "int32", "h": "End Row", "n": "endRow", "r": false, "t": "`$INTEGER`", "key$": "endRow", "index$": 2 }, "groups": { "a": true, "h": "Groups", "n": "groups", "r": false, "t": "`$ARRAY`", "key$": "groups", "index$": 3 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "t": "`$ARRAY`", "key$": "metadata", "index$": 4 }, "msisdnList": { "a": true, "h": "Msisdn List", "n": "msisdnList", "r": false, "t": "`$ARRAY`", "key$": "msisdnList", "index$": 5 }, "onlyActive": { "a": true, "h": "Only Active", "n": "onlyActive", "r": false, "t": "`$BOOLEAN`", "key$": "onlyActive", "index$": 6 }, "page": { "a": true, "fo": "int32", "h": "Page", "n": "page", "r": false, "sh": "page number", "t": "`$INTEGER`", "key$": "page", "index$": 7 }, "permissions": { "a": true, "h": "Permissions", "n": "permissions", "r": false, "sh": "the permissions for the page", "t": "`$ARRAY`", "key$": "permissions", "index$": 8 }, "quickFilterText": { "a": true, "h": "Quick Filter Text", "n": "quickFilterText", "r": false, "t": "`$STRING`", "key$": "quickFilterText", "index$": 9 }, "sort": { "a": true, "h": "Sort", "n": "sort", "r": false, "t": "`$STRING`", "key$": "sort", "index$": 10 }, "sources": { "a": true, "h": "Sources", "n": "sources", "r": false, "sh": "the possible sources for the database", "t": "`$ARRAY`", "key$": "sources", "index$": 11 }, "startRow": { "a": true, "fo": "int32", "h": "Start Row", "n": "startRow", "r": false, "t": "`$INTEGER`", "key$": "startRow", "index$": 12 }, "totalActive": { "a": true, "fo": "int32", "h": "Total Active", "n": "totalActive", "r": false, "sh": "total number of active permissions", "t": "`$INTEGER`", "key$": "totalActive", "index$": 13 }, "totalElements": { "a": true, "fo": "int32", "h": "Total Elements", "n": "totalElements", "r": false, "sh": "total number of permissions", "t": "`$INTEGER`", "key$": "totalElements", "index$": 14 }, "totalPages": { "a": true, "fo": "int32", "h": "Total Pages", "n": "totalPages", "r": false, "sh": "total number of pages", "t": "`$INTEGER`", "key$": "totalPages", "index$": 15 } }, "name": "paginated_permission_list", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /public/database/{id}/permission/paged/list", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "api_key", "or": "api_key", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/public/database/{id}/permission/paged/list", "q": { "exist": ["api_key", "database_id"] }, "r": { "param": { "id": "database_id" } }, "s": [{ "lit": "public" }, { "lit": "database" }, { "var": "database_id" }, { "lit": "permission" }, { "lit": "paged" }, { "lit": "list" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.database"]] }, "key$": "paginated_permission_list", "name__orig": "paginated_permission_list", "Name": "PaginatedPermissionList", "name_": "paginated_permission_list", "name-": "paginated-permission-list", "NAME": "PAGINATED_PERMISSION_LIST", "index$": 5 }, { "active": true, "entity": "paginated_permission_list", "key$": "BasicPaginatedPermissionListFlow", "kind": "basic", "name": "BasicPaginatedPermissionListFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "paginated_permission_list_ref01" }, "m": { "database_id": "database01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'PaginatedPermissionList', { "POST /public/database/{id}/permission/paged/list": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "startRow": { "type": "integer", "format": "int32", "key$": "startRow" }, "endRow": { "type": "integer", "format": "int32", "key$": "endRow" }, "quickFilterText": { "type": "string", "key$": "quickFilterText" }, "sources": { "type": "array", "items": { "type": "string" }, "key$": "sources" }, "metadata": { "type": "array", "items": { "type": "object", "properties": { "key": { "type": "string" }, "rules": { "type": "array", "items": {} } }, "x-ref": "#/components/schemas/Rules" }, "key$": "metadata" }, "sort": { "type": "string", "key$": "sort" }, "groups": { "type": "array", "items": { "type": "object", "properties": { "type": { "type": "string" }, "operation": { "type": "string" }, "groups": { "type": "array", "items": {} }, "metadata": { "type": "array", "items": {} } }, "x-ref": "#/components/schemas/Group" }, "key$": "groups" }, "msisdnList": { "type": "array", "items": { "type": "string" }, "key$": "msisdnList" }, "ascending": { "type": "boolean", "key$": "ascending" }, "onlyActive": { "type": "boolean", "key$": "onlyActive" } }, "x-ref": "#/components/schemas/Segmentation", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int32" }, "index$": 0 }, { "name": "apiKey", "in": "query", "schema": { "type": "string" }, "index$": 1 }] } });
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