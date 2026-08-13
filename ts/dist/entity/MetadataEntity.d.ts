import { LmUmbrellaEntityBase } from '../LmUmbrellaEntityBase';
import type { LmUmbrellaSDK } from '../LmUmbrellaSDK';
import type { Control } from '../types';
import type { Metadata, MetadataLoadMatch, MetadataListMatch, MetadataCreateData, MetadataUpdateData } from '../LmUmbrellaTypes';
declare class MetadataEntity extends LmUmbrellaEntityBase<Metadata> {
    constructor(client: LmUmbrellaSDK, entopts: any);
    make(this: MetadataEntity): MetadataEntity;
    load(this: any, reqmatch?: MetadataLoadMatch, ctrl?: Control): Promise<Metadata>;
    list(this: any, reqmatch?: MetadataListMatch, ctrl?: Control): Promise<Metadata[]>;
    create(this: any, reqdata?: MetadataCreateData, ctrl?: Control): Promise<Metadata>;
    update(this: any, reqdata?: MetadataUpdateData, ctrl?: Control): Promise<Metadata>;
}
export { MetadataEntity };
