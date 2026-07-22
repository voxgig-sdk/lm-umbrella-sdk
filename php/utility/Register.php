<?php
declare(strict_types=1);

// LmUmbrella SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

LmUmbrellaUtility::setRegistrar(function (LmUmbrellaUtility $u): void {
    $u->clean = [LmUmbrellaClean::class, 'call'];
    $u->done = [LmUmbrellaDone::class, 'call'];
    $u->make_error = [LmUmbrellaMakeError::class, 'call'];
    $u->feature_add = [LmUmbrellaFeatureAdd::class, 'call'];
    $u->feature_hook = [LmUmbrellaFeatureHook::class, 'call'];
    $u->feature_init = [LmUmbrellaFeatureInit::class, 'call'];
    $u->fetcher = [LmUmbrellaFetcher::class, 'call'];
    $u->make_fetch_def = [LmUmbrellaMakeFetchDef::class, 'call'];
    $u->make_context = [LmUmbrellaMakeContext::class, 'call'];
    $u->make_options = [LmUmbrellaMakeOptions::class, 'call'];
    $u->make_request = [LmUmbrellaMakeRequest::class, 'call'];
    $u->make_response = [LmUmbrellaMakeResponse::class, 'call'];
    $u->make_result = [LmUmbrellaMakeResult::class, 'call'];
    $u->make_point = [LmUmbrellaMakePoint::class, 'call'];
    $u->make_spec = [LmUmbrellaMakeSpec::class, 'call'];
    $u->make_url = [LmUmbrellaMakeUrl::class, 'call'];
    $u->param = [LmUmbrellaParam::class, 'call'];
    $u->prepare_auth = [LmUmbrellaPrepareAuth::class, 'call'];
    $u->prepare_body = [LmUmbrellaPrepareBody::class, 'call'];
    $u->prepare_headers = [LmUmbrellaPrepareHeaders::class, 'call'];
    $u->prepare_method = [LmUmbrellaPrepareMethod::class, 'call'];
    $u->prepare_params = [LmUmbrellaPrepareParams::class, 'call'];
    $u->prepare_path = [LmUmbrellaPreparePath::class, 'call'];
    $u->prepare_query = [LmUmbrellaPrepareQuery::class, 'call'];
    $u->result_basic = [LmUmbrellaResultBasic::class, 'call'];
    $u->result_body = [LmUmbrellaResultBody::class, 'call'];
    $u->result_headers = [LmUmbrellaResultHeaders::class, 'call'];
    $u->transform_request = [LmUmbrellaTransformRequest::class, 'call'];
    $u->transform_response = [LmUmbrellaTransformResponse::class, 'call'];
});
