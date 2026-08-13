import { BaseFeature } from './feature/base/BaseFeature';
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    main: {
        name: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            database: {};
            flat_permission: {};
            flattened_permission: {};
            import_status: {};
            metadata: {};
            paginated_permission_list: {};
            permission: {};
            permission_database: {};
        };
    };
    entity: {
        database: {
            fields: never[];
            name: string;
            op: {
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        flat_permission: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                                msisdn: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        flattened_permission: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                                msisdn: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        import_status: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: ({
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                example?: undefined;
                            } | {
                                active: boolean;
                                example: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            })[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        metadata: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: ({
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                                key: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    } | {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                                key?: undefined;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    })[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                                key: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                                key: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        paginated_permission_list: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        permission: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                remove: {
                    input: string;
                    name: string;
                    points: ({
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                                msisdn: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    } | {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                                msisdn?: undefined;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    })[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                id: string;
                                msisdn: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        permission_database: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
    };
}
declare const config: Config;
export { config };
