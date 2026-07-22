<?php
declare(strict_types=1);

// LmUmbrella SDK base feature

class LmUmbrellaBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LmUmbrellaContext $ctx, array $options): void {}
    public function PostConstruct(LmUmbrellaContext $ctx): void {}
    public function PostConstructEntity(LmUmbrellaContext $ctx): void {}
    public function SetData(LmUmbrellaContext $ctx): void {}
    public function GetData(LmUmbrellaContext $ctx): void {}
    public function GetMatch(LmUmbrellaContext $ctx): void {}
    public function SetMatch(LmUmbrellaContext $ctx): void {}
    public function PrePoint(LmUmbrellaContext $ctx): void {}
    public function PreSpec(LmUmbrellaContext $ctx): void {}
    public function PreRequest(LmUmbrellaContext $ctx): void {}
    public function PreResponse(LmUmbrellaContext $ctx): void {}
    public function PreResult(LmUmbrellaContext $ctx): void {}
    public function PreDone(LmUmbrellaContext $ctx): void {}
    public function PreUnexpected(LmUmbrellaContext $ctx): void {}
}
