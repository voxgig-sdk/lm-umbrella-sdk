import { LmUmbrellaEntityBase } from '../LmUmbrellaEntityBase';
import type { LmUmbrellaSDK } from '../LmUmbrellaSDK';
import type { Control } from '../types';
import type { FlattenedPermission, FlattenedPermissionLoadMatch, FlattenedPermissionListMatch, FlattenedPermissionCreateData } from '../LmUmbrellaTypes';
declare class FlattenedPermissionEntity extends LmUmbrellaEntityBase<FlattenedPermission> {
    constructor(client: LmUmbrellaSDK, entopts: any);
    make(this: FlattenedPermissionEntity): FlattenedPermissionEntity;
    load(this: any, reqmatch?: FlattenedPermissionLoadMatch, ctrl?: Control): Promise<FlattenedPermission>;
    list(this: any, reqmatch?: FlattenedPermissionListMatch, ctrl?: Control): Promise<FlattenedPermission[]>;
    create(this: any, reqdata?: FlattenedPermissionCreateData, ctrl?: Control): Promise<FlattenedPermission>;
}
export { FlattenedPermissionEntity };
