
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LmUmbrellaSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await LmUmbrellaSDK.test()
    equal(null !== testsdk, true)
  })

})
