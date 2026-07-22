<?php
declare(strict_types=1);

// LmUmbrella SDK utility: result_headers

class LmUmbrellaResultHeaders
{
    public static function call(LmUmbrellaContext $ctx): ?LmUmbrellaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
