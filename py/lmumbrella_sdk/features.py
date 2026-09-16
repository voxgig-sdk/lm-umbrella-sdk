# LmUmbrella SDK feature factory

from lmumbrella_sdk.feature.base_feature import LmUmbrellaBaseFeature
from lmumbrella_sdk.feature.debug_feature import LmUmbrellaDebugFeature
from lmumbrella_sdk.feature.idempotency_feature import LmUmbrellaIdempotencyFeature
from lmumbrella_sdk.feature.metrics_feature import LmUmbrellaMetricsFeature
from lmumbrella_sdk.feature.paging_feature import LmUmbrellaPagingFeature
from lmumbrella_sdk.feature.ratelimit_feature import LmUmbrellaRatelimitFeature
from lmumbrella_sdk.feature.retry_feature import LmUmbrellaRetryFeature
from lmumbrella_sdk.feature.test_feature import LmUmbrellaTestFeature
from lmumbrella_sdk.feature.timeout_feature import LmUmbrellaTimeoutFeature


_FEATURES = {
    "base": lambda: LmUmbrellaBaseFeature(),
    "debug": lambda: LmUmbrellaDebugFeature(),
    "idempotency": lambda: LmUmbrellaIdempotencyFeature(),
    "metrics": lambda: LmUmbrellaMetricsFeature(),
    "paging": lambda: LmUmbrellaPagingFeature(),
    "ratelimit": lambda: LmUmbrellaRatelimitFeature(),
    "retry": lambda: LmUmbrellaRetryFeature(),
    "test": lambda: LmUmbrellaTestFeature(),
    "timeout": lambda: LmUmbrellaTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
