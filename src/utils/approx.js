'use strict'

/**
 * @ignore
 * Used to approximate a number to a certain number of decimals
 * @param {Numeric} num The number to be approximated
 * @param {Numeric} decimals The number of decimals to approximate to
 * @return {Numeric} A new number
 */
export default ( num, decimals ) => {
  return parseFloat( parseFloat( num ).toFixed( decimals ) )
}
