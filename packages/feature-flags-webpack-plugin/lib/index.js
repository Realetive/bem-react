"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FeatureFlagsWebpackPlugin {
    constructor(options) {
        this.options = options;
        Object.assign(this.options, { isFeatureEnabledFnName: 'isFeatureEnabled' });
        // TODO: validate for undefined
        if (this.options.verbose) {
            console.log('> flags');
            console.log(Object.keys(this.options.flags).join('\n'));
        }
    }
    apply(compiler) {
        const { isFeatureEnabledFnName, flags } = this.options;
        function onCallExpression(expression, parser) {
            if (isFeatureFlagFunction(expression, isFeatureEnabledFnName)) {
                const argument = expression.arguments[0];
                if (isIdentifier(argument)) {
                    const isEnabled = flags[argument.name] !== undefined;
                    const result = isEnabled ? parser.evaluate(true) : parser.evaluate(false);
                    if (result !== undefined) {
                        result.setRange(expression.range);
                    }
                    return result;
                }
            }
            return undefined;
        }
        function onParseJavascript(parser) {
            parser.hooks.evaluate
                .for('CallExpression')
                .tap('FeatureFlagsWebpackPlugin', (expression) => onCallExpression(expression, parser));
        }
        function onThisCompilation(_compilation, compilationParams) {
            compilationParams.normalModuleFactory.hooks.parser
                .for('javascript/auto')
                .tap('FeatureFlagsWebpackPlugin', onParseJavascript);
        }
        compiler.hooks.thisCompilation.tap('FeatureFlagsWebpackPlugin', onThisCompilation);
    }
}
function isFeatureFlagFunction(expression, isFeatureEnabledFnName) {
    // prettier-ignore
    return (expression.type === 'CallExpression'
        && expression.arguments.length > 0
        && expression.callee.type === 'Identifier'
        && expression.callee.name === isFeatureEnabledFnName);
}
function isIdentifier(expression) {
    return expression.type === 'Identifier';
}
exports.default = FeatureFlagsWebpackPlugin;
module.exports = FeatureFlagsWebpackPlugin;
