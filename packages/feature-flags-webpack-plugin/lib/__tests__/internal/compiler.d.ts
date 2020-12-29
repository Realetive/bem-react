import { WebpackPluginInstance } from 'webpack';
declare type Options = {
    plugins?: WebpackPluginInstance[];
};
export declare function compile(fixture: string, options?: Options): Promise<any>;
export {};
