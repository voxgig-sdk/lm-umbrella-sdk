# LmUmbrella SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LmUmbrellaFeatures
  def self.make_feature(name)
    case name
    when "base"
      LmUmbrellaBaseFeature.new
    when "debug"
      LmUmbrellaDebugFeature.new
    when "idempotency"
      LmUmbrellaIdempotencyFeature.new
    when "metrics"
      LmUmbrellaMetricsFeature.new
    when "paging"
      LmUmbrellaPagingFeature.new
    when "ratelimit"
      LmUmbrellaRatelimitFeature.new
    when "retry"
      LmUmbrellaRetryFeature.new
    when "test"
      LmUmbrellaTestFeature.new
    when "timeout"
      LmUmbrellaTimeoutFeature.new
    else
      LmUmbrellaBaseFeature.new
    end
  end
end
