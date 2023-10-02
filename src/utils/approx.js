'use strict'

export const approx = ( num, decimals ) => {
  return parseFloat( parseFloat( num ).toFixed( decimals ) )
}
