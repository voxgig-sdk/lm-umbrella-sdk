
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


describe('PermissionDatabaseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LMUMBRELLA_TEST_LIVE=TRUE.
  afterEach(liveDelay('LMUMBRELLA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmUmbrellaSDK.test()
    const ent = testsdk.PermissionDatabase()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_UMBRELLA_TEST_LIVE
    for (const op of ['list', 'update', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'permission_database.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let permission_database_ref01_data = Object.values(setup.data.existing.permission_database)[0] as any

    // LIST
    const permission_database_ref01_ent = client.PermissionDatabase()
    const permission_database_ref01_match: any = {}

    const permission_database_ref01_list = await permission_database_ref01_ent.list(permission_database_ref01_match)


    // UPDATE
    const permission_database_ref01_data_up0: any = {}
    permission_database_ref01_data_up0.id = permission_database_ref01_data.id
    permission_database_ref01_data_up0 ['database_id'] = setup.idmap['database_id']

    const permission_database_ref01_markdef_up0 = { name: 'description', value: 'Mark01-permission_database_ref01_' + setup.now }
    ;(permission_database_ref01_data_up0 as any)[permission_database_ref01_markdef_up0.name] = permission_database_ref01_markdef_up0.value

    const permission_database_ref01_resdata_up0 = await permission_database_ref01_ent.update(permission_database_ref01_data_up0)
    assert(permission_database_ref01_resdata_up0.id === permission_database_ref01_data_up0.id)

    assert((permission_database_ref01_resdata_up0 as any)[permission_database_ref01_markdef_up0.name] === permission_database_ref01_markdef_up0.value)


    // LOAD
    const permission_database_ref01_match_dt0: any = {}
    permission_database_ref01_match_dt0.id = permission_database_ref01_data.id
    const permission_database_ref01_data_dt0 = await permission_database_ref01_ent.load(permission_database_ref01_match_dt0)
    assert(permission_database_ref01_data_dt0.id === permission_database_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/permission_database/PermissionDatabaseTestData.json')

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
    ['permission_database01','permission_database02','permission_database03'],
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
  const idmapEnvVal = process.env['LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID': idmap,
    'LM_UMBRELLA_TEST_LIVE': 'FALSE',
    'LM_UMBRELLA_TEST_EXPLAIN': 'FALSE',
    'LM_UMBRELLA_APIKEY': 'NONE',
  })

  idmap = env['LM_UMBRELLA_TEST_PERMISSION_DATABASE_ENTID']

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
  
