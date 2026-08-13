import { LmUmbrellaEntityBase } from '../LmUmbrellaEntityBase';
import type { LmUmbrellaSDK } from '../LmUmbrellaSDK';
import type { Control } from '../types';
import type { PaginatedPermissionList, PaginatedPermissionListCreateData } from '../LmUmbrellaTypes';
declare class PaginatedPermissionListEntity extends LmUmbrellaEntityBase<PaginatedPermissionList> {
    constructor(client: LmUmbrellaSDK, entopts: any);
    make(this: PaginatedPermissionListEntity): PaginatedPermissionListEntity;
    create(this: any, reqdata?: PaginatedPermissionListCreateData, ctrl?: Control): Promise<PaginatedPermissionList>;
}
export { PaginatedPermissionListEntity };
