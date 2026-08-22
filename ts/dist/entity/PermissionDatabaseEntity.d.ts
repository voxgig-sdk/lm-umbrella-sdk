import { LmUmbrellaEntityBase } from '../LmUmbrellaEntityBase';
import type { LmUmbrellaSDK } from '../LmUmbrellaSDK';
import type { Control } from '../types';
import type { PermissionDatabase, PermissionDatabaseLoadMatch, PermissionDatabaseListMatch, PermissionDatabaseUpdateData } from '../LmUmbrellaTypes';
declare class PermissionDatabaseEntity extends LmUmbrellaEntityBase<PermissionDatabase> {
    constructor(client: LmUmbrellaSDK, entopts: any);
    make(this: PermissionDatabaseEntity): PermissionDatabaseEntity;
    load(this: any, reqmatch?: PermissionDatabaseLoadMatch, ctrl?: Control): Promise<PermissionDatabaseEntity>;
    list(this: any, reqmatch?: PermissionDatabaseListMatch, ctrl?: Control): Promise<PermissionDatabaseEntity[]>;
    update(this: any, reqdata?: PermissionDatabaseUpdateData, ctrl?: Control): Promise<PermissionDatabaseEntity>;
}
export { PermissionDatabaseEntity };
