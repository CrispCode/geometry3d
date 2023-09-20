/* globals describe, it */

import assert from 'assert'
import Box from './../../src/shapes/box.js'
import Polyhedron from './../../src/shapes/polyhedron.js'
import Vector from './../../src/math/vector.js'

describe( 'shapes.Box', () => {
  it( 'should extend Polyhedron class', ( next ) => {
    assert.ok( Box.prototype instanceof Polyhedron )
    next()
  } )

  describe( 'constructor()', () => {
    it( 'should create a box with the center of 0,0,0 and a size of 5,5,5 if 5,5,5 is provided', ( next ) => {
      const box = new Box( 5, 5, 5 )
      const results = [
        { x: -2.5, y: -2.5, z: 2.5 },
        { x: 2.5, y: -2.5, z: 2.5 },
        { x: 2.5, y: 2.5, z: 2.5 },
        { x: -2.5, y: 2.5, z: 2.5 },
        { x: -2.5, y: 2.5, z: -2.5 },
        { x: -2.5, y: -2.5, z: -2.5 },
        { x: 2.5, y: 2.5, z: -2.5 },
        { x: 2.5, y: -2.5, z: -2.5 }
      ]

      const vertices = box.vertices
      vertices.forEach( ( vertex, index ) => {
        const result = results[ index ]
        assert.ok( Vector.isEqual( vertex, Vector.create( result.x, result.y, result.z ) ) )
      } )
      next()
    } )

    it( 'should have position in the center of the box', ( next ) => {
      const box = new Box( 10, 10, 10 )
      const results = [
        { x: -5, y: -5, z: 5 },
        { x: 5, y: -5, z: 5 },
        { x: 5, y: 5, z: 5 },
        { x: -5, y: 5, z: 5 },
        { x: -5, y: 5, z: -5 },
        { x: -5, y: -5, z: -5 },
        { x: 5, y: 5, z: -5 },
        { x: 5, y: -5, z: -5 }
      ]

      const vertices = box.vertices
      vertices.forEach( ( vertex, index ) => {
        const result = results[ index ]
        assert.ok( Vector.isEqual( vertex, Vector.create( result.x, result.y, result.z ) ) )
      } )

      assert.ok( Vector.isEqual( box.position, Vector.create() ) )
      next()
    } )
  } )
} )
