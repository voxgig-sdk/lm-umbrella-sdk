import { DatabaseEntity } from './entity/DatabaseEntity';
import { FlatPermissionEntity } from './entity/FlatPermissionEntity';
import { FlattenedPermissionEntity } from './entity/FlattenedPermissionEntity';
import { ImportStatusEntity } from './entity/ImportStatusEntity';
import { MetadataEntity } from './entity/MetadataEntity';
import { PaginatedPermissionListEntity } from './entity/PaginatedPermissionListEntity';
import { PermissionEntity } from './entity/PermissionEntity';
import { PermissionDatabaseEntity } from './entity/PermissionDatabaseEntity';
export type * from './LmUmbrellaTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LmUmbrellaEntityBase } from './LmUmbrellaEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LmUmbrellaSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    Database(data?: any): DatabaseEntity;
    FlatPermission(data?: any): FlatPermissionEntity;
    FlattenedPermission(data?: any): FlattenedPermissionEntity;
    ImportStatus(data?: any): ImportStatusEntity;
    Metadata(data?: any): MetadataEntity;
    PaginatedPermissionList(data?: any): PaginatedPermissionListEntity;
    Permission(data?: any): PermissionEntity;
    PermissionDatabase(data?: any): PermissionDatabaseEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LmUmbrellaSDK;
    tester(testopts?: any, sdkopts?: any): LmUmbrellaSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LmUmbrellaSDK;
export { stdutil, config, BaseFeature, LmUmbrellaEntityBase, LmUmbrellaSDK, SDK, };
