# LmUmbrella SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LmUmbrellaFeatures
  def self.make_feature(name)
    case name
    when "base"
      LmUmbrellaBaseFeature.new
    when "test"
      LmUmbrellaTestFeature.new
    else
      LmUmbrellaBaseFeature.new
    end
  end
end
