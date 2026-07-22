
import { Context } from './Context'


class LmUmbrellaError extends Error {

  isLmUmbrellaError = true

  sdk = 'LmUmbrella'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LmUmbrellaError
}

