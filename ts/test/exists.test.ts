
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LmUmbrellaSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LmUmbrellaSDK.test()
    equal(testsdk instanceof LmUmbrellaSDK, true,
      'LmUmbrellaSDK.test() must return a client synchronously')
  })

})
