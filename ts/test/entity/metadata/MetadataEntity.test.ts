
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


describe('MetadataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LMUMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LMUMBRELLA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmUmbrellaSDK.test()
    const ent = testsdk.Metadata()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'metadata.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set LM_UMBRELLA_TEST_METADATA_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const metadata_ref01_ent = client.Metadata()
    let metadata_ref01_data = setup.data.new.metadata['metadata_ref01']
    metadata_ref01_data['database_id'] = setup.idmap['database01']

    metadata_ref01_data = await metadata_ref01_ent.create(metadata_ref01_data)
    assert(null != metadata_ref01_data)


    // LIST
    const metadata_ref01_match: any = {}
    metadata_ref01_match['database_id'] = setup.idmap['database01']

    const metadata_ref01_list = await metadata_ref01_ent.list(metadata_ref01_match)

    assert(!isempty(select(metadata_ref01_list, { id: metadata_ref01_data.id })))


    // UPDATE
    const metadata_ref01_data_up0: any = {}
    metadata_ref01_data_up0 ['database_id'] = setup.idmap['database_id']

    const metadata_ref01_markdef_up0 = { name: 'created', value: 'Mark01-metadata_ref01_' + setup.now }
    ;(metadata_ref01_data_up0 as any)[metadata_ref01_markdef_up0.name] = metadata_ref01_markdef_up0.value

    const metadata_ref01_resdata_up0 = await metadata_ref01_ent.update(metadata_ref01_data_up0)
    assert(null != metadata_ref01_resdata_up0)

    assert((metadata_ref01_resdata_up0 as any)[metadata_ref01_markdef_up0.name] === metadata_ref01_markdef_up0.value)



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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['LM_UMBRELLA_TEST_METADATA_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'LM_UMBRELLA_TEST_METADATA_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': 'NONE',
  })

  idmap = env['LM_UMBRELLA_TEST_METADATA_ENTID']

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
  
