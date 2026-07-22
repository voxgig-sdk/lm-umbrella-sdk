# ProjectName SDK exists test

import pytest
from lmumbrella_sdk import LmUmbrellaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LmUmbrellaSDK.test(None, None)
        assert testsdk is not None
