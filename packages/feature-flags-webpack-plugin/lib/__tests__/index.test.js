"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const path_1 = require("path");
const compiler_1 = require("./internal/compiler");
console.log('>>> FeatureFlagsWebpackPlugin', index_1.default);
// TODO: тут есть пример как захватывать лог
// https://github.com/webpack/webpack/blob/master/test/ProgressPlugin.test.js
// TODO: проверить без плагина.
// const plugin = new FeatureFlagsWebpackPlugin()
function getResult(compiler) {
    return compiler.outputFileSystem.readFileSync(path_1.resolve(__dirname, 'fixtures/bundle.js'), 'utf-8');
}
describe('FeatureFlagsWebpackPlugin', () => {
    test('should inline isFeatureEnabled fn and elimination dead code', async () => {
        const { compiler } = await compiler_1.compile('./component-a.js');
        const result = getResult(compiler);
        expect(result).toMatchInlineSnapshot(`"(()=>{\\"use strict\\";console.log(\\"disabled\\")})();"`);
    });
});
