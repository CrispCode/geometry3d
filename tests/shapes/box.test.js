'use strict'

import { describe, it } from 'node:test'
import assert from 'node:assert'

import { Box } from './../../src/shapes/box.js'
import { Vector } from './../../src/math/vector.js'

describe( 'shapes.Box', () => {
  it( 'should create a box polyhedron from width, height, depth', () => {
    const box = new Box( 2, 2, 2 )
    assert.ok( Vector.isEqual( box.boundsMin, Vector.create( -1, -1, -1 ) ) )
    assert.ok( Vector.isEqual( box.boundsMax, Vector.create( 1, 1, 1 ) ) )
    assert.ok( box.worldVertices.length === 8 )
    assert.ok( box.faces.length === 12 * 3 )
  } )

  it( 'should resize a box without repercursions', () => {
    const box = new Box( 2, 2, 2 )
    assert.ok( Vector.isEqual( box.boundsMin, Vector.create( -1, -1, -1 ) ) )
    assert.ok( Vector.isEqual( box.boundsMax, Vector.create( 1, 1, 1 ) ) )
    assert.ok( box.worldVertices.length === 8 )
    assert.ok( box.faces.length === 12 * 3 )

    box.resize( 4, 4, 4 )
    assert.ok( Vector.isEqual( box.boundsMin, Vector.create( -2, -2, -2 ) ) )
    assert.ok( Vector.isEqual( box.boundsMax, Vector.create( 2, 2, 2 ) ) )
    assert.ok( box.worldVertices.length === 8 )
    assert.ok( box.faces.length === 12 * 3 )
  } )
} )
