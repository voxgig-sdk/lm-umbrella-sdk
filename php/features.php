<?php
declare(strict_types=1);

// LmUmbrella SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LmUmbrellaFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LmUmbrellaBaseFeature();
            case "test":
                return new LmUmbrellaTestFeature();
            default:
                return new LmUmbrellaBaseFeature();
        }
    }
}
