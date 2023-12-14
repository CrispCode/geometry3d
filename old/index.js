/* globals describe, it */

import assert from 'assert'
import {
  Grid,

  Plane,
  Quaternion,
  Triangle,
  Vector,

  Box,
  Polyhedron,
  Sphere
} from './../src/index.js'

describe( 'export', () => {
  it( 'should export the Grid class', ( next ) => {
    assert.ok( typeof Grid === 'function' )
    next()
  } )

  it( 'should export the Plane function', ( next ) => {
    assert.ok( typeof Plane === 'function' )
    next()
  } )

  it( 'should export the Quaternion function', ( next ) => {
    assert.ok( typeof Quaternion === 'function' )
    next()
  } )

  it( 'should export the Triangle function', ( next ) => {
    assert.ok( typeof Triangle === 'function' )
    next()
  } )

  it( 'should export the Vector function', ( next ) => {
    assert.ok( typeof Vector === 'function' )
    next()
  } )

  it( 'should export the Box class', ( next ) => {
    assert.ok( typeof Box === 'function' )
    next()
  } )

  it( 'should export the Polyhedron class', ( next ) => {
    assert.ok( typeof Polyhedron === 'function' )
    next()
  } )

  it( 'should export the Sphere class', ( next ) => {
    assert.ok( typeof Sphere === 'function' )
    next()
  } )
} )
