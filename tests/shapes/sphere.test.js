'use strict'

import { describe, it } from 'node:test'
import assert from 'node:assert'

import { Sphere } from './../../src/shapes/sphere.js'
import { Vector } from './../../src/math/vector.js'

describe( 'shapes.Sphere', () => {
  it( 'should update boundsMin and boundsMax on radius change', () => {
    const sphere = new Sphere()
    let radius = 1
    assert.ok( Vector.isEqual( sphere.boundsMin, Vector.create( -radius, -radius, -radius ) ) )
    assert.ok( Vector.isEqual( sphere.boundsMax, Vector.create( radius, radius, radius ) ) )
    radius = 5
    sphere.radius = radius
    assert.ok( Vector.isEqual( sphere.boundsMin, Vector.create( -radius, -radius, -radius ) ) )
    assert.ok( Vector.isEqual( sphere.boundsMax, Vector.create( radius, radius, radius ) ) )
  } )

  it( 'should update worldRadius, boundsMin and boundsMax based on scale', () => {
    const sphere = new Sphere()
    sphere.radius = 3
    sphere.scale = 5
    const edge = sphere.worldRadius
    assert.ok( edge === 15 )
    assert.ok( Vector.isEqual( sphere.boundsMin, Vector.create( -edge, -edge, -edge ) ) )
    assert.ok( Vector.isEqual( sphere.boundsMax, Vector.create( edge, edge, edge ) ) )
  } )
} )
