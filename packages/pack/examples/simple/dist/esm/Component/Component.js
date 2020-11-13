export function Component() {
    if ("d312ev" === 'production') {
        // check invariant
        console.assert(false, 'Message');
    }
    return 'content';
}
if ("d312ev" === 'production') {
    // Use displayName for debug
    Component.displayName = 'Component';
}
