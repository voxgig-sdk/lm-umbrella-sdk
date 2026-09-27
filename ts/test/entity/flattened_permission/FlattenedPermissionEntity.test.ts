

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"active":{"a":true,"h":"Active","n":"active","r":false,"sh":"if permission is active in the database","t":"`$BOOLEAN`","key$":"active","index$":0},"empty":{"a":true,"h":"Empty","n":"empty","r":false,"t":"`$BOOLEAN`","key$":"empty","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"msisdn":{"a":true,"h":"Msisdn","n":"msisdn","r":false,"sh":"phone number","t":"`$STRING`","key$":"msisdn","index$":3},"source":{"a":true,"h":"Source","n":"source","r":false,"sh":"comma separated list of sources","t":"`$STRING`","key$":"source","index$":4}},"id":{"field":"id","name":"id"},"name":"flattened_permission","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /public/database/{id}/permission/{msisdn}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"id","or":"msisdn","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/public/database/{id}/permission/{msisdn}","q":{"exist":["api_key","database_id","id"]},"r":{"param":{"id":"database_id","msisdn":"id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /public/database/{id}/permission/list","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/public/database/{id}/permission/list","q":{"exist":["api_key","database_id"]},"r":{"param":{"id":"database_id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"list"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /public/database/{id}/permission/query","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/public/database/{id}/permission/query","q":{"exist":["database_id"]},"r":{"param":{"id":"database_id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"query"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.database"]]},"key$":"flattened_permission","name__orig":"flattened_permission","Name":"FlattenedPermission","name_":"flattened_permission","name-":"flattened-permission","NAME":"FLATTENED_PERMISSION","index$":2}, {"active":true,"entity":"flattened_permission","key$":"BasicFlattenedPermissionFlow","kind":"basic","name":"BasicFlattenedPermissionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"flattened_permission_ref01"},"m":{"database_id":"database01","msisdn":"msisdn01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"database_id":"database01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"flattened_permission_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"flattened_permission_ref01","srcdatavar":"flattened_permission_ref01_data","suffix":"_dt0"},"m":{"id":"flattened_permission01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-flattened_permission_ref01"}}],"index$":2}]}, 'FlattenedPermission', {"POST /public/database/{id}/permission/{msisdn}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"msisdn":{"type":"string","key$":"msisdn"},"empty":{"type":"boolean","key$":"empty"}},"additionalProperties":{"type":"object"},"index$":1}}},"required":true},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0},{"name":"msisdn","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":2}]},"GET /public/database/{id}/permission/list":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0},{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":1}]},"GET /public/database/{id}/permission/query":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0}]}})
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
    ['flattened_permission01','flattened_permission02','flattened_permission03','database01','database02','database03','msisdn01'],
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
  
