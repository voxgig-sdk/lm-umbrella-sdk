# LmUmbrella SDK exists test

require "minitest/autorun"
require_relative "../LmUmbrella_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LmUmbrellaSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
