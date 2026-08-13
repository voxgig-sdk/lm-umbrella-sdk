import { LmUmbrellaEntityBase } from '../LmUmbrellaEntityBase';
import type { LmUmbrellaSDK } from '../LmUmbrellaSDK';
import type { Control } from '../types';
import type { Permission, PermissionUpdateData, PermissionRemoveMatch } from '../LmUmbrellaTypes';
declare class PermissionEntity extends LmUmbrellaEntityBase<Permission> {
    constructor(client: LmUmbrellaSDK, entopts: any);
    make(this: PermissionEntity): PermissionEntity;
    update(this: any, reqdata?: PermissionUpdateData, ctrl?: Control): Promise<Permission>;
    remove(this: any, reqmatch?: PermissionRemoveMatch, ctrl?: Control): Promise<Permission>;
}
export { PermissionEntity };
