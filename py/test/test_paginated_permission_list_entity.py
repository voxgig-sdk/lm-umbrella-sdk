# PaginatedPermissionList entity test

import json
import os
import time

import pytest

from lmumbrella_sdk.utility.voxgig_struct import voxgig_struct as vs
from lmumbrella_sdk import LmUmbrellaSDK
from lmumbrella_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPaginatedPermissionListEntity:

    def test_should_create_instance(self):
        testsdk = LmUmbrellaSDK.test(None, None)
        ent = testsdk.PaginatedPermissionList(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _paginated_permission_list_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "paginated_permission_list." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        paginated_permission_list_ref01_ent = client.PaginatedPermissionList(None)
        paginated_permission_list_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.paginated_permission_list"), "paginated_permission_list_ref01"))
        paginated_permission_list_ref01_data["database_id"] = setup["idmap"]["database01"]

        paginated_permission_list_ref01_data = helpers.to_map(runner.entity_data(paginated_permission_list_ref01_ent.create(paginated_permission_list_ref01_data, None)))
        assert paginated_permission_list_ref01_data is not None



def _paginated_permission_list_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/paginated_permission_list/PaginatedPermissionListTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LmUmbrellaSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["paginated_permission_list01", "paginated_permission_list02", "paginated_permission_list03", "database01", "database02", "database03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID": idmap,
        "LM_UMBRELLA_TEST_LIVE": "FALSE",
        "LM_UMBRELLA_TEST_EXPLAIN": "FALSE",
        "LM_UMBRELLA_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("LM_UMBRELLA_TEST_PAGINATED_PERMISSION_LIST_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("LM_UMBRELLA_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("LM_UMBRELLA_APIKEY"),
            },
            extra or {},
        ])
        client = LmUmbrellaSDK(helpers.to_map(merged_opts))

    _live = env.get("LM_UMBRELLA_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LM_UMBRELLA_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
