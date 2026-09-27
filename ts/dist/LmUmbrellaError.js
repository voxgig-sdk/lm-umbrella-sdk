"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LmUmbrellaError = void 0;
class LmUmbrellaError extends Error {
    isLmUmbrellaError = true;
    sdk = 'LmUmbrella';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.LmUmbrellaError = LmUmbrellaError;
//# sourceMappingURL=LmUmbrellaError.js.map