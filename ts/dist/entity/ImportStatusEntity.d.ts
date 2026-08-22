import { LmUmbrellaEntityBase } from '../LmUmbrellaEntityBase';
import type { LmUmbrellaSDK } from '../LmUmbrellaSDK';
import type { Control } from '../types';
import type { ImportStatus, ImportStatusListMatch, ImportStatusCreateData } from '../LmUmbrellaTypes';
declare class ImportStatusEntity extends LmUmbrellaEntityBase<ImportStatus> {
    constructor(client: LmUmbrellaSDK, entopts: any);
    make(this: ImportStatusEntity): ImportStatusEntity;
    list(this: any, reqmatch?: ImportStatusListMatch, ctrl?: Control): Promise<ImportStatusEntity[]>;
    create(this: any, reqdata?: ImportStatusCreateData, ctrl?: Control): Promise<ImportStatusEntity>;
}
export { ImportStatusEntity };
