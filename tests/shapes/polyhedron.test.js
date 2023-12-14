'use strict'

import { describe, it } from 'node:test'
import assert from 'node:assert'

import { Polyhedron } from './../../src/shapes/polyhedron.js'
import { Vector } from './../../src/math/vector.js'
import { Quaternion } from './../../src/math/quaternion.js'

describe( 'shapes.Polyhedron', () => {
  it( '.vertices should not be altered by transformations', () => {
    const v1 = Vector.create( 0, 0, 0 )
    const v2 = Vector.create( 2, 0, 0 )
    const v3 = Vector.create( 1, 1, 0 )
    const v4 = Vector.create( 1, 0, 1 )
    const polyhedron = new Polyhedron()
    polyhedron.vertices = [
      v1, v2, v3,
      v1, v2, v4
    ]
    polyhedron.scale = 2
    polyhedron.rotation = Quaternion.fromAxisAngle( Vector.create( 1, 0, 0 ), Math.PI / 2 )
    assert.ok( Vector.isEqual( polyhedron.vertices[ 0 ], v1 ) )
    assert.ok( Vector.isEqual( polyhedron.vertices[ 1 ], v2 ) )
    assert.ok( Vector.isEqual( polyhedron.vertices[ 2 ], v3 ) )
    assert.ok( Vector.isEqual( polyhedron.vertices[ 3 ], v4 ) )
  } )

  it( '.faces should be a array of indexes', () => {
    const v1 = Vector.create( 0, 0, 0 )
    const v2 = Vector.create( 2, 0, 0 )
    const v3 = Vector.create( 1, 1, 0 )
    const v4 = Vector.create( 1, 1, 1 )
    const polyhedron = new Polyhedron( [
      v1, v2, v3,
      v1, v2, v4
    ] )
    assert.ok( polyhedron.faces[ 0 ] === 0 )
    assert.ok( polyhedron.faces[ 1 ] === 1 )
    assert.ok( polyhedron.faces[ 2 ] === 2 )
    assert.ok( polyhedron.faces[ 3 ] === 0 )
    assert.ok( polyhedron.faces[ 4 ] === 1 )
    assert.ok( polyhedron.faces[ 5 ] === 3 )
  } )

  it( '.worldVertices should have it\'s vertices affected by transformations', () => {
    const v1 = Vector.create( 0, 0, 0 )
    const v2 = Vector.create( 2, 0, 0 )
    const v3 = Vector.create( 1, 1, 0 )
    const v4 = Vector.create( 1, 0, 1 )
    const polyhedron = new Polyhedron( [
      v1, v2, v3,
      v1, v2, v4
    ] )
    polyhedron.scale = 2
    polyhedron.rotation = Quaternion.fromAxisAngle( Vector.create( 1, 0, 0 ), Math.PI / 2 )
    assert.ok( Vector.isEqual( polyhedron.worldVertices[ 0 ], Vector.create( 0, 0, 0 ) ) )
    assert.ok( Vector.isEqual( polyhedron.worldVertices[ 1 ], Vector.create( 4, 0, 0 ) ) )
    assert.ok( Vector.isEqual( polyhedron.worldVertices[ 2 ], Vector.create( 2, 4.440892098500626e-16, 2 ) ) )
    assert.ok( Vector.isEqual( polyhedron.worldVertices[ 3 ], Vector.create( 2, -2, 4.440892098500626e-16 ) ) )
  } )

  it( 'should update boundsMin and boundsMax if a transformation occures', () => {
    const v1 = Vector.create( 0, 0, 0 )
    const v2 = Vector.create( 2, 0, 0 )
    const v3 = Vector.create( 1, 1, 0 )
    const v4 = Vector.create( 1, 0, 1 )
    const polyhedron = new Polyhedron( [
      v1, v2, v3,
      v1, v2, v4
    ] )
    polyhedron.scale = 2
    polyhedron.rotation = Quaternion.fromAxisAngle( Vector.create( 1, 0, 0 ), Math.PI / 2 )
    assert.ok( Vector.isEqual( polyhedron.boundsMin, Vector.create( -0, -2, -0 ) ) )
    assert.ok( Vector.isEqual( polyhedron.boundsMax, Vector.create( 4, 4.440892098500626e-16, 2 ) ) )
  } )
} )
