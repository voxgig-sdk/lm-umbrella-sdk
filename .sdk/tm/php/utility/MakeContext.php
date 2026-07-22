<?php
declare(strict_types=1);

// LmUmbrella SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LmUmbrellaMakeContext
{
    public static function call(array $ctxmap, ?LmUmbrellaContext $basectx): LmUmbrellaContext
    {
        return new LmUmbrellaContext($ctxmap, $basectx);
    }
}
