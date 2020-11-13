"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
function Component() {
    if ("d312ev" === 'production') {
        // check invariant
        console.assert(false, 'Message');
    }
    return 'content';
}
exports.Component = Component;
if ("d312ev" === 'production') {
    // Use displayName for debug
    Component.displayName = 'Component';
}
