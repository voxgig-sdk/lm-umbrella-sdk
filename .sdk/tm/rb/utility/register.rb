# LmUmbrella SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LmUmbrellaUtility.registrar = ->(u) {
  u.clean = LmUmbrellaUtilities::Clean
  u.done = LmUmbrellaUtilities::Done
  u.make_error = LmUmbrellaUtilities::MakeError
  u.feature_add = LmUmbrellaUtilities::FeatureAdd
  u.feature_hook = LmUmbrellaUtilities::FeatureHook
  u.feature_init = LmUmbrellaUtilities::FeatureInit
  u.fetcher = LmUmbrellaUtilities::Fetcher
  u.make_fetch_def = LmUmbrellaUtilities::MakeFetchDef
  u.make_context = LmUmbrellaUtilities::MakeContext
  u.make_options = LmUmbrellaUtilities::MakeOptions
  u.make_request = LmUmbrellaUtilities::MakeRequest
  u.make_response = LmUmbrellaUtilities::MakeResponse
  u.make_result = LmUmbrellaUtilities::MakeResult
  u.make_point = LmUmbrellaUtilities::MakePoint
  u.make_spec = LmUmbrellaUtilities::MakeSpec
  u.make_url = LmUmbrellaUtilities::MakeUrl
  u.param = LmUmbrellaUtilities::Param
  u.prepare_auth = LmUmbrellaUtilities::PrepareAuth
  u.prepare_body = LmUmbrellaUtilities::PrepareBody
  u.prepare_headers = LmUmbrellaUtilities::PrepareHeaders
  u.prepare_method = LmUmbrellaUtilities::PrepareMethod
  u.prepare_params = LmUmbrellaUtilities::PrepareParams
  u.prepare_path = LmUmbrellaUtilities::PreparePath
  u.prepare_query = LmUmbrellaUtilities::PrepareQuery
  u.result_basic = LmUmbrellaUtilities::ResultBasic
  u.result_body = LmUmbrellaUtilities::ResultBody
  u.result_headers = LmUmbrellaUtilities::ResultHeaders
  u.transform_request = LmUmbrellaUtilities::TransformRequest
  u.transform_response = LmUmbrellaUtilities::TransformResponse
}
