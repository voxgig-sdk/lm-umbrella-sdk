<?php
declare(strict_types=1);

// LmUmbrella SDK exists test

require_once __DIR__ . '/../lmumbrella_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = LmUmbrellaSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
