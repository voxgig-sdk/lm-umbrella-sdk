# LmUmbrella SDK feature factory

from feature.base_feature import LmUmbrellaBaseFeature
from feature.test_feature import LmUmbrellaTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LmUmbrellaBaseFeature(),
        "test": lambda: LmUmbrellaTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
