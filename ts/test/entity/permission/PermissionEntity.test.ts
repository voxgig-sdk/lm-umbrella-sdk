

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


describe('PermissionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_UMBRELLA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmUmbrellaSDK.test()
    const ent = testsdk.Permission()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'permission.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"empty","req":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"msisdn","req":false,"type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"permission","op":{"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"param","name":"id","orig":"msisdn","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /public/database/{id}/permission/{msisdn}","json":"{\"operationId\":\"deactivate\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"path\",\"name\":\"msisdn\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful operation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"result of a validation\",\"properties\":{\"errors\":{\"description\":\"list of errors after validation\",\"items\":{\"description\":\"represents an error\",\"properties\":{\"code\":{\"description\":\"code for error\",\"type\":\"string\"},\"message\":{\"description\":\"human friendly error message\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"description\":\"relevant properties for error\",\"type\":\"string\"},\"description\":\"relevant properties for error\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"One or more parameters missing or invalid\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Permission was not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/public/database/{id}/permission/{msisdn}","rename":{"param":{"id":"database_id","msisdn":"id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"var":"id"}],"select":{"exist":["api_key","database_id","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"param","name":"msisdn","orig":"msisdn","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /public/database/{id}/permission/permanent/{msisdn}","json":"{\"operationId\":\"delete_2\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"path\",\"name\":\"msisdn\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful operation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"result of a validation\",\"properties\":{\"errors\":{\"description\":\"list of errors after validation\",\"items\":{\"description\":\"represents an error\",\"properties\":{\"code\":{\"description\":\"code for error\",\"type\":\"string\"},\"message\":{\"description\":\"human friendly error message\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"description\":\"relevant properties for error\",\"type\":\"string\"},\"description\":\"relevant properties for error\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"One or more parameters missing or invalid\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Permission was not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/public/database/{id}/permission/permanent/{msisdn}","rename":{"param":{"id":"database_id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"permanent"},{"var":"msisdn"}],"select":{"exist":["api_key","database_id","msisdn"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"param","name":"id","orig":"msisdn","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /public/database/{id}/permission/{msisdn}","json":"{\"operationId\":\"update_2\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"path\",\"name\":\"msisdn\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":{\"type\":\"object\"},\"properties\":{\"empty\":{\"type\":\"boolean\"},\"msisdn\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"description\":\"Successful operation\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Permission was not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/public/database/{id}/permission/{msisdn}","rename":{"param":{"id":"database_id","msisdn":"id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"var":"id"}],"select":{"exist":["api_key","database_id","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["database"],["database","permanent"]]},"key$":"permission","name__orig":"permission","Name":"Permission","name_":"permission","name-":"permission","NAME":"PERMISSION","index$":6}, {"active":true,"entity":"permission","key$":"BasicPermissionFlow","kind":"basic","name":"BasicPermissionFlow","param":{},"step":[{"active":true,"data":{"database_id":"database01"},"input":{"ref":"permission_ref01","srcdatavar":"permission_ref01_data","suffix":"_up0","textfield":"msisdn"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-permission_ref01"}}],"valid":[],"index$":0}]}, 'Permission')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let permission_ref01_data = Object.values(setup.data.existing.permission)[0] as any

    // UPDATE
    const permission_ref01_ent = client.Permission()
    const permission_ref01_data_up0: any = {}
    permission_ref01_data_up0.id = permission_ref01_data.id
    permission_ref01_data_up0 ['database_id'] = setup.idmap['database_id']

    const permission_ref01_markdef_up0 = { name: 'msisdn', value: 'Mark01-permission_ref01_' + setup.now }
    ;(permission_ref01_data_up0 as any)[permission_ref01_markdef_up0.name] = permission_ref01_markdef_up0.value

    const permission_ref01_resdata_up0 = (await permission_ref01_ent.update(permission_ref01_data_up0)).data()
    assert(permission_ref01_resdata_up0.id === permission_ref01_data_up0.id)

    assert((permission_ref01_resdata_up0 as any)[permission_ref01_markdef_up0.name] === permission_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/permission/PermissionTestData.json')

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
    ['permission01','permission02','permission03','database01','database02','database03','database01','database02','database03','permanent01','permanent02','permanent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_UMBRELLA_TEST_PERMISSION_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': '',
  })

  idmap = env['LM_UMBRELLA_TEST_PERMISSION_ENTID']

  const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_UMBRELLA_TEST_PERMISSION_ENTID']
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
  
