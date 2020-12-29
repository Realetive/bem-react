import { resolve } from 'path'
import render from 'log-update'
import chalk from 'chalk'
import { performance } from 'perf_hooks'

import { Config, HookOptions } from './interfaces'
import { wrapToPromise } from './wrapToPromise'

const steps = ['onStart', 'onBeforeRun', 'onRun', 'onAfterRun', 'onFinish']
const frames = [
  "∙∙∙",
  "●∙∙",
  "∙●∙",
  "∙∙●",
  "∙∙∙"
]

let i = 0;

// enable silinet mode for CI
// в режиме дебага отключать вывод основного лога
function create(state) {
  const colors = {
    INQUEUE: 'gray',
    RUNNING: 'yellow',
    DONE: 'green',
  }
  return Object.entries(state).map(([key, value]) => {
    return `${chalk.gray('[@bem-react/pack]')} ${chalk.cyan(value.name)}:${value.step}${chalk.gray('.....')}[${chalk[colors[value.state]](value.state)}] ${chalk.gray(`(${value.time ? value.time : value.frame})`)}`
  }).join('\n')
}

export async function tryBuild(config: Config): Promise<void> {
  config.context = config.context || process.cwd()
  const options: HookOptions = {
    context: config.context,
    output: resolve(config.context, config.output),
  }

  const state: Record<string, any> = {}
  for (const plugin of config.plugins) {
    for (const step of steps) {
      const hook = (plugin as any)[step]
      if (hook !== undefined) {
        state[plugin.name + step] = { step, name: plugin.name, state: 'INQUEUE', time: null }
      }
    }
  }

  // TODO: Catch errors from plugins and stop progress with message.
  console.log(`${chalk.gray('[@bem-react/pack]')} Start building...`)
  render(create(state))
  for (const step of steps) {
    for (const plugin of config.plugins) {
      const calls = []
      const hook = (plugin as any)[step]
      if (hook !== undefined) {
        state[plugin.name + step].state = 'RUNNING'

        const timer = setInterval(() => {
          state[plugin.name + step].frame = frames[i = ++i % frames.length]
          render(create(state))
        }, 125)

        const start = performance.now()
        calls.push(wrapToPromise(hook.bind(plugin), options))
        try {
          await Promise.all(calls)
          const end = performance.now()
          const time = `${((end - start) / 1000).toFixed(2)}s`

          clearInterval(timer)
          state[plugin.name + step].state = 'DONE'
          state[plugin.name + step].time = time

          render(create(state))
        } catch (_err) {
          // console.log('')
        } finally {
          render('')
          clearInterval(timer)
        }
      }
    }
  }
  // total time
  // console.log(`${chalk.gray('[@bem-react/pack]')} ${chalk.green('Building complete!')}`)
}
