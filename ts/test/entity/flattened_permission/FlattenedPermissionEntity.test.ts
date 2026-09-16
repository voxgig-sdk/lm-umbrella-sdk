

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LmUmbrellaSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('FlattenedPermissionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_UMBRELLA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmUmbrellaSDK.test()
    const ent = testsdk.FlattenedPermission()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'flattened_permission.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"active","req":false,"short":"if permission is active in the database","type":"`$BOOLEAN`","index$":0},{"active":true,"name":"empty","req":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"msisdn","req":false,"short":"phone number","type":"`$STRING`","index$":3},{"active":true,"name":"source","req":false,"short":"comma separated list of sources","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"flattened_permission","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"param","name":"id","orig":"msisdn","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /public/database/{id}/permission/{msisdn}","json":"{\"operationId\":\"save_1\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"path\",\"name\":\"msisdn\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":{\"type\":\"object\"},\"properties\":{\"empty\":{\"type\":\"boolean\"},\"msisdn\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"This class represents a permission - there are three special fields: msisdn, actice and source. Each metadata field can be added as a field of this object - with its value - so if you e.g. have a metadate field with name as key the flattened permission will look *like*: \\n\\n```javascript\\n{ \\\"msisdn\\\": \\\"4531503823\\\",\\n  \\\"active\\\": true,\\n  \\\"source\\\": \\\"source1,source2\\\",\\n  \\\"name\\\": \\\"Erik\\\"\\n}\\n```\",\"properties\":{\"active\":{\"description\":\"if permission is active in the database\",\"type\":\"boolean\"},\"msisdn\":{\"description\":\"phone number\",\"type\":\"string\"},\"source\":{\"description\":\"comma separated list of sources\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"result of a validation\",\"properties\":{\"errors\":{\"description\":\"list of errors after validation\",\"items\":{\"description\":\"represents an error\",\"properties\":{\"code\":{\"description\":\"code for error\",\"type\":\"string\"},\"message\":{\"description\":\"human friendly error message\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"description\":\"relevant properties for error\",\"type\":\"string\"},\"description\":\"relevant properties for error\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"One or more parameters missing or invalid\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Permission was not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/public/database/{id}/permission/{msisdn}","rename":{"param":{"id":"database_id","msisdn":"id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"var":"id"}],"select":{"exist":["api_key","database_id","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /public/database/{id}/permission/list","json":"{\"operationId\":\"permissionList\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"This class represents a permission - there are three special fields: msisdn, actice and source. Each metadata field can be added as a field of this object - with its value - so if you e.g. have a metadate field with name as key the flattened permission will look *like*: \\n\\n```javascript\\n{ \\\"msisdn\\\": \\\"4531503823\\\",\\n  \\\"active\\\": true,\\n  \\\"source\\\": \\\"source1,source2\\\",\\n  \\\"name\\\": \\\"Erik\\\"\\n}\\n```\",\"properties\":{\"active\":{\"description\":\"if permission is active in the database\",\"type\":\"boolean\"},\"msisdn\":{\"description\":\"phone number\",\"type\":\"string\"},\"source\":{\"description\":\"comma separated list of sources\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"},\"404\":{\"description\":\"The database could not be found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/database/{id}/permission/list","rename":{"param":{"id":"database_id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"list"}],"select":{"exist":["api_key","database_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /public/database/{id}/permission/query","json":"{\"operationId\":\"saveByParameters\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"This class represents a permission - there are three special fields: msisdn, actice and source. Each metadata field can be added as a field of this object - with its value - so if you e.g. have a metadate field with name as key the flattened permission will look *like*: \\n\\n```javascript\\n{ \\\"msisdn\\\": \\\"4531503823\\\",\\n  \\\"active\\\": true,\\n  \\\"source\\\": \\\"source1,source2\\\",\\n  \\\"name\\\": \\\"Erik\\\"\\n}\\n```\",\"properties\":{\"active\":{\"description\":\"if permission is active in the database\",\"type\":\"boolean\"},\"msisdn\":{\"description\":\"phone number\",\"type\":\"string\"},\"source\":{\"description\":\"comma separated list of sources\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"result of a validation\",\"properties\":{\"errors\":{\"description\":\"list of errors after validation\",\"items\":{\"description\":\"represents an error\",\"properties\":{\"code\":{\"description\":\"code for error\",\"type\":\"string\"},\"message\":{\"description\":\"human friendly error message\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"description\":\"relevant properties for error\",\"type\":\"string\"},\"description\":\"relevant properties for error\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"One or more parameters missing or invalid\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Permission was not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/database/{id}/permission/query","rename":{"param":{"id":"database_id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"query"}],"select":{"exist":["database_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["database"]]},"key$":"flattened_permission","name__orig":"flattened_permission","Name":"FlattenedPermission","name_":"flattened_permission","name-":"flattened-permission","NAME":"FLATTENED_PERMISSION","index$":2}, {"active":true,"entity":"flattened_permission","key$":"BasicFlattenedPermissionFlow","kind":"basic","name":"BasicFlattenedPermissionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"flattened_permission_ref01"},"match":{"database_id":"database01","msisdn":"msisdn01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"database_id":"database01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"flattened_permission_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"flattened_permission_ref01","srcdatavar":"flattened_permission_ref01_data","suffix":"_dt0"},"match":{"id":"flattened_permission01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-flattened_permission_ref01"}}],"index$":2}]}, 'FlattenedPermission')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const flattened_permission_ref01_ent = client.FlattenedPermission()
    let flattened_permission_ref01_data = setup.data.new.flattened_permission['flattened_permission_ref01']
    flattened_permission_ref01_data['database_id'] = setup.idmap['database01']
    flattened_permission_ref01_data['msisdn'] = setup.idmap['msisdn01']

    flattened_permission_ref01_data = (await flattened_permission_ref01_ent.create(flattened_permission_ref01_data)).data()
    assert(null != flattened_permission_ref01_data.id)


    // LIST
    const flattened_permission_ref01_match: any = {}
    flattened_permission_ref01_match['database_id'] = setup.idmap['database01']

    const flattened_permission_ref01_list = (await flattened_permission_ref01_ent.list(flattened_permission_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(flattened_permission_ref01_list, { id: flattened_permission_ref01_data.id })))


    // LOAD
    const flattened_permission_ref01_match_dt0: any = {}
    flattened_permission_ref01_match_dt0.id = flattened_permission_ref01_data.id
    const flattened_permission_ref01_data_dt0 = (await flattened_permission_ref01_ent.load(flattened_permission_ref01_match_dt0)).data()
    assert(flattened_permission_ref01_data_dt0.id === flattened_permission_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/flattened_permission/FlattenedPermissionTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LmUmbrellaSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['flattened_permission01','flattened_permission02','flattened_permission03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_UMBRELLA_TEST_FLATTENED_PERMISSION_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': '',
  })

  idmap = env['LM_UMBRELLA_TEST_FLATTENED_PERMISSION_ENTID']

  const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_UMBRELLA_TEST_FLATTENED_PERMISSION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LmUmbrellaSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
