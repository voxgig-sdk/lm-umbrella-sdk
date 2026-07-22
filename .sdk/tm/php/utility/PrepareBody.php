<?php
declare(strict_types=1);

// LmUmbrella SDK utility: prepare_body

class LmUmbrellaPrepareBody
{
    public static function call(LmUmbrellaContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
