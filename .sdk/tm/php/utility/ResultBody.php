<?php
declare(strict_types=1);

// LmUmbrella SDK utility: result_body

class LmUmbrellaResultBody
{
    public static function call(LmUmbrellaContext $ctx): ?LmUmbrellaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
