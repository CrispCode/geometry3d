'use strict'

let cache = 0

export const uid = () => {
  cache++
  return cache
}
