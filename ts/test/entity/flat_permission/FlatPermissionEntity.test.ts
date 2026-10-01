

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


describe('FlatPermissionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_UMBRELLA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmUmbrellaSDK.test()
    const ent = testsdk.FlatPermission()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'flat_permission.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"empty":{"a":true,"h":"Empty","n":"empty","r":false,"t":"`$BOOLEAN`","key$":"empty","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"msisdn":{"a":true,"h":"Msisdn","n":"msisdn","r":false,"t":"`$STRING`","key$":"msisdn","index$":2}},"id":{"field":"id","name":"id"},"name":"flat_permission","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /public/database/{id}/permission/{msisdn}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"id","or":"msisdn","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"api_key","or":"apiKey","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/public/database/{id}/permission/{msisdn}","q":{"exist":["api_key","database_id","id"]},"r":{"param":{"id":"database_id","msisdn":"id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.database"]]},"key$":"flat_permission","name__orig":"flat_permission","Name":"FlatPermission","name_":"flat_permission","name-":"flat-permission","NAME":"FLAT_PERMISSION","index$":1}, {"active":true,"entity":"flat_permission","key$":"BasicFlatPermissionFlow","kind":"basic","name":"BasicFlatPermissionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"flat_permission_ref01","srcdatavar":"flat_permission_ref01_data","suffix":"_dt0"},"m":{"database_id":"database01","id":"flat_permission01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-flat_permission_ref01"}}],"index$":0}]}, 'FlatPermission', {"GET /public/database/{id}/permission/{msisdn}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0},{"name":"msisdn","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let flat_permission_ref01_data = Object.values(setup.data.existing.flat_permission)[0] as any

    // LOAD
    const flat_permission_ref01_ent = client.FlatPermission()
    const flat_permission_ref01_match_dt0: any = {}
    flat_permission_ref01_match_dt0.id = flat_permission_ref01_data.id
    const flat_permission_ref01_data_dt0 = (await flat_permission_ref01_ent.load(flat_permission_ref01_match_dt0)).data()
    assert(flat_permission_ref01_data_dt0.id === flat_permission_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/flat_permission/FlatPermissionTestData.json')

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
    ['flat_permission01','flat_permission02','flat_permission03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_UMBRELLA_TEST_FLAT_PERMISSION_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': '',
  })

  idmap = env['LM_UMBRELLA_TEST_FLAT_PERMISSION_ENTID']

  const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_UMBRELLA_TEST_FLAT_PERMISSION_ENTID']
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
  
