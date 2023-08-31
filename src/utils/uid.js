'use strict'

let cache = 0
let lastReset = Date.now()

export default () => {
  if ( lastReset !== Date.now() ) {
    cache = 0
    lastReset = Date.now()
  }
  cache++
  return Date.now() + '-' + cache
}
