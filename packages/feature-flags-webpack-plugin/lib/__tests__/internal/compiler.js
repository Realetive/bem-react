"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const memfs_1 = require("memfs");
// TODO: getCompiler -> compile
function compile(fixture, options = {}) {
    const compiler = webpack_1.default({
        context: path_1.default.resolve(__dirname, '../fixtures'),
        mode: 'production',
        entry: fixture,
        output: {
            path: path_1.default.resolve(__dirname, '../fixtures'),
            filename: 'bundle.js',
        },
        plugins: options.plugins,
    });
    // @ts-expect-error
    compiler.outputFileSystem = memfs_1.createFsFromVolume(new memfs_1.Volume());
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err)
                reject(err);
            if (stats && stats.hasErrors())
                reject(new Error(stats.toJson().errors));
            resolve({ compiler, stats });
        });
    });
}
exports.compile = compile;
// const RunCompilerAsync = compiler =>
// 	new Promise((resolve, reject) => {
// 		compiler.run(err => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve();
// 			}
// 		});
// 	});
// export default (compiler) =>
//   new Promise((resolve, reject) => {
//     compiler.run((error, stats) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve({ stats, compiler });
//     });
//   });
