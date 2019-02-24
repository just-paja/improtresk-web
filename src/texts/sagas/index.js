import fetchText from './fetchText'
import fetchTips from './fetchTips'

export * from './fetchText'
export * from './fetchTips'

export default [
  ...fetchText,
  ...fetchTips
]
