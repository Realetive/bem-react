/* eslint-disable react-hooks/rules-of-hooks */
const { useCleanUpPlugin } = require('../../lib/plugins/CleanUpPlugin')
const { useTypeScriptPlugin } = require('../../lib/plugins/TypeScriptPlugin')

/**
 * @type {import('@bem-react/pack/lib/interfaces').Config}
 */
module.exports = [
  {
    output: './dist',

    plugins: [
      useCleanUpPlugin(['./dist']),

      useTypeScriptPlugin({
        replace: {
          'process.env.NODE_ENV': JSON.stringify('d312ev'),
        },
      }),
    ],
  },
  {
    output: './build',

    plugins: [
      useCleanUpPlugin(['./build']),

      useTypeScriptPlugin({
        replace: {
          'process.env.NODE_ENV': JSON.stringify('d312ev'),
        },
      }),
    ],
  },
]
