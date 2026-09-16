

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"contents","req":false,"short":"Contains extra info for a field","type":"`$OBJECT`","index$":0},{"active":true,"format":"date-time","name":"created","readOnly":true,"req":false,"short":"created date of the field","type":"`$STRING`","index$":1},{"active":true,"format":"int32","name":"databaseId","req":false,"short":"id of the database","type":"`$INTEGER`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"key","req":false,"short":"key for the field (used for the value internally - cannot be changed after creation)","type":"`$STRING`","index$":4},{"active":true,"name":"label","req":false,"short":"label for the field (used for displaying in the interface)","type":"`$STRING`","index$":5},{"active":true,"name":"multiValue","readOnly":true,"req":false,"short":"if the field is a multi value field","type":"`$BOOLEAN`","index$":6},{"active":true,"format":"int32","name":"rangeEnd","req":false,"short":"end on range for validation on INTEGER field","type":"`$INTEGER`","index$":7},{"active":true,"format":"int32","name":"rangeStart","req":false,"short":"start on range for validation on INTEGER field","type":"`$INTEGER`","index$":8},{"active":true,"name":"type","req":false,"short":"the type of field","type":"`$STRING`","index$":9},{"active":true,"format":"date-time","name":"updated","readOnly":true,"req":false,"short":"deletion date of the field","type":"`$STRING`","index$":10},{"active":true,"name":"validation","req":false,"short":"type of validation on TEXT field","type":"`$STRING`","index$":11},{"active":true,"name":"values","req":false,"short":"Possible enumeration of values for ENUMERATION field","type":"`$ARRAY`","index$":12}],"id":{"field":"id","name":"id"},"name":"metadata","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"param","name":"id","orig":"key","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /public/database/{id}/metadata/{key}","json":"{\"operationId\":\"delete_1\",\"parameters\":[{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful operation\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Metadata not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/public/database/{id}/metadata/{key}","rename":{"param":{"id":"database_id","key":"id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"},{"var":"id"}],"select":{"exist":["api_key","database_id","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /public/database/{id}/metadata","json":"{\"operationId\":\"save\",\"parameters\":[{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"This represents a metadata field of a permission database\",\"properties\":{\"contents\":{\"description\":\"Contains extra info for a field\",\"properties\":{\"rangeEnd\":{\"description\":\"end on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"rangeStart\":{\"description\":\"start on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"validation\":{\"description\":\"type of validation on TEXT field\",\"enum\":[\"NONE\",\"EMAIL\"],\"type\":\"string\"},\"values\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"items\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"created\":{\"description\":\"created date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"databaseId\":{\"description\":\"id of the database\",\"format\":\"int32\",\"type\":\"integer\"},\"key\":{\"description\":\"key for the field (used for the value internally - cannot be changed after creation)\",\"type\":\"string\"},\"label\":{\"description\":\"label for the field (used for displaying in the interface)\",\"type\":\"string\"},\"multiValue\":{\"description\":\"if the field is a multi value field\",\"readOnly\":true,\"type\":\"boolean\"},\"type\":{\"description\":\"the type of field\",\"enum\":[\"INTEGER\",\"TEXT\",\"ENUMERATION\",\"BOOLEAN\",\"DATE\",\"INTEGER,TEXT,ENUMERATION\"],\"type\":\"string\"},\"updated\":{\"description\":\"deletion date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"This represents a metadata field of a permission database\",\"properties\":{\"contents\":{\"description\":\"Contains extra info for a field\",\"properties\":{\"rangeEnd\":{\"description\":\"end on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"rangeStart\":{\"description\":\"start on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"validation\":{\"description\":\"type of validation on TEXT field\",\"enum\":[\"NONE\",\"EMAIL\"],\"type\":\"string\"},\"values\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"items\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"created\":{\"description\":\"created date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"databaseId\":{\"description\":\"id of the database\",\"format\":\"int32\",\"type\":\"integer\"},\"key\":{\"description\":\"key for the field (used for the value internally - cannot be changed after creation)\",\"type\":\"string\"},\"label\":{\"description\":\"label for the field (used for displaying in the interface)\",\"type\":\"string\"},\"multiValue\":{\"description\":\"if the field is a multi value field\",\"readOnly\":true,\"type\":\"boolean\"},\"type\":{\"description\":\"the type of field\",\"enum\":[\"INTEGER\",\"TEXT\",\"ENUMERATION\",\"BOOLEAN\",\"DATE\",\"INTEGER,TEXT,ENUMERATION\"],\"type\":\"string\"},\"updated\":{\"description\":\"deletion date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"result of a validation\",\"properties\":{\"errors\":{\"description\":\"list of errors after validation\",\"items\":{\"description\":\"represents an error\",\"properties\":{\"code\":{\"description\":\"code for error\",\"type\":\"string\"},\"message\":{\"description\":\"human friendly error message\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"description\":\"relevant properties for error\",\"type\":\"string\"},\"description\":\"relevant properties for error\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"One or more parameters missing or invalid\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Metadata not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/public/database/{id}/metadata","rename":{"param":{"id":"database_id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"}],"select":{"exist":["api_key","database_id"]},"transform":{"req":"`reqdata`","res":"`body.contents`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /public/database/{id}/metadata","json":"{\"operationId\":\"list_1\",\"parameters\":[{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"This represents a metadata field of a permission database\",\"properties\":{\"contents\":{\"description\":\"Contains extra info for a field\",\"properties\":{\"rangeEnd\":{\"description\":\"end on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"rangeStart\":{\"description\":\"start on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"validation\":{\"description\":\"type of validation on TEXT field\",\"enum\":[\"NONE\",\"EMAIL\"],\"type\":\"string\"},\"values\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"items\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"created\":{\"description\":\"created date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"databaseId\":{\"description\":\"id of the database\",\"format\":\"int32\",\"type\":\"integer\"},\"key\":{\"description\":\"key for the field (used for the value internally - cannot be changed after creation)\",\"type\":\"string\"},\"label\":{\"description\":\"label for the field (used for displaying in the interface)\",\"type\":\"string\"},\"multiValue\":{\"description\":\"if the field is a multi value field\",\"readOnly\":true,\"type\":\"boolean\"},\"type\":{\"description\":\"the type of field\",\"enum\":[\"INTEGER\",\"TEXT\",\"ENUMERATION\",\"BOOLEAN\",\"DATE\",\"INTEGER,TEXT,ENUMERATION\"],\"type\":\"string\"},\"updated\":{\"description\":\"deletion date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Metadata not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/database/{id}/metadata","rename":{"param":{"id":"database_id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"}],"select":{"exist":["api_key","database_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"param","name":"id","orig":"key","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /public/database/{id}/metadata/{key}","json":"{\"operationId\":\"get_1\",\"parameters\":[{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"This represents a metadata field of a permission database\",\"properties\":{\"contents\":{\"description\":\"Contains extra info for a field\",\"properties\":{\"rangeEnd\":{\"description\":\"end on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"rangeStart\":{\"description\":\"start on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"validation\":{\"description\":\"type of validation on TEXT field\",\"enum\":[\"NONE\",\"EMAIL\"],\"type\":\"string\"},\"values\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"items\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"created\":{\"description\":\"created date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"databaseId\":{\"description\":\"id of the database\",\"format\":\"int32\",\"type\":\"integer\"},\"key\":{\"description\":\"key for the field (used for the value internally - cannot be changed after creation)\",\"type\":\"string\"},\"label\":{\"description\":\"label for the field (used for displaying in the interface)\",\"type\":\"string\"},\"multiValue\":{\"description\":\"if the field is a multi value field\",\"readOnly\":true,\"type\":\"boolean\"},\"type\":{\"description\":\"the type of field\",\"enum\":[\"INTEGER\",\"TEXT\",\"ENUMERATION\",\"BOOLEAN\",\"DATE\",\"INTEGER,TEXT,ENUMERATION\"],\"type\":\"string\"},\"updated\":{\"description\":\"deletion date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Metadata not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/database/{id}/metadata/{key}","rename":{"param":{"id":"database_id","key":"id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"},{"var":"id"}],"select":{"exist":["api_key","database_id","id"]},"transform":{"req":"`reqdata`","res":"`body.contents`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"param","name":"id","orig":"key","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /public/database/{id}/metadata/{key}","json":"{\"operationId\":\"update_1\",\"parameters\":[{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"This represents a metadata field of a permission database\",\"properties\":{\"contents\":{\"description\":\"Contains extra info for a field\",\"properties\":{\"rangeEnd\":{\"description\":\"end on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"rangeStart\":{\"description\":\"start on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"validation\":{\"description\":\"type of validation on TEXT field\",\"enum\":[\"NONE\",\"EMAIL\"],\"type\":\"string\"},\"values\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"items\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"created\":{\"description\":\"created date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"databaseId\":{\"description\":\"id of the database\",\"format\":\"int32\",\"type\":\"integer\"},\"key\":{\"description\":\"key for the field (used for the value internally - cannot be changed after creation)\",\"type\":\"string\"},\"label\":{\"description\":\"label for the field (used for displaying in the interface)\",\"type\":\"string\"},\"multiValue\":{\"description\":\"if the field is a multi value field\",\"readOnly\":true,\"type\":\"boolean\"},\"type\":{\"description\":\"the type of field\",\"enum\":[\"INTEGER\",\"TEXT\",\"ENUMERATION\",\"BOOLEAN\",\"DATE\",\"INTEGER,TEXT,ENUMERATION\"],\"type\":\"string\"},\"updated\":{\"description\":\"deletion date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"This represents a metadata field of a permission database\",\"properties\":{\"contents\":{\"description\":\"Contains extra info for a field\",\"properties\":{\"rangeEnd\":{\"description\":\"end on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"rangeStart\":{\"description\":\"start on range for validation on INTEGER field\",\"format\":\"int32\",\"type\":\"integer\"},\"validation\":{\"description\":\"type of validation on TEXT field\",\"enum\":[\"NONE\",\"EMAIL\"],\"type\":\"string\"},\"values\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"items\":{\"description\":\"Possible enumeration of values for ENUMERATION field\",\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"created\":{\"description\":\"created date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"databaseId\":{\"description\":\"id of the database\",\"format\":\"int32\",\"type\":\"integer\"},\"key\":{\"description\":\"key for the field (used for the value internally - cannot be changed after creation)\",\"type\":\"string\"},\"label\":{\"description\":\"label for the field (used for displaying in the interface)\",\"type\":\"string\"},\"multiValue\":{\"description\":\"if the field is a multi value field\",\"readOnly\":true,\"type\":\"boolean\"},\"type\":{\"description\":\"the type of field\",\"enum\":[\"INTEGER\",\"TEXT\",\"ENUMERATION\",\"BOOLEAN\",\"DATE\",\"INTEGER,TEXT,ENUMERATION\"],\"type\":\"string\"},\"updated\":{\"description\":\"deletion date of the field\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"401\":{\"description\":\"The request is not allowed\"},\"404\":{\"description\":\"Metadata not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/public/database/{id}/metadata/{key}","rename":{"param":{"id":"database_id","key":"id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"metadata"},{"var":"id"}],"select":{"exist":["api_key","database_id","id"]},"transform":{"req":"`reqdata`","res":"`body.contents`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["database"]]},"key$":"metadata","name__orig":"metadata","Name":"Metadata","name_":"metadata","name-":"metadata","NAME":"METADATA","index$":4}, {"active":true,"entity":"metadata","key$":"BasicMetadataFlow","kind":"basic","name":"BasicMetadataFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"metadata_ref01"},"match":{"database_id":"database01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"database_id":"database01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"metadata_ref01"}}],"index$":1},{"active":true,"data":{"database_id":"database01"},"input":{"ref":"metadata_ref01","srcdatavar":"metadata_ref01_data","suffix":"_up0","textfield":"key"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-metadata_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"metadata_ref01","srcdatavar":"metadata_ref01_data","suffix":"_dt0"},"match":{"database_id":"database01","id":"metadata01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-metadata_ref01"}}],"index$":3}]}, 'Metadata')
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
  
