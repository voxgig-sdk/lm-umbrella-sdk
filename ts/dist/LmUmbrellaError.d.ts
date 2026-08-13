import { Context } from './Context';
declare class LmUmbrellaError extends Error {
    isLmUmbrellaError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    constructor(code: string, msg: string, ctx: Context);
}
export { LmUmbrellaError };
