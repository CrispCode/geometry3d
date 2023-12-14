'use strict'

import { describe, it } from 'node:test'
import assert from 'node:assert'

import { approx } from './../../src/utils/approx.js'

describe( 'utils.approx', () => {
  it( 'should approximate a positive float by any number of digits specified', () => {
    assert.ok( approx( Math.PI, 10 ) === 3.1415926536 )
  } )

  it( 'should approximate a negative float by any number of digits specified', () => {
    assert.ok( approx( -1 * Math.PI, 10 ) === -3.1415926536 )
  } )

  it( 'should approximate 0 to 0', () => {
    assert.ok( approx( 0, 5 ) === 0 )
  } )

  it( 'should approximate a number with weird float point issues', () => {
    const numberWithE = 0.01 + 2.03
    assert.ok( approx( numberWithE, 5 ) === 2.04 )
  } )

  it( 'should approximate an exponential number', () => {
    const n = 77.1234
    const e = n.toExponential( 2 )
    assert.ok( approx( e, 7 ) === approx( n, 1 ) )
  } )
} )
