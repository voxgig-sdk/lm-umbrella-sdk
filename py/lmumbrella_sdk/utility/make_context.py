# LmUmbrella SDK utility: make_context

from lmumbrella_sdk.core.context import LmUmbrellaContext


def make_context_util(ctxmap, basectx):
    return LmUmbrellaContext(ctxmap, basectx)
