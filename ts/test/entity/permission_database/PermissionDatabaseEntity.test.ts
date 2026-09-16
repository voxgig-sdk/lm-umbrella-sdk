

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


describe('PermissionDatabaseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_UMBRELLA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmUmbrellaSDK.test()
    const ent = testsdk.PermissionDatabase()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE
    for (const op of ['list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'permission_database.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"int32","name":"customerId","req":false,"type":"`$INTEGER`","index$":0},{"active":true,"name":"deleteOnOptout","req":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"name":"description","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"hooks","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"format":"int32","name":"id","req":false,"type":"`$INTEGER`","index$":4},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"routes","req":false,"type":"`$ARRAY`","index$":6},{"active":true,"name":"senderAlias","req":false,"type":"`$STRING`","index$":7},{"active":true,"format":"int32","name":"serviceId","req":false,"type":"`$INTEGER`","index$":8}],"id":{"field":"id","name":"id"},"name":"permission_database","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /public/database/list","json":"{\"operationId\":\"list\",\"parameters\":[{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"customerId\":{\"format\":\"int32\",\"type\":\"integer\"},\"deleteOnOptout\":{\"type\":\"boolean\"},\"description\":{\"type\":\"string\"},\"hooks\":{\"items\":{\"properties\":{\"enabled\":{\"type\":\"boolean\"},\"hookId\":{\"format\":\"int32\",\"type\":\"integer\"},\"hookKey\":{\"type\":\"string\"},\"hookName\":{\"type\":\"string\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"routes\":{\"items\":{\"properties\":{\"channel\":{\"type\":\"string\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"keywords\":{\"items\":{\"description\":\"This represent an unsubscription route for a database\",\"properties\":{\"extra\":{\"description\":\"extra word (second word in the sms) for unsubscribing (empty or null means all)\",\"type\":\"string\"},\"id\":{\"description\":\"internal database id of the route\",\"format\":\"int32\",\"type\":\"integer\"},\"keyword\":{\"description\":\"keyword for the route\",\"type\":\"string\"},\"permissionDatabaseId\":{\"description\":\"id of the database it belongs to\",\"format\":\"int32\",\"type\":\"integer\"},\"routeId\":{\"description\":\"the route the keyword is configured on\",\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"optoutFooterEnabled\":{\"type\":\"boolean\"},\"optoutFooterPageButton\":{\"type\":\"string\"},\"optoutFooterPageText\":{\"type\":\"string\"},\"optoutFooterText\":{\"type\":\"string\"},\"unsubscriptionText\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"senderAlias\":{\"type\":\"string\"},\"serviceId\":{\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/database/list","segments":[{"lit":"public"},{"lit":"database"},{"lit":"list"}],"select":{"exist":["api_key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"database_id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /public/database/{id}","json":"{\"operationId\":\"get\",\"parameters\":[{\"in\":\"path\",\"name\":\"Database ID\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"customerId\":{\"format\":\"int32\",\"type\":\"integer\"},\"deleteOnOptout\":{\"type\":\"boolean\"},\"description\":{\"type\":\"string\"},\"hooks\":{\"items\":{\"properties\":{\"enabled\":{\"type\":\"boolean\"},\"hookId\":{\"format\":\"int32\",\"type\":\"integer\"},\"hookKey\":{\"type\":\"string\"},\"hookName\":{\"type\":\"string\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"routes\":{\"items\":{\"properties\":{\"channel\":{\"type\":\"string\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"keywords\":{\"items\":{\"description\":\"This represent an unsubscription route for a database\",\"properties\":{\"extra\":{\"description\":\"extra word (second word in the sms) for unsubscribing (empty or null means all)\",\"type\":\"string\"},\"id\":{\"description\":\"internal database id of the route\",\"format\":\"int32\",\"type\":\"integer\"},\"keyword\":{\"description\":\"keyword for the route\",\"type\":\"string\"},\"permissionDatabaseId\":{\"description\":\"id of the database it belongs to\",\"format\":\"int32\",\"type\":\"integer\"},\"routeId\":{\"description\":\"the route the keyword is configured on\",\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"optoutFooterEnabled\":{\"type\":\"boolean\"},\"optoutFooterPageButton\":{\"type\":\"string\"},\"optoutFooterPageText\":{\"type\":\"string\"},\"optoutFooterText\":{\"type\":\"string\"},\"unsubscriptionText\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"senderAlias\":{\"type\":\"string\"},\"serviceId\":{\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"One or more parameters missing or invalid\"},\"401\":{\"description\":\"The request is not allowed\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/database/{id}","segments":[{"lit":"public"},{"lit":"database"},{"var":"id"}],"select":{"exist":["api_key","database_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"database_id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /public/database/{id}","json":"{\"operationId\":\"update\",\"parameters\":[{\"in\":\"path\",\"name\":\"Database ID\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"customerId\":{\"format\":\"int32\",\"type\":\"integer\"},\"deleteOnOptout\":{\"type\":\"boolean\"},\"description\":{\"type\":\"string\"},\"hooks\":{\"items\":{\"properties\":{\"enabled\":{\"type\":\"boolean\"},\"hookId\":{\"format\":\"int32\",\"type\":\"integer\"},\"hookKey\":{\"type\":\"string\"},\"hookName\":{\"type\":\"string\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"routes\":{\"items\":{\"properties\":{\"channel\":{\"type\":\"string\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"keywords\":{\"items\":{\"description\":\"This represent an unsubscription route for a database\",\"properties\":{\"extra\":{\"description\":\"extra word (second word in the sms) for unsubscribing (empty or null means all)\",\"type\":\"string\"},\"id\":{\"description\":\"internal database id of the route\",\"format\":\"int32\",\"type\":\"integer\"},\"keyword\":{\"description\":\"keyword for the route\",\"type\":\"string\"},\"permissionDatabaseId\":{\"description\":\"id of the database it belongs to\",\"format\":\"int32\",\"type\":\"integer\"},\"routeId\":{\"description\":\"the route the keyword is configured on\",\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"optoutFooterEnabled\":{\"type\":\"boolean\"},\"optoutFooterPageButton\":{\"type\":\"string\"},\"optoutFooterPageText\":{\"type\":\"string\"},\"optoutFooterText\":{\"type\":\"string\"},\"unsubscriptionText\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"senderAlias\":{\"type\":\"string\"},\"serviceId\":{\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"customerId\":{\"format\":\"int32\",\"type\":\"integer\"},\"deleteOnOptout\":{\"type\":\"boolean\"},\"description\":{\"type\":\"string\"},\"hooks\":{\"items\":{\"properties\":{\"enabled\":{\"type\":\"boolean\"},\"hookId\":{\"format\":\"int32\",\"type\":\"integer\"},\"hookKey\":{\"type\":\"string\"},\"hookName\":{\"type\":\"string\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"routes\":{\"items\":{\"properties\":{\"channel\":{\"type\":\"string\"},\"id\":{\"format\":\"int32\",\"type\":\"integer\"},\"keywords\":{\"items\":{\"description\":\"This represent an unsubscription route for a database\",\"properties\":{\"extra\":{\"description\":\"extra word (second word in the sms) for unsubscribing (empty or null means all)\",\"type\":\"string\"},\"id\":{\"description\":\"internal database id of the route\",\"format\":\"int32\",\"type\":\"integer\"},\"keyword\":{\"description\":\"keyword for the route\",\"type\":\"string\"},\"permissionDatabaseId\":{\"description\":\"id of the database it belongs to\",\"format\":\"int32\",\"type\":\"integer\"},\"routeId\":{\"description\":\"the route the keyword is configured on\",\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"optoutFooterEnabled\":{\"type\":\"boolean\"},\"optoutFooterPageButton\":{\"type\":\"string\"},\"optoutFooterPageText\":{\"type\":\"string\"},\"optoutFooterText\":{\"type\":\"string\"},\"unsubscriptionText\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"senderAlias\":{\"type\":\"string\"},\"serviceId\":{\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"result of a validation\",\"properties\":{\"errors\":{\"description\":\"list of errors after validation\",\"items\":{\"description\":\"represents an error\",\"properties\":{\"code\":{\"description\":\"code for error\",\"type\":\"string\"},\"message\":{\"description\":\"human friendly error message\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"description\":\"relevant properties for error\",\"type\":\"string\"},\"description\":\"relevant properties for error\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"One or more parameters missing or invalid\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"The database could not be found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/public/database/{id}","segments":[{"lit":"public"},{"lit":"database"},{"var":"id"}],"select":{"exist":["api_key","database_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"permission_database","name__orig":"permission_database","Name":"PermissionDatabase","name_":"permission_database","name-":"permission-database","NAME":"PERMISSION_DATABASE","index$":7}, {"active":true,"entity":"permission_database","key$":"BasicPermissionDatabaseFlow","kind":"basic","name":"BasicPermissionDatabaseFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"permission_database_ref01"}}],"index$":0},{"active":true,"data":{"database_id":"database01"},"input":{"ref":"permission_database_ref01","srcdatavar":"permission_database_ref01_data","suffix":"_up0","textfield":"description"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-permission_database_ref01"}}],"valid":[],"index$":1},{"active":true,"data":{},"input":{"ref":"permission_database_ref01","srcdatavar":"permission_database_ref01_data","suffix":"_dt0"},"match":{"database_id":"database01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-permission_database_ref01"}}],"index$":2}]}, 'PermissionDatabase')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let permission_database_ref01_data = Object.values(setup.data.existing.permission_database)[0] as any

    // LIST
    const permission_database_ref01_ent = client.PermissionDatabase()
    const permission_database_ref01_match: any = {}

    const permission_database_ref01_list = (await permission_database_ref01_ent.list(permission_database_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const permission_database_ref01_data_up0: any = {}
    permission_database_ref01_data_up0.id = permission_database_ref01_data.id
    permission_database_ref01_data_up0 ['database_id'] = setup.idmap['database_id']

    const permission_database_ref01_markdef_up0 = { name: 'description', value: 'Mark01-permission_database_ref01_' + setup.now }
    ;(permission_database_ref01_data_up0 as any)[permission_database_ref01_markdef_up0.name] = permission_database_ref01_markdef_up0.value

    const permission_database_ref01_resdata_up0 = (await permission_database_ref01_ent.update(permission_database_ref01_data_up0)).data()
    assert(permission_database_ref01_resdata_up0.id === permission_database_ref01_data_up0.id)

    assert((permission_database_ref01_resdata_up0 as any)[permission_database_ref01_markdef_up0.name] === permission_database_ref01_markdef_up0.value)


    // LOAD
    const permission_database_ref01_match_dt0: any = {}
    permission_database_ref01_match_dt0.id = permission_database_ref01_data.id
    const permission_database_ref01_data_dt0 = (await permission_database_ref01_ent.load(permission_database_ref01_match_dt0)).data()
    assert(permission_database_ref01_data_dt0.id === permission_database_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/permission_database/PermissionDatabaseTestData.json')

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
    ['permission_database01','permission_database02','permission_database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': '',
  })

  idmap = env['LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID']

  const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID']
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
  
