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
(0, node_test_1.describe)('PermissionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_UMBRELLA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmUmbrellaSDK.test();
        const ent = testsdk.Permission();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE;
        for (const op of ['update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'permission.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "empty": { "a": true, "h": "Empty", "n": "empty", "r": false, "t": "`$BOOLEAN`", "key$": "empty", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "msisdn": { "a": true, "h": "Msisdn", "n": "msisdn", "r": false, "t": "`$STRING`", "key$": "msisdn", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "permission", "op": { "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /public/database/{id}/permission/{msisdn}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "msisdn", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "api_key", "or": "apiKey", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/public/database/{id}/permission/{msisdn}", "q": { "exist": ["api_key", "database_id", "id"] }, "r": { "param": { "id": "database_id", "msisdn": "id" } }, "s": [{ "lit": "public" }, { "lit": "database" }, { "var": "database_id" }, { "lit": "permission" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /public/database/{id}/permission/permanent/{msisdn}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "msisdn", "or": "msisdn", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "api_key", "or": "apiKey", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/public/database/{id}/permission/permanent/{msisdn}", "q": { "exist": ["api_key", "database_id", "msisdn"] }, "r": { "param": { "id": "database_id" } }, "s": [{ "lit": "public" }, { "lit": "database" }, { "var": "database_id" }, { "lit": "permission" }, { "lit": "permanent" }, { "var": "msisdn" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /public/database/{id}/permission/{msisdn}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "msisdn", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "api_key", "or": "apiKey", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/public/database/{id}/permission/{msisdn}", "q": { "exist": ["api_key", "database_id", "id"] }, "r": { "param": { "id": "database_id", "msisdn": "id" } }, "s": [{ "lit": "public" }, { "lit": "database" }, { "var": "database_id" }, { "lit": "permission" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.database"], ["$.main.kit.entity.database"]] }, "key$": "permission", "name__orig": "permission", "Name": "Permission", "name_": "permission", "name-": "permission", "NAME": "PERMISSION", "index$": 6 }, { "active": true, "entity": "permission", "key$": "BasicPermissionFlow", "kind": "basic", "name": "BasicPermissionFlow", "param": {}, "step": [{ "a": true, "d": { "database_id": "database01" }, "i": { "ref": "permission_ref01", "srcdatavar": "permission_ref01_data", "suffix": "_up0", "textfield": "msisdn" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-permission_ref01" } }], "v": [], "index$": 0 }] }, 'Permission', { "DELETE /public/database/{id}/permission/{msisdn}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int32" }, "index$": 0 }, { "name": "msisdn", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "apiKey", "in": "query", "schema": { "type": "string" }, "index$": 2 }] }, "DELETE /public/database/{id}/permission/permanent/{msisdn}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int32" }, "index$": 0 }, { "name": "msisdn", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "apiKey", "in": "query", "schema": { "type": "string" }, "index$": 2 }] }, "PUT /public/database/{id}/permission/{msisdn}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "msisdn": { "type": "string", "key$": "msisdn" }, "empty": { "type": "boolean", "key$": "empty" } }, "additionalProperties": { "type": "object" }, "index$": 1 } } }, "required": true }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int32" }, "index$": 0 }, { "name": "msisdn", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "apiKey", "in": "query", "schema": { "type": "string" }, "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let permission_ref01_data = Object.values(setup.data.existing.permission)[0];
        // UPDATE
        const permission_ref01_ent = client.Permission();
        const permission_ref01_data_up0 = {};
        permission_ref01_data_up0.id = permission_ref01_data.id;
        permission_ref01_data_up0['database_id'] = setup.idmap['database_id'];
        const permission_ref01_markdef_up0 = { name: 'msisdn', value: 'Mark01-permission_ref01_' + setup.now };
        permission_ref01_data_up0[permission_ref01_markdef_up0.name] = permission_ref01_markdef_up0.value;
        const permission_ref01_resdata_up0 = (await permission_ref01_ent.update(permission_ref01_data_up0)).data();
        (0, node_assert_1.default)(permission_ref01_resdata_up0.id === permission_ref01_data_up0.id);
        (0, node_assert_1.default)(permission_ref01_resdata_up0[permission_ref01_markdef_up0.name] === permission_ref01_markdef_up0.value);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/permission/PermissionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmUmbrellaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['permission01', 'permission02', 'permission03', 'database01', 'database02', 'database03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_UMBRELLA_TEST_PERMISSION_ENTID': idmap,
        'LM_UMBRELLA_TEST_LIVE': 'FALSE',
        'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
        'LM_UMBRELLA_APIKEY': '',
    });
    idmap = env['LM_UMBRELLA_TEST_PERMISSION_ENTID'];
    const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_UMBRELLA_TEST_PERMISSION_ENTID'];
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
//# sourceMappingURL=PermissionEntity.test.js.map