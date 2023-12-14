'use strict'

export const measure = ( execute, count = 10000, progress ) => {
  let total = 0
  let max = 0

  const loop = ( i = 1 ) => {
    return Promise.resolve()
      .then( () => {
        const start = performance.now()
        const result = execute()
        const end = performance.now()

        if ( result instanceof Promise ) {
          return result.then( () => {
            return performance.now() - start
          } )
        } else {
          return end - start
        }
      } )
      .then( ( duration ) => {
        total += duration
        if ( duration > max ) {
          max = duration
        }
      } )
      .then( () => {
        if ( typeof progress === 'function' ) {
          progress( i, {
            avg: total / count,
            max: max,
            count: count,
            total: total
          } )
        }
      } )
      .then( () => {
        if ( i < count ) {
          return loop( i + 1 )
        } else {
          return {
            avg: total / count,
            max: max,
            count: count,
            total: total
          }
        }
      } )
  }

  return loop()
}
