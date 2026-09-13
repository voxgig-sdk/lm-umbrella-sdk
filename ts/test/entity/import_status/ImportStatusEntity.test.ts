

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


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
      if (maybeSkipControl(t, 'entityOp', 'import_status.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID JSON to run live')
      return
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': '',
  })

  idmap = env['LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID']

  const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE

  if (live) {
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
      extra || {}
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
