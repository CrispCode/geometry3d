'use strict'

let cache = 0

export default () => {
  cache++
  return cache
}
