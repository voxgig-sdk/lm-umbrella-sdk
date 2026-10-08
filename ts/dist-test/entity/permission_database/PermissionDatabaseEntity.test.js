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
(0, node_test_1.describe)('PermissionDatabaseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_UMBRELLA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmUmbrellaSDK.test();
        const ent = testsdk.PermissionDatabase();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('permission_database hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.LmUmbrellaSDK.test(offline).PermissionDatabase().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.LmUmbrellaSDK.test(offline).PermissionDatabase()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.LmUmbrellaSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.PermissionDatabase().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.LmUmbrellaSDK.test().PermissionDatabase().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.LmUmbrellaSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.PermissionDatabase().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.PermissionDatabase().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.LmUmbrellaSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PermissionDatabase().list({ "api_key": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE;
        for (const op of ['list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'permission_database.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "customerId": { "a": true, "fo": "int32", "h": "Customer Id", "n": "customerId", "r": false, "t": "`$INTEGER`", "key$": "customerId", "index$": 0 }, "deleteOnOptout": { "a": true, "h": "Delete On Optout", "n": "deleteOnOptout", "r": false, "t": "`$BOOLEAN`", "key$": "deleteOnOptout", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 2 }, "hooks": { "a": true, "h": "Hooks", "n": "hooks", "r": false, "t": "`$ARRAY`", "key$": "hooks", "index$": 3 }, "id": { "a": true, "fo": "int32", "h": "Id", "n": "id", "r": false, "t": "`$INTEGER`", "key$": "id", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 5 }, "routes": { "a": true, "h": "Routes", "n": "routes", "r": false, "t": "`$ARRAY`", "key$": "routes", "index$": 6 }, "senderAlias": { "a": true, "h": "Sender Alias", "n": "senderAlias", "r": false, "t": "`$STRING`", "key$": "senderAlias", "index$": 7 }, "serviceId": { "a": true, "fo": "int32", "h": "Service Id", "n": "serviceId", "r": false, "t": "`$INTEGER`", "key$": "serviceId", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "permission_database", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /public/database/list", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "api_key", "or": "apiKey", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/public/database/list", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "public" }, { "lit": "database" }, { "lit": "list" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /public/database/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_id", "or": "Database ID", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "api_key", "or": "apiKey", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/public/database/{id}", "q": { "exist": ["database_id", "id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "public" }, { "lit": "database" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["customerId", "deleteOnOptout", "description", "hooks", "id", "name", "routes", "senderAlias", "serviceId"], "co": { "id": "PUT /public/database/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_id", "or": "Database ID", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "api_key", "or": "apiKey", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/public/database/{id}", "q": { "exist": ["database_id", "id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "public" }, { "lit": "database" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "permission_database", "name__orig": "permission_database", "Name": "PermissionDatabase", "name_": "permission_database", "name-": "permission-database", "NAME": "PERMISSION_DATABASE", "index$": 7 }, { "active": true, "entity": "permission_database", "key$": "BasicPermissionDatabaseFlow", "kind": "basic", "name": "BasicPermissionDatabaseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "permission_database_ref01" } }], "index$": 0 }, { "a": true, "d": { "database_id": "database01" }, "i": { "ref": "permission_database_ref01", "srcdatavar": "permission_database_ref01_data", "suffix": "_up0", "textfield": "description" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-permission_database_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "permission_database_ref01", "srcdatavar": "permission_database_ref01_data", "suffix": "_dt0" }, "m": { "database_id": "database01", "id": "permission_database01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-permission_database_ref01" } }], "index$": 2 }] }, 'PermissionDatabase', { "GET /public/database/list": { "protocol": "http", "parameters": [{ "name": "apiKey", "in": "query", "schema": { "type": "string" }, "index$": 0 }] }, "GET /public/database/{id}": { "protocol": "http", "parameters": [{ "name": "Database ID", "in": "path", "required": true, "schema": { "type": "integer", "format": "int32" }, "index$": 0 }, { "name": "apiKey", "in": "query", "schema": { "type": "string" }, "index$": 1 }] }, "PUT /public/database/{id}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "format": "int32", "key$": "id" }, "serviceId": { "type": "integer", "format": "int32", "key$": "serviceId" }, "customerId": { "type": "integer", "format": "int32", "key$": "customerId" }, "name": { "type": "string", "key$": "name" }, "description": { "type": "string", "key$": "description" }, "senderAlias": { "type": "string", "key$": "senderAlias" }, "deleteOnOptout": { "type": "boolean", "key$": "deleteOnOptout" }, "routes": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "format": "int32" }, "name": { "type": "string" }, "channel": { "type": "string" }, "keywords": { "type": "array", "items": {} }, "unsubscriptionText": { "type": "string" }, "optoutFooterEnabled": { "type": "boolean" }, "optoutFooterText": { "type": "string" }, "optoutFooterPageText": { "type": "string" }, "optoutFooterPageButton": { "type": "string" } }, "x-ref": "#/components/schemas/UnsubscribeRouteDto" }, "key$": "routes" }, "hooks": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "format": "int32" }, "hookId": { "type": "integer", "format": "int32" }, "hookName": { "type": "string" }, "hookKey": { "type": "string" }, "name": { "type": "string" }, "enabled": { "type": "boolean" } }, "x-ref": "#/components/schemas/SimpleWebhookDto" }, "key$": "hooks" } }, "x-ref": "#/components/schemas/PermissionDatabase", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "Database ID", "in": "path", "required": true, "schema": { "type": "integer", "format": "int32" }, "index$": 0 }, { "name": "apiKey", "in": "query", "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let permission_database_ref01_data = Object.values(setup.data.existing.permission_database)[0];
        // LIST
        const permission_database_ref01_ent = client.PermissionDatabase();
        const permission_database_ref01_match = {};
        const permission_database_ref01_list = (await permission_database_ref01_ent.list(permission_database_ref01_match)).map((e) => e.data());
        // UPDATE
        const permission_database_ref01_data_up0 = {};
        permission_database_ref01_data_up0.id = permission_database_ref01_data.id;
        permission_database_ref01_data_up0['database_id'] = setup.idmap['database_id'];
        const permission_database_ref01_markdef_up0 = { name: 'description', value: 'Mark01-permission_database_ref01_' + setup.now };
        permission_database_ref01_data_up0[permission_database_ref01_markdef_up0.name] = permission_database_ref01_markdef_up0.value;
        const permission_database_ref01_resdata_up0 = (await permission_database_ref01_ent.update(permission_database_ref01_data_up0)).data();
        (0, node_assert_1.default)(permission_database_ref01_resdata_up0.id === permission_database_ref01_data_up0.id);
        (0, node_assert_1.default)(permission_database_ref01_resdata_up0[permission_database_ref01_markdef_up0.name] === permission_database_ref01_markdef_up0.value);
        // LOAD
        const permission_database_ref01_match_dt0 = {};
        permission_database_ref01_match_dt0.id = permission_database_ref01_data.id;
        const permission_database_ref01_data_dt0 = (await permission_database_ref01_ent.load(permission_database_ref01_match_dt0)).data();
        (0, node_assert_1.default)(permission_database_ref01_data_dt0.id === permission_database_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/permission_database/PermissionDatabaseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmUmbrellaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['permission_database01', 'permission_database02', 'permission_database03', 'database01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID': idmap,
        'LM_UMBRELLA_TEST_LIVE': 'FALSE',
        'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
        'LM_UMBRELLA_APIKEY': '',
    });
    idmap = env['LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID'];
    const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID'];
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
//# sourceMappingURL=PermissionDatabaseEntity.test.js.map