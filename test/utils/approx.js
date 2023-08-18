/* globals describe, it */

import assert from 'assert'
import approx from './../../src/utils/approx.js'

describe( 'utils.approx', () => {
  it( 'should approximate a positive float by any number of digits specified', ( next ) => {
    assert.ok( approx( Math.PI, 10 ) === 3.1415926536 )
    next()
  } )

  it( 'should approximate a negative float by any number of digits specified', ( next ) => {
    assert.ok( approx( -1 * Math.PI, 10 ) === -3.1415926536 )
    next()
  } )

  it( 'should approximate 0 to 0', ( next ) => {
    assert.ok( approx( 0, 5 ) === 0 )
    next()
  } )

  it( 'should approximate a number with weird float point issues', ( next ) => {
    const numberWithE = 0.01 + 2.03
    assert.ok( approx( numberWithE, 5 ) === 2.04 )
    next()
  } )

  it( 'should approximate an exponential number', ( next ) => {
    const n = 77.1234
    const e = n.toExponential( 4 )
    assert.ok( approx( e, 7 ) === 77.123 )
    next()
  } )
} )
