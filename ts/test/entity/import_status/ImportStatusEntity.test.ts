

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


describe('ImportStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_UMBRELLA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmUmbrellaSDK.test()
    const ent = testsdk.ImportStatus()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'import_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"errors":{"a":true,"h":"Errors","n":"errors","r":false,"sh":"Import errors (List of ImportError)","t":"`$ARRAY`","key$":"errors","index$":0},"importId":{"a":true,"h":"Import Id","n":"importId","r":false,"sh":"Import id","t":"`$STRING`","key$":"importId","index$":1},"msisdn":{"a":true,"h":"Msisdn","n":"msisdn","r":false,"t":"`$STRING`","key$":"msisdn","index$":2},"permissionsInserted":{"a":true,"fo":"int32","h":"Permissions Inserted","n":"permissionsInserted","r":false,"sh":"Number of permissions inserted into database","t":"`$INTEGER`","key$":"permissionsInserted","index$":3},"permissionsUpdated":{"a":true,"fo":"int32","h":"Permissions Updated","n":"permissionsUpdated","r":false,"sh":"Number of permissions updated in database","t":"`$INTEGER`","key$":"permissionsUpdated","index$":4},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)","t":"`$STRING`","key$":"status","index$":5}},"name":"import_status","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /public/database/{id}/permission/bulk","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":false,"k":"query","n":"skip_import_on_error","or":"skip_import_on_error","r":false,"t":"`$BOOLEAN`","index$":1}]},"k":"http","m":"POST","o":"/public/database/{id}/permission/bulk","q":{"exist":["api_key","database_id","skip_import_on_error"]},"r":{"param":{"id":"database_id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"bulk"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /public/database/{id}/permission/bulk/status","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"import_id","or":"import_id","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/public/database/{id}/permission/bulk/status","q":{"exist":["api_key","database_id","import_id"]},"r":{"param":{"id":"database_id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"bulk"},{"lit":"status"}],"t":{"req":"`reqdata`","res":"`body.errors`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.database"]]},"key$":"import_status","name__orig":"import_status","Name":"ImportStatus","name_":"import_status","name-":"import-status","NAME":"IMPORT_STATUS","index$":3}, {"active":true,"entity":"import_status","key$":"BasicImportStatusFlow","kind":"basic","name":"BasicImportStatusFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"import_status_ref01"},"m":{"database_id":"database01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"database_id":"database01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"import_status_ref01"}}],"index$":1}]}, 'ImportStatus', {"POST /public/database/{id}/permission/bulk":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"msisdn":{"type":"string","key$":"msisdn"},"empty":{"type":"boolean","key$":"empty"}},"additionalProperties":{"type":"object"},"x-ref":"#/components/schemas/FlatPermission"},"index$":1}}},"required":true},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0},{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":1},{"name":"skipImportOnError","in":"query","schema":{"type":"boolean","default":false},"index$":2}]},"GET /public/database/{id}/permission/bulk/status":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0},{"name":"importId","in":"query","schema":{"type":"string"},"index$":1},{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const import_status_ref01_ent = client.ImportStatus()
    let import_status_ref01_data = setup.data.new.import_status['import_status_ref01']
    import_status_ref01_data['database_id'] = setup.idmap['database01']

    import_status_ref01_data = (await import_status_ref01_ent.create(import_status_ref01_data)).data()
    assert(null != import_status_ref01_data)


    // LIST
    const import_status_ref01_match: any = {}
    import_status_ref01_match['database_id'] = setup.idmap['database01']

    const import_status_ref01_list = (await import_status_ref01_ent.list(import_status_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/import_status/ImportStatusTestData.json')

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
    ['import_status01','import_status02','import_status03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': '',
  })

  idmap = env['LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID']

  const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID']
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
  
