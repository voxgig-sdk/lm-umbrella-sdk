# LmUmbrella SDK utility: make_context

from projectname_sdk.core.context import LmUmbrellaContext


def make_context_util(ctxmap, basectx):
    return LmUmbrellaContext(ctxmap, basectx)
