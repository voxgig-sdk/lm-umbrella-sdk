# LmUmbrella SDK utility: make_context
require_relative '../core/context'
module LmUmbrellaUtilities
  MakeContext = ->(ctxmap, basectx) {
    LmUmbrellaContext.new(ctxmap, basectx)
  }
end
