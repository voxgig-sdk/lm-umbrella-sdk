

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


describe('PaginatedPermissionListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_UMBRELLA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmUmbrellaSDK.test()
    const ent = testsdk.PaginatedPermissionList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'paginated_permission_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ascending":{"a":true,"h":"Ascending","n":"ascending","r":false,"t":"`$BOOLEAN`","key$":"ascending","index$":0},"columns":{"a":true,"h":"Columns","n":"columns","r":false,"sh":"the column data","t":"`$ARRAY`","key$":"columns","index$":1},"endRow":{"a":true,"fo":"int32","h":"End Row","n":"endRow","r":false,"t":"`$INTEGER`","key$":"endRow","index$":2},"groups":{"a":true,"h":"Groups","n":"groups","r":false,"t":"`$ARRAY`","key$":"groups","index$":3},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$ARRAY`","key$":"metadata","index$":4},"msisdnList":{"a":true,"h":"Msisdn List","n":"msisdnList","r":false,"t":"`$ARRAY`","key$":"msisdnList","index$":5},"onlyActive":{"a":true,"h":"Only Active","n":"onlyActive","r":false,"t":"`$BOOLEAN`","key$":"onlyActive","index$":6},"page":{"a":true,"fo":"int32","h":"Page","n":"page","r":false,"sh":"page number","t":"`$INTEGER`","key$":"page","index$":7},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":false,"sh":"the permissions for the page","t":"`$ARRAY`","key$":"permissions","index$":8},"quickFilterText":{"a":true,"h":"Quick Filter Text","n":"quickFilterText","r":false,"t":"`$STRING`","key$":"quickFilterText","index$":9},"sort":{"a":true,"h":"Sort","n":"sort","r":false,"t":"`$STRING`","key$":"sort","index$":10},"sources":{"a":true,"h":"Sources","n":"sources","r":false,"sh":"the possible sources for the database","t":"`$ARRAY`","key$":"sources","index$":11},"startRow":{"a":true,"fo":"int32","h":"Start Row","n":"startRow","r":false,"t":"`$INTEGER`","key$":"startRow","index$":12},"totalActive":{"a":true,"fo":"int32","h":"Total Active","n":"totalActive","r":false,"sh":"total number of active permissions","t":"`$INTEGER`","key$":"totalActive","index$":13},"totalElements":{"a":true,"fo":"int32","h":"Total Elements","n":"totalElements","r":false,"sh":"total number of permissions","t":"`$INTEGER`","key$":"totalElements","index$":14},"totalPages":{"a":true,"fo":"int32","h":"Total Pages","n":"totalPages","r":false,"sh":"total number of pages","t":"`$INTEGER`","key$":"totalPages","index$":15}},"name":"paginated_permission_list","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /public/database/{id}/permission/paged/list","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"api_key","or":"apiKey","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/public/database/{id}/permission/paged/list","q":{"exist":["api_key","database_id"]},"r":{"param":{"id":"database_id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"paged"},{"lit":"list"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.database"]]},"key$":"paginated_permission_list","name__orig":"paginated_permission_list","Name":"PaginatedPermissionList","name_":"paginated_permission_list","name-":"paginated-permission-list","NAME":"PAGINATED_PERMISSION_LIST","index$":5}, {"active":true,"entity":"paginated_permission_list","key$":"BasicPaginatedPermissionListFlow","kind":"basic","name":"BasicPaginatedPermissionListFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"paginated_permission_list_ref01"},"m":{"database_id":"database01"},"o":"create","s":[],"v":[],"index$":0}]}, 'PaginatedPermissionList', {"POST /public/database/{id}/permission/paged/list":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"startRow":{"type":"integer","format":"int32","key$":"startRow"},"endRow":{"type":"integer","format":"int32","key$":"endRow"},"quickFilterText":{"type":"string","key$":"quickFilterText"},"sources":{"type":"array","items":{"type":"string"},"key$":"sources"},"metadata":{"type":"array","items":{"type":"object","properties":{"key":{"type":"string"},"rules":{"type":"array","items":{}}},"x-ref":"#/components/schemas/Rules"},"key$":"metadata"},"sort":{"type":"string","key$":"sort"},"groups":{"type":"array","items":{"type":"object","properties":{"type":{"type":"string"},"operation":{"type":"string"},"groups":{"type":"array","items":{}},"metadata":{"type":"array","items":{}}},"x-ref":"#/components/schemas/Group"},"key$":"groups"},"msisdnList":{"type":"array","items":{"type":"string"},"key$":"msisdnList"},"ascending":{"type":"boolean","key$":"ascending"},"onlyActive":{"type":"boolean","key$":"onlyActive"}},"x-ref":"#/components/schemas/Segmentation","index$":1}}},"required":true},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0},{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const paginated_permission_list_ref01_ent = client.PaginatedPermissionList()
    let paginated_permission_list_ref01_data = setup.data.new.paginated_permission_list['paginated_permission_list_ref01']
    paginated_permission_list_ref01_data['database_id'] = setup.idmap['database01']

    paginated_permission_list_ref01_data = (await paginated_permission_list_ref01_ent.create(paginated_permission_list_ref01_data)).data()
    assert(null != paginated_permission_list_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/paginated_permission_list/PaginatedPermissionListTestData.json')

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
    ['paginated_permission_list01','paginated_permission_list02','paginated_permission_list03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': '',
  })

  idmap = env['LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID']

  const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID']
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
  
