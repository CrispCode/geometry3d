/* globals describe, it */

import assert from 'assert'
import Base from './../../src/shapes/base.js'
import Polyhedron from './../../src/shapes/polyhedron.js'
import Vector from './../../src/math/vector.js'
import Triangle from './../../src/math/triangle.js'
import Quaternion from './../../src/math/quaternion.js'

describe( 'shapes.Polyhedron', () => {
  const generateCubeVertices = ( width = 1, height = 1, depth = 1 ) => {
    const hw = width / 2
    const hh = height / 2
    const hd = depth / 2

    const vertices = {
      v000: Vector.create( -hw, -hh, -hd ),
      v100: Vector.create( hw, -hh, -hd ),
      v010: Vector.create( -hw, hh, -hd ),
      v110: Vector.create( hw, hh, -hd ),
      v001: Vector.create( -hw, -hh, hd ),
      v101: Vector.create( hw, -hh, hd ),
      v011: Vector.create( -hw, hh, hd ),
      v111: Vector.create( hw, hh, hd )
    }

    return [
      // Front
      vertices.v001, vertices.v101, vertices.v111,
      vertices.v111, vertices.v011, vertices.v001,
      // Left
      vertices.v010, vertices.v000, vertices.v001,
      vertices.v001, vertices.v011, vertices.v010,
      // Back
      vertices.v000, vertices.v010, vertices.v110,
      vertices.v110, vertices.v100, vertices.v000,
      // Right
      vertices.v100, vertices.v110, vertices.v101,
      vertices.v110, vertices.v111, vertices.v101,
      // Bottom
      vertices.v000, vertices.v100, vertices.v101,
      vertices.v101, vertices.v001, vertices.v000,
      // Top
      vertices.v111, vertices.v110, vertices.v010,
      vertices.v010, vertices.v011, vertices.v111
    ]
  }

  it( 'should extend Base class', ( next ) => {
    assert.ok( Polyhedron.prototype instanceof Base )
    next()
  } )

  describe( 'Polyhedron.updateBounds()', () => {
    it( 'should have a static method .updateBounds(shape) which updates the bounds properties on transform', ( next ) => {
      assert.ok( typeof Polyhedron.updateBounds === 'function' )
      const polyhedron = new Polyhedron( generateCubeVertices( 3, 3, 3 ) )
      Polyhedron.transform( polyhedron, null, 2, null )
      assert.ok( Vector.isEqual( polyhedron.bounds.min, Vector.create( -3, -3, -3 ) ) && Vector.isEqual( polyhedron.bounds.max, Vector.create( 3, 3, 3 ) ) )
      next()
    } )
  } )

  describe( 'Polyhedron.transform()', () => {
    it( 'should have a static method .transform(shape,translate,scale,rotate)', ( next ) => {
      assert.ok( typeof Polyhedron.transform === 'function' )
      next()
    } )

    it( 'should update the position by passing a translate vector', ( next ) => {
      const polyhedron = new Polyhedron( generateCubeVertices( 3, 3, 3 ) )
      Polyhedron.transform( polyhedron, Vector.create( 1, 2, -3 ), null, null )
      assert.ok( Vector.isEqual( polyhedron.position, Vector.create( 1, 2, -3 ) ) )
      next()
    } )

    it( 'should update vertices by passing a scale number', ( next ) => {
      const polyhedron = new Polyhedron( generateCubeVertices( 3, 3, 3 ) )
      Polyhedron.transform( polyhedron, null, 2, null )
      assert.ok( Vector.isEqual( polyhedron.bounds.min, Vector.create( -3, -3, -3 ) ) && Vector.isEqual( polyhedron.bounds.max, Vector.create( 3, 3, 3 ) ) )
      next()
    } )

    it( 'should update vertices by passing a rotate quaternion', ( next ) => {
      const polyhedron = new Polyhedron( generateCubeVertices( 3, 3, 3 ) )
      const rotation = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI / 4 )
      Polyhedron.transform( polyhedron, null, null, rotation )
      assert.ok( Vector.isEqual( polyhedron.vertices[ 0 ], Vector( Vector.create( -1.5, -1.5, 1.5 ) ).rotate( rotation ).toObject() ) )
      next()
    } )
  } )

  describe( 'constructor()', () => {
    it( 'should be able to create an instance if an array of vertices is provided', ( next ) => {
      const polyhedron = new Polyhedron( generateCubeVertices( 5, 5, 5 ) )
      assert.ok( polyhedron.type === 'Polyhedron' )
      next()
    } )

    it( 'should return an array containing the vertices with no duplicates when using .vertices', ( next ) => {
      const polyhedron = new Polyhedron( generateCubeVertices( 5, 5, 5 ) )
      const vertices = polyhedron.vertices
      assert.ok( vertices !== polyhedron.vertices )
      let unique = [ ...new Set( vertices ) ]
      assert.ok( unique.length === vertices.length && unique.length === 8 )
      next()
    } )

    it( 'should return an array containing the faces (triangles) when using .faces', ( next ) => {
      const polyhedron = new Polyhedron( generateCubeVertices( 5, 5, 5 ) )
      const faces = polyhedron.faces

      assert.ok( faces !== polyhedron.faces )
      assert.ok( faces.length === 12 )

      const results = [
        {
          a: { x: -2.5, y: -2.5, z: 2.5 },
          b: { x: 2.5, y: -2.5, z: 2.5 },
          c: { x: 2.5, y: 2.5, z: 2.5 }
        },
        {
          a: { x: 2.5, y: 2.5, z: 2.5 },
          b: { x: -2.5, y: 2.5, z: 2.5 },
          c: { x: -2.5, y: -2.5, z: 2.5 }
        },
        {
          a: { x: -2.5, y: 2.5, z: -2.5 },
          b: { x: -2.5, y: -2.5, z: -2.5 },
          c: { x: -2.5, y: -2.5, z: 2.5 }
        },
        {
          a: { x: -2.5, y: -2.5, z: 2.5 },
          b: { x: -2.5, y: 2.5, z: 2.5 },
          c: { x: -2.5, y: 2.5, z: -2.5 }
        },
        {
          a: { x: -2.5, y: -2.5, z: -2.5 },
          b: { x: -2.5, y: 2.5, z: -2.5 },
          c: { x: 2.5, y: 2.5, z: -2.5 }
        },
        {
          a: { x: 2.5, y: 2.5, z: -2.5 },
          b: { x: 2.5, y: -2.5, z: -2.5 },
          c: { x: -2.5, y: -2.5, z: -2.5 }
        },
        {
          a: { x: 2.5, y: -2.5, z: -2.5 },
          b: { x: 2.5, y: 2.5, z: -2.5 },
          c: { x: 2.5, y: -2.5, z: 2.5 }
        },
        {
          a: { x: 2.5, y: 2.5, z: -2.5 },
          b: { x: 2.5, y: 2.5, z: 2.5 },
          c: { x: 2.5, y: -2.5, z: 2.5 }
        },
        {
          a: { x: -2.5, y: -2.5, z: -2.5 },
          b: { x: 2.5, y: -2.5, z: -2.5 },
          c: { x: 2.5, y: -2.5, z: 2.5 }
        },
        {
          a: { x: 2.5, y: -2.5, z: 2.5 },
          b: { x: -2.5, y: -2.5, z: 2.5 },
          c: { x: -2.5, y: -2.5, z: -2.5 }
        },
        {
          a: { x: 2.5, y: 2.5, z: 2.5 },
          b: { x: 2.5, y: 2.5, z: -2.5 },
          c: { x: -2.5, y: 2.5, z: -2.5 }
        },
        {
          a: { x: -2.5, y: 2.5, z: -2.5 },
          b: { x: -2.5, y: 2.5, z: 2.5 },
          c: { x: 2.5, y: 2.5, z: 2.5 }
        }
      ]

      faces.forEach( ( face, index ) => {
        const result = results[ index ]

        assert.ok( Triangle.isValid( face ) )
        assert.ok( Triangle.isEqual( face, result ) )
      } )
      next()
    } )

    it( 'should return an array containing the faces normals when using .normals', ( next ) => {
      const polyhedron = new Polyhedron( generateCubeVertices( 5, 5, 5 ) )
      const normals = polyhedron.normals
      assert.ok( normals !== polyhedron.normals )
      assert.ok( normals.length === 12 )

      const results = [
        { x: 0, y: -0, z: 1 },
        { x: -0, y: 0, z: 1 },
        { x: -1, y: 0, z: 0 },
        { x: -1, y: -0, z: -0 },
        { x: 0, y: 0, z: -1 },
        { x: 0, y: 0, z: -1 },
        { x: 1, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: -1, z: 0 },
        { x: 0, y: -1, z: 0 },
        { x: 0, y: 1, z: -0 },
        { x: -0, y: 1, z: 0 }
      ]

      normals.forEach( ( vector, index ) => {
        assert.ok( Vector.isValid( vector ) )
        assert.ok( Vector.isEqual( vector, results[ index ] ) )
      } )
      next()
    } )
  } )
} )
