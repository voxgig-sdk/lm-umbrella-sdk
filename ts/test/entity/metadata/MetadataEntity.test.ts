

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


describe('MetadataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_UMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_UMBRELLA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmUmbrellaSDK.test()
    const ent = testsdk.Metadata()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'metadata.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"contents":{"a":true,"h":"Contents","n":"contents","r":false,"sh":"Contains extra info for a field","t":"`$OBJECT`","key$":"contents","index$":0},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":false,"ro":true,"sh":"created date of the field","t":"`$STRING`","key$":"created","index$":1},"databaseId":{"a":true,"fo":"int32","h":"Database Id","n":"databaseId","r":false,"sh":"id of the database","t":"`$INTEGER`","key$":"databaseId","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"key for the field (used for the value internally - cannot be changed after creation)","t":"`$STRING`","key$":"key","index$":4},"label":{"a":true,"h":"Label","n":"label","r":false,"sh":"label for the field (used for displaying in the interface)","t":"`$STRING`","key$":"label","index$":5},"multiValue":{"a":true,"h":"Multi Value","n":"multiValue","r":false,"ro":true,"sh":"if the field is a multi value field","t":"`$BOOLEAN`","key$":"multiValue","index$":6},"rangeEnd":{"a":true,"fo":"int32","h":"Range End","n":"rangeEnd","r":false,"sh":"end on range for validation on INTEGER field","t":"`$INTEGER`","key$":"rangeEnd","index$":7},"rangeStart":{"a":true,"fo":"int32","h":"Range Start","n":"rangeStart","r":false,"sh":"start on range for validation on INTEGER field","t":"`$INTEGER`","key$":"rangeStart","index$":8},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"the type of field","t":"`$STRING`","key$":"type","index$":9},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":false,"ro":true,"sh":"deletion date of the field","t":"`$STRING`","key$":"updated","index$":10},"validation":{"a":true,"h":"Validation","n":"validation","r":false,"sh":"type of validation on TEXT field","t":"`$STRING`","key$":"validation","index$":11},"values":{"a":true,"h":"Values","n":"values","r":false,"sh":"Possible enumeration of values for ENUMERATION field","t":"`$ARRAY`","key$":"values","index$":12}},"id":{"field":"id","name":"id"},"name":"metadata","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /public/database/{id}/metadata/{key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/public/database/{id}/metadata/{key}","q":{"exist":["api_key","database_id","id"]},"r":{"param":{"id":"database_id","key":"id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /public/database/{id}/metadata","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/public/database/{id}/metadata","q":{"exist":["api_key","database_id"]},"r":{"param":{"id":"database_id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"}],"t":{"req":"`reqdata`","res":"`body.contents`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /public/database/{id}/metadata","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/public/database/{id}/metadata","q":{"exist":["api_key","database_id"]},"r":{"param":{"id":"database_id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /public/database/{id}/metadata/{key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/public/database/{id}/metadata/{key}","q":{"exist":["api_key","database_id","id"]},"r":{"param":{"id":"database_id","key":"id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.contents`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /public/database/{id}/metadata/{key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_id","or":"id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/public/database/{id}/metadata/{key}","q":{"exist":["api_key","database_id","id"]},"r":{"param":{"id":"database_id","key":"id"}},"s":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.contents`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.database"]]},"key$":"metadata","name__orig":"metadata","Name":"Metadata","name_":"metadata","name-":"metadata","NAME":"METADATA","index$":4}, {"active":true,"entity":"metadata","key$":"BasicMetadataFlow","kind":"basic","name":"BasicMetadataFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"metadata_ref01"},"m":{"database_id":"database01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"database_id":"database01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"metadata_ref01"}}],"index$":1},{"a":true,"d":{"database_id":"database01"},"i":{"ref":"metadata_ref01","srcdatavar":"metadata_ref01_data","suffix":"_up0","textfield":"key"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-metadata_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"metadata_ref01","srcdatavar":"metadata_ref01_data","suffix":"_dt0"},"m":{"database_id":"database01","id":"metadata01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-metadata_ref01"}}],"index$":3}]}, 'Metadata', {"POST /public/database/{id}/metadata/{key}":{"protocol":"http","parameters":[{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":1},{"name":"key","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /public/database/{id}/metadata":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"databaseId":{"type":"integer","description":"id of the database","format":"int32","key$":"databaseId"},"key":{"type":"string","description":"key for the field (used for the value internally - cannot be changed after creation)","key$":"key"},"label":{"type":"string","description":"label for the field (used for displaying in the interface)","key$":"label"},"type":{"type":"string","description":"the type of field","enum":["INTEGER","TEXT","ENUMERATION","BOOLEAN","DATE","INTEGER,TEXT,ENUMERATION"],"key$":"type"},"contents":{"type":"object","properties":{"rangeStart":{"type":"integer","description":"start on range for validation on INTEGER field","format":"int32","key$":"rangeStart"},"rangeEnd":{"type":"integer","description":"end on range for validation on INTEGER field","format":"int32","key$":"rangeEnd"},"values":{"type":"array","description":"Possible enumeration of values for ENUMERATION field","items":{"type":"string","description":"Possible enumeration of values for ENUMERATION field"},"key$":"values"},"validation":{"type":"string","description":"type of validation on TEXT field","enum":["NONE","EMAIL"],"key$":"validation"}},"description":"Contains extra info for a field","x-ref":"#/components/schemas/MetadataContents","index$":0,"key$":"contents"},"created":{"type":"string","description":"created date of the field","format":"date-time","readOnly":true,"key$":"created"},"updated":{"type":"string","description":"deletion date of the field","format":"date-time","readOnly":true,"key$":"updated"},"multiValue":{"type":"boolean","description":"if the field is a multi value field","readOnly":true,"key$":"multiValue"}},"description":"This represents a metadata field of a permission database","x-ref":"#/components/schemas/Metadata","index$":1}}}},"parameters":[{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":1}]},"GET /public/database/{id}/metadata":{"protocol":"http","parameters":[{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":1}]},"GET /public/database/{id}/metadata/{key}":{"protocol":"http","parameters":[{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":1},{"name":"key","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /public/database/{id}/metadata/{key}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"databaseId":{"type":"integer","description":"id of the database","format":"int32","key$":"databaseId"},"key":{"type":"string","description":"key for the field (used for the value internally - cannot be changed after creation)","key$":"key"},"label":{"type":"string","description":"label for the field (used for displaying in the interface)","key$":"label"},"type":{"type":"string","description":"the type of field","enum":["INTEGER","TEXT","ENUMERATION","BOOLEAN","DATE","INTEGER,TEXT,ENUMERATION"],"key$":"type"},"contents":{"type":"object","properties":{"rangeStart":{"type":"integer","description":"start on range for validation on INTEGER field","format":"int32","key$":"rangeStart"},"rangeEnd":{"type":"integer","description":"end on range for validation on INTEGER field","format":"int32","key$":"rangeEnd"},"values":{"type":"array","description":"Possible enumeration of values for ENUMERATION field","items":{"type":"string","description":"Possible enumeration of values for ENUMERATION field"},"key$":"values"},"validation":{"type":"string","description":"type of validation on TEXT field","enum":["NONE","EMAIL"],"key$":"validation"}},"description":"Contains extra info for a field","x-ref":"#/components/schemas/MetadataContents","index$":0,"key$":"contents"},"created":{"type":"string","description":"created date of the field","format":"date-time","readOnly":true,"key$":"created"},"updated":{"type":"string","description":"deletion date of the field","format":"date-time","readOnly":true,"key$":"updated"},"multiValue":{"type":"boolean","description":"if the field is a multi value field","readOnly":true,"key$":"multiValue"}},"description":"This represents a metadata field of a permission database","x-ref":"#/components/schemas/Metadata","index$":1}}}},"parameters":[{"name":"apiKey","in":"query","schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":1},{"name":"key","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const metadata_ref01_ent = client.Metadata()
    let metadata_ref01_data = setup.data.new.metadata['metadata_ref01']
    metadata_ref01_data['database_id'] = setup.idmap['database01']

    metadata_ref01_data = (await metadata_ref01_ent.create(metadata_ref01_data)).data()
    assert(null != metadata_ref01_data.id)


    // LIST
    const metadata_ref01_match: any = {}
    metadata_ref01_match['database_id'] = setup.idmap['database01']

    const metadata_ref01_list = (await metadata_ref01_ent.list(metadata_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(metadata_ref01_list, { id: metadata_ref01_data.id })))


    // UPDATE
    const metadata_ref01_data_up0: any = {}
    metadata_ref01_data_up0.id = metadata_ref01_data.id
    metadata_ref01_data_up0 ['database_id'] = setup.idmap['database_id']

    const metadata_ref01_markdef_up0 = { name: 'key', value: 'Mark01-metadata_ref01_' + setup.now }
    ;(metadata_ref01_data_up0 as any)[metadata_ref01_markdef_up0.name] = metadata_ref01_markdef_up0.value

    const metadata_ref01_resdata_up0 = (await metadata_ref01_ent.update(metadata_ref01_data_up0)).data()
    assert(metadata_ref01_resdata_up0.id === metadata_ref01_data_up0.id)

    assert((metadata_ref01_resdata_up0 as any)[metadata_ref01_markdef_up0.name] === metadata_ref01_markdef_up0.value)


    // LOAD
    const metadata_ref01_match_dt0: any = {}
    metadata_ref01_match_dt0.id = metadata_ref01_data.id
    const metadata_ref01_data_dt0 = (await metadata_ref01_ent.load(metadata_ref01_match_dt0)).data()
    assert(metadata_ref01_data_dt0.id === metadata_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/metadata/MetadataTestData.json')

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
    ['metadata01','metadata02','metadata03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_UMBRELLA_TEST_METADATA_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': '',
  })

  idmap = env['LM_UMBRELLA_TEST_METADATA_ENTID']

  const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_UMBRELLA_TEST_METADATA_ENTID']
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
  
