
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { LmUmbrellaSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ImportStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LMUMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LMUMBRELLA_TEST_LIVE'))

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

    import_status_ref01_data = await import_status_ref01_ent.create(import_status_ref01_data)
    assert(null != import_status_ref01_data)


    // LIST
    const import_status_ref01_match: any = {}
    import_status_ref01_match['database_id'] = setup.idmap['database01']

    const import_status_ref01_list = await import_status_ref01_ent.list(import_status_ref01_match)

    assert(!isempty(select(import_status_ref01_list, { id: import_status_ref01_data.id })))


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
    'LM_UMBRELLA_APIKEY': 'NONE',
  })

  idmap = env['LM_UMBRELLA_TEST_IMPORT_STATUS_ENTID']

  const live = 'TRUE' === env.LM_UMBRELLA_TEST_LIVE

  if (live) {
    client = new LmUmbrellaSDK(merge([
      {
        apikey: env.LM_UMBRELLA_APIKEY,
      },
      extra
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
  
