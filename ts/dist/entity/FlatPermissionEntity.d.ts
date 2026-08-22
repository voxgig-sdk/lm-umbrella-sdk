import { LmUmbrellaEntityBase } from '../LmUmbrellaEntityBase';
import type { LmUmbrellaSDK } from '../LmUmbrellaSDK';
import type { Control } from '../types';
import type { FlatPermission, FlatPermissionLoadMatch } from '../LmUmbrellaTypes';
declare class FlatPermissionEntity extends LmUmbrellaEntityBase<FlatPermission> {
    constructor(client: LmUmbrellaSDK, entopts: any);
    make(this: FlatPermissionEntity): FlatPermissionEntity;
    load(this: any, reqmatch?: FlatPermissionLoadMatch, ctrl?: Control): Promise<FlatPermissionEntity>;
}
export { FlatPermissionEntity };
