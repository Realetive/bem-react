import { Compiler } from 'webpack';
declare type PluginOptions = {
    /**
     * Function name for match
     *
     * @default 'isFeatureEnabled'
     */
    isFeatureEnabledFnName: string;
    /**
     * Object with flags
     */
    flags: Record<string, any>;
    /**
     *
     */
    verbose?: boolean;
};
declare class FeatureFlagsWebpackPlugin {
    options: PluginOptions;
    constructor(options: PluginOptions);
    apply(compiler: Compiler): void;
}
export default FeatureFlagsWebpackPlugin;
