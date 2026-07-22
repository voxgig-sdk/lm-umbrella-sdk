-- LmUmbrella SDK error

local LmUmbrellaError = {}
LmUmbrellaError.__index = LmUmbrellaError


function LmUmbrellaError.new(code, msg, ctx)
  local self = setmetatable({}, LmUmbrellaError)
  self.is_sdk_error = true
  self.sdk = "LmUmbrella"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LmUmbrellaError:error()
  return self.msg
end


function LmUmbrellaError:__tostring()
  return self.msg
end


return LmUmbrellaError
