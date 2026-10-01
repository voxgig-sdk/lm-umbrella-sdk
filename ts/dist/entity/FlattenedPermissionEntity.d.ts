import { LmUmbrellaEntityBase } from '../LmUmbrellaEntityBase';
import type { LmUmbrellaSDK } from '../LmUmbrellaSDK';
import type { Control } from '../types';
import type { FlattenedPermission, FlattenedPermissionListMatch, FlattenedPermissionCreateData } from '../LmUmbrellaTypes';
declare class FlattenedPermissionEntity extends LmUmbrellaEntityBase<FlattenedPermission> {
    constructor(client: LmUmbrellaSDK, entopts: any);
    make(this: FlattenedPermissionEntity): FlattenedPermissionEntity;
    list(this: any, reqmatch?: FlattenedPermissionListMatch, ctrl?: Control): Promise<FlattenedPermissionEntity[]>;
    create(this: any, reqdata?: FlattenedPermissionCreateData, ctrl?: Control): Promise<FlattenedPermissionEntity>;
}
export { FlattenedPermissionEntity };
