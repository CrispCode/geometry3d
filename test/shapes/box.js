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

  describe( 'Box.fromSize(width,height,depth)', () => {
    it( 'should create a box with the center of 0,0,0 and a size of 5,5,5 if 5,5,5 is provided', ( next ) => {
      const box = Box.fromSize( 5, 5, 5 )
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
  } )

  describe( 'constructor()', () => {
    it( 'should be able to create an instance if a min and a max vertex are provided', ( next ) => {
      const box = new Box( Vector.create( 0, 0, 0 ), Vector.create( 1, 1, 1 ) )
      const results = [
        { x: 0, y: 0, z: 1 },
        { x: 1, y: 0, z: 1 },
        { x: 1, y: 1, z: 1 },
        { x: 0, y: 1, z: 1 },
        { x: 0, y: 1, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: 1, y: 0, z: 0 }
      ]

      const vertices = box.vertices
      vertices.forEach( ( vertex, index ) => {
        const result = results[ index ]
        assert.ok( Vector.isEqual( vertex, Vector.create( result.x, result.y, result.z ) ) )
      } )
      next()
    } )

    it( 'should be independent of position', ( next ) => {
      const box = new Box( Vector.create( 5, 5, 5 ), Vector.create( 10, 10, 10 ) )
      const results = [
        { x: 5, y: 5, z: 10 },
        { x: 10, y: 5, z: 10 },
        { x: 10, y: 10, z: 10 },
        { x: 5, y: 10, z: 10 },
        { x: 5, y: 10, z: 5 },
        { x: 5, y: 5, z: 5 },
        { x: 10, y: 10, z: 5 },
        { x: 10, y: 5, z: 5 }
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
