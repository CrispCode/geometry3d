'use strict'

export default ( num, decimals ) => {
  return parseFloat( parseFloat( num ).toFixed( decimals ) )
}
