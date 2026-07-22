# Permission entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from lmumbrella_sdk import LmUmbrellaSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPermissionEntity:

    def test_should_create_instance(self):
        testsdk = LmUmbrellaSDK.test(None, None)
        ent = testsdk.Permission(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _permission_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "permission." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LMUMBRELLA_TEST_PERMISSION_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        permission_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.permission")))
        permission_ref01_data = None
        if len(permission_ref01_data_raw) > 0:
            permission_ref01_data = helpers.to_map(permission_ref01_data_raw[0][1])

        # UPDATE
        permission_ref01_ent = client.Permission(None)
        permission_ref01_data_up0_up = {
            "database_id": setup["idmap"]["database_id"],
        }

        permission_ref01_markdef_up0_name = "msisdn"
        permission_ref01_markdef_up0_value = "Mark01-permission_ref01_" + str(setup["now"])
        permission_ref01_data_up0_up[permission_ref01_markdef_up0_name] = permission_ref01_markdef_up0_value

        permission_ref01_resdata_up0 = helpers.to_map(permission_ref01_ent.update(permission_ref01_data_up0_up, None))
        assert permission_ref01_resdata_up0 is not None
        assert permission_ref01_resdata_up0[permission_ref01_markdef_up0_name] == permission_ref01_markdef_up0_value



def _permission_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/permission/PermissionTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LmUmbrellaSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["permission01", "permission02", "permission03", "database01", "database02", "database03", "permanent01", "permanent02", "permanent03"],
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
        "LMUMBRELLA_TEST_PERMISSION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LMUMBRELLA_TEST_PERMISSION_ENTID": idmap,
        "LMUMBRELLA_TEST_LIVE": "FALSE",
        "LMUMBRELLA_TEST_EXPLAIN": "FALSE",
        "LMUMBRELLA_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("LMUMBRELLA_TEST_PERMISSION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("database_id") is None:
        idmap_resolved["database_id"] = idmap_resolved.get("database01")

    if env.get("LMUMBRELLA_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("LMUMBRELLA_APIKEY"),
            },
            extra or {},
        ])
        client = LmUmbrellaSDK(helpers.to_map(merged_opts))

    _live = env.get("LMUMBRELLA_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LMUMBRELLA_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
