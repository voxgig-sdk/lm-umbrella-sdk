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
    _rawRequest(fetchargs?: any): Promise<Error | {
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
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Database(entopts?: Record<string, any>): DatabaseEntity;
    FlatPermission(entopts?: Record<string, any>): FlatPermissionEntity;
    FlattenedPermission(entopts?: Record<string, any>): FlattenedPermissionEntity;
    ImportStatus(entopts?: Record<string, any>): ImportStatusEntity;
    Metadata(entopts?: Record<string, any>): MetadataEntity;
    PaginatedPermissionList(entopts?: Record<string, any>): PaginatedPermissionListEntity;
    Permission(entopts?: Record<string, any>): PermissionEntity;
    PermissionDatabase(entopts?: Record<string, any>): PermissionDatabaseEntity;
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
