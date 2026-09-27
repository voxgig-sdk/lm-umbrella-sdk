

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"customerId":{"a":true,"fo":"int32","h":"Customer Id","n":"customerId","r":false,"t":"`$INTEGER`","key$":"customerId","index$":0},"deleteOnOptout":{"a":true,"h":"Delete On Optout","n":"deleteOnOptout","r":false,"t":"`$BOOLEAN`","key$":"deleteOnOptout","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":2},"hooks":{"a":true,"h":"Hooks","n":"hooks","r":false,"t":"`$ARRAY`","key$":"hooks","index$":3},"id":{"a":true,"fo":"int32","h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":5},"routes":{"a":true,"h":"Routes","n":"routes","r":false,"t":"`$ARRAY`","key$":"routes","index$":6},"senderAlias":{"a":true,"h":"Sender Alias","n":"senderAlias","r":false,"t":"`$STRING`","key$":"senderAlias","index$":7},"serviceId":{"a":true,"fo":"int32","h":"Service Id","n":"serviceId","r":false,"t":"`$INTEGER`","key$":"serviceId","index$":8}},"id":{"field":"id","name":"id"},"name":"permission_database","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /public/database/list","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/public/database/list","q":{"exist":["api_key"]},"r":{},"s":[{"lit":"public"},{"lit":"database"},{"lit":"list"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /public/database/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"database_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/public/database/{id}","q":{"exist":["api_key","database_id"]},"r":{},"s":[{"lit":"public"},{"lit":"database"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /public/database/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"database_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/public/database/{id}","q":{"exist":["api_key","database_id"]},"r":{},"s":[{"lit":"public"},{"lit":"database"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"permission_database","name__orig":"permission_database","Name":"PermissionDatabase","name_":"permission_database","name-":"permission-database","NAME":"PERMISSION_DATABASE","index$":7}, {"active":true,"entity":"permission_database","key$":"BasicPermissionDatabaseFlow","kind":"basic","name":"BasicPermissionDatabaseFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"permission_database_ref01"}}],"index$":0},{"a":true,"d":{"database_id":"database01"},"i":{"ref":"permission_database_ref01","srcdatavar":"permission_database_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-permission_database_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"permission_database_ref01","srcdatavar":"permission_database_ref01_data","suffix":"_dt0"},"m":{"database_id":"database01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-permission_database_ref01"}}],"index$":2}]}, 'PermissionDatabase', {"GET /public/database/list":{"protocol":"http","parameters":[{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":0}]},"GET /public/database/{id}":{"protocol":"http","parameters":[{"name":"Database ID","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0},{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":1}]},"PUT /public/database/{id}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","format":"int32","key$":"id"},"serviceId":{"type":"integer","format":"int32","key$":"serviceId"},"customerId":{"type":"integer","format":"int32","key$":"customerId"},"name":{"type":"string","key$":"name"},"description":{"type":"string","key$":"description"},"senderAlias":{"type":"string","key$":"senderAlias"},"deleteOnOptout":{"type":"boolean","key$":"deleteOnOptout"},"routes":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","format":"int32"},"name":{"type":"string"},"channel":{"type":"string"},"keywords":{"type":"array","items":{}},"unsubscriptionText":{"type":"string"},"optoutFooterEnabled":{"type":"boolean"},"optoutFooterText":{"type":"string"},"optoutFooterPageText":{"type":"string"},"optoutFooterPageButton":{"type":"string"}},"x-ref":"#/components/schemas/UnsubscribeRouteDto"},"key$":"routes"},"hooks":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","format":"int32"},"hookId":{"type":"integer","format":"int32"},"hookName":{"type":"string"},"hookKey":{"type":"string"},"name":{"type":"string"},"enabled":{"type":"boolean"}},"x-ref":"#/components/schemas/SimpleWebhookDto"},"key$":"hooks"}},"x-ref":"#/components/schemas/PermissionDatabase","index$":1}}},"required":true},"parameters":[{"name":"Database ID","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0},{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":1}]}})
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
    ['permission_database01','permission_database02','permission_database03','database01'],
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
  
