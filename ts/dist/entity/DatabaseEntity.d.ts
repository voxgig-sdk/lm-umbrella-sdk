import { LmUmbrellaEntityBase } from '../LmUmbrellaEntityBase';
import type { LmUmbrellaSDK } from '../LmUmbrellaSDK';
import type { Control } from '../types';
import type { Database, DatabaseRemoveMatch } from '../LmUmbrellaTypes';
declare class DatabaseEntity extends LmUmbrellaEntityBase<Database> {
    constructor(client: LmUmbrellaSDK, entopts: any);
    make(this: DatabaseEntity): DatabaseEntity;
    remove(this: any, reqmatch?: DatabaseRemoveMatch, ctrl?: Control): Promise<Database>;
}
export { DatabaseEntity };
