# Metadata entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from lmumbrella_sdk import LmUmbrellaSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestMetadataEntity:

    def test_should_create_instance(self):
        testsdk = LmUmbrellaSDK.test(None, None)
        ent = testsdk.Metadata(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "metadata": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = LmUmbrellaSDK.test(seed, None)
        seen = list(base.Metadata(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from config import make_config
        cfg = make_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = LmUmbrellaSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Metadata(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _metadata_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "metadata." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LMUMBRELLA_TEST_METADATA_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        metadata_ref01_ent = client.Metadata(None)
        metadata_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.metadata"), "metadata_ref01"))
        metadata_ref01_data["database_id"] = setup["idmap"]["database01"]

        metadata_ref01_data = helpers.to_map(metadata_ref01_ent.create(metadata_ref01_data, None))
        assert metadata_ref01_data is not None

        # LIST
        metadata_ref01_match = {
            "database_id": setup["idmap"]["database01"],
        }

        metadata_ref01_list_result = metadata_ref01_ent.list(metadata_ref01_match, None)
        assert isinstance(metadata_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(metadata_ref01_list_result),
            {"id": metadata_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        metadata_ref01_data_up0_up = {
            "database_id": setup["idmap"]["database_id"],
        }

        metadata_ref01_markdef_up0_name = "created"
        metadata_ref01_markdef_up0_value = "Mark01-metadata_ref01_" + str(setup["now"])
        metadata_ref01_data_up0_up[metadata_ref01_markdef_up0_name] = metadata_ref01_markdef_up0_value

        metadata_ref01_resdata_up0 = helpers.to_map(metadata_ref01_ent.update(metadata_ref01_data_up0_up, None))
        assert metadata_ref01_resdata_up0 is not None
        assert metadata_ref01_resdata_up0[metadata_ref01_markdef_up0_name] == metadata_ref01_markdef_up0_value

        # LOAD
        metadata_ref01_match_dt0 = {}
        metadata_ref01_data_dt0_loaded = metadata_ref01_ent.load(metadata_ref01_match_dt0, None)
        assert metadata_ref01_data_dt0_loaded is not None



def _metadata_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/metadata/MetadataTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LmUmbrellaSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["metadata01", "metadata02", "metadata03", "database01", "database02", "database03"],
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
        "LMUMBRELLA_TEST_METADATA_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LMUMBRELLA_TEST_METADATA_ENTID": idmap,
        "LMUMBRELLA_TEST_LIVE": "FALSE",
        "LMUMBRELLA_TEST_EXPLAIN": "FALSE",
        "LMUMBRELLA_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("LMUMBRELLA_TEST_METADATA_ENTID"))
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
