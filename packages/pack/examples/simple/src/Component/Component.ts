export function Component() {
  if (process.env.NODE_ENV === 'production') {
    // check invariant
    console.assert(false, 'Message')
  }
  return 'content'
}

if (process.env.NODE_ENV === 'production') {
  // Use displayName for debug
  Component.displayName = 'Component'
}

function foo(_value: string): void {}

foo(10)
