# LmUmbrella SDK utility: prepare_body
require_relative 'media'
module LmUmbrellaUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return LmUmbrellaUtilities.raw_body(ctx.reqdata) if LmUmbrellaUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
