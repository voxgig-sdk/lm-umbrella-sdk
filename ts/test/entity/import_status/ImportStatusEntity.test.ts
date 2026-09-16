

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"errors","req":false,"short":"Import errors (List of ImportError)","type":"`$ARRAY`","index$":0},{"active":true,"name":"importId","req":false,"short":"Import id","type":"`$STRING`","index$":1},{"active":true,"name":"msisdn","req":false,"type":"`$STRING`","index$":2},{"active":true,"format":"int32","name":"permissionsInserted","req":false,"short":"Number of permissions inserted into database","type":"`$INTEGER`","index$":3},{"active":true,"format":"int32","name":"permissionsUpdated","req":false,"short":"Number of permissions updated in database","type":"`$INTEGER`","index$":4},{"active":true,"name":"status","req":false,"short":"Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)","type":"`$STRING`","index$":5}],"name":"import_status","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":false,"kind":"query","name":"skip_import_on_error","orig":"skip_import_on_error","reqd":false,"type":"`$BOOLEAN`","index$":1}]},"contract":{"id":"POST /public/database/{id}/permission/bulk","json":"{\"operationId\":\"bulk\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"skipImportOnError\",\"schema\":{\"default\":false,\"type\":\"boolean\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"additionalProperties\":{\"type\":\"object\"},\"properties\":{\"empty\":{\"type\":\"boolean\"},\"msisdn\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Use this model to get the import id and get the status of the import\",\"properties\":{\"errors\":{\"description\":\"Import errors (List of ImportError)\",\"items\":{\"description\":\"Import errors (List of ImportError)\",\"properties\":{\"errors\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"msisdn\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"importId\":{\"description\":\"Import id\",\"type\":\"string\"},\"permissionsInserted\":{\"description\":\"Number of permissions inserted into database\",\"format\":\"int32\",\"type\":\"integer\"},\"permissionsUpdated\":{\"description\":\"Number of permissions updated in database\",\"format\":\"int32\",\"type\":\"integer\"},\"status\":{\"description\":\"Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"result of a validation\",\"properties\":{\"errors\":{\"description\":\"list of errors after validation\",\"items\":{\"description\":\"represents an error\",\"properties\":{\"code\":{\"description\":\"code for error\",\"type\":\"string\"},\"message\":{\"description\":\"human friendly error message\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"description\":\"relevant properties for error\",\"type\":\"string\"},\"description\":\"relevant properties for error\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"One or more parameters missing or invalid\"},\"401\":{\"description\":\"The request is not allowed\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/public/database/{id}/permission/bulk","rename":{"param":{"id":"database_id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"bulk"}],"select":{"exist":["api_key","database_id","skip_import_on_error"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"database_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"api_key","orig":"api_key","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"import_id","orig":"import_id","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /public/database/{id}/permission/bulk/status","json":"{\"operationId\":\"status\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"importId\",\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"apiKey\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Use this model to get the import id and get the status of the import\",\"properties\":{\"errors\":{\"description\":\"Import errors (List of ImportError)\",\"items\":{\"description\":\"Import errors (List of ImportError)\",\"properties\":{\"errors\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"msisdn\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"importId\":{\"description\":\"Import id\",\"type\":\"string\"},\"permissionsInserted\":{\"description\":\"Number of permissions inserted into database\",\"format\":\"int32\",\"type\":\"integer\"},\"permissionsUpdated\":{\"description\":\"Number of permissions updated in database\",\"format\":\"int32\",\"type\":\"integer\"},\"status\":{\"description\":\"Import status: CREATED, VALIDATING, SAVING, DONE (FINAL), ERROR (FINAL)\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"result of a validation\",\"properties\":{\"errors\":{\"description\":\"list of errors after validation\",\"items\":{\"description\":\"represents an error\",\"properties\":{\"code\":{\"description\":\"code for error\",\"type\":\"string\"},\"message\":{\"description\":\"human friendly error message\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"description\":\"relevant properties for error\",\"type\":\"string\"},\"description\":\"relevant properties for error\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"One or more parameters missing or invalid\"},\"404\":{\"description\":\"Import not found\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"in\":\"query\",\"name\":\"apiKey\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public/database/{id}/permission/bulk/status","rename":{"param":{"id":"database_id"}},"segments":[{"lit":"public"},{"lit":"database"},{"var":"database_id"},{"lit":"permission"},{"lit":"bulk"},{"lit":"status"}],"select":{"exist":["api_key","database_id","import_id"]},"transform":{"req":"`reqdata`","res":"`body.errors`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["database"]]},"key$":"import_status","name__orig":"import_status","Name":"ImportStatus","name_":"import_status","name-":"import-status","NAME":"IMPORT_STATUS","index$":3}, {"active":true,"entity":"import_status","key$":"BasicImportStatusFlow","kind":"basic","name":"BasicImportStatusFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"import_status_ref01"},"match":{"database_id":"database01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"database_id":"database01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"import_status_ref01"}}],"index$":1}]}, 'ImportStatus')
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
  
