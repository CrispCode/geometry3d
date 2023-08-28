/* globals describe, it */

import assert from 'assert'
import Vector from './../../src/math/vector.js'
import Triangle from './../../src/math/triangle.js'

describe( 'math.Triangle', () => {
  describe( 'Triangle()', () => {
    it( 'should return _TriangleManipulation with the triangle given set as original', ( next ) => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const original = Triangle( triangle ).toObject()
      assert.ok(
        ( original.a.x === 1 ) && ( original.a.y === 0 ) && ( original.a.z === 0 ) &&
        ( original.b.x === 0 ) && ( original.b.y === 1 ) && ( original.b.z === 0 ) &&
        ( original.c.x === 0 ) && ( original.c.y === 0 ) && ( original.c.z === 1 )
      )
      next()
    } )

    it( 'should create an empty _TriangleObject if no valid _TriangleObject is passed', ( next ) => {
      const triangle = Triangle().toObject()
      assert.ok(
        ( triangle.a.x === 0 ) && ( triangle.a.y === 0 ) && ( triangle.a.z === 0 ) &&
        ( triangle.b.x === 1 ) && ( triangle.b.y === 0 ) && ( triangle.b.z === 0 ) &&
        ( triangle.c.x === 0 ) && ( triangle.c.y === 1 ) && ( triangle.c.z === 0 )
      )
      next()
    } )
  } )

  describe( 'Triangle().toObject()', () => {
    it( 'should return the original _TriangleObject', ( next ) => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const original = Triangle( triangle ).toObject()
      assert.ok( ( original === triangle ) )
      next()
    } )
  } )

  describe( 'Triangle().clone()', () => {
    it( 'should create a new identical _TriangleObject but with a different reference', ( next ) => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const clonedTriangle = Triangle( triangle ).clone().toObject()
      assert.ok(
        ( triangle.a.x === clonedTriangle.a.x ) && ( triangle.a.y === clonedTriangle.a.y ) && ( triangle.a.z === clonedTriangle.a.z ) &&
        ( triangle.b.x === clonedTriangle.b.x ) && ( triangle.b.y === clonedTriangle.b.y ) && ( triangle.b.z === clonedTriangle.b.z ) &&
        ( triangle.c.x === clonedTriangle.c.x ) && ( triangle.c.y === clonedTriangle.c.y ) && ( triangle.c.z === clonedTriangle.c.z ) &&
        triangle !== clonedTriangle
      )
      next()
    } )
  } )

  describe( 'Triangle().copy()', () => {
    it( 'should copy the values of the _TriangleObject into the original', ( next ) => {
      const triangle1 = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const triangle2 = Triangle.create( Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ), Vector.create( 1, 0, 0 ) )
      const triangle = Triangle( triangle1 ).copy( triangle2 ).toObject()
      assert.ok(
        ( triangle.a.x === triangle2.a.x ) && ( triangle.a.y === triangle2.a.y ) && ( triangle.a.z === triangle2.a.z ) &&
        ( triangle.b.x === triangle2.b.x ) && ( triangle.b.y === triangle2.b.y ) && ( triangle.b.z === triangle2.b.z ) &&
        ( triangle.c.x === triangle2.c.x ) && ( triangle.c.y === triangle2.c.y ) && ( triangle.c.z === triangle2.c.z )
      )
      next()
    } )
  } )

  describe( 'Triangle().normal()', () => {
    it( 'should return a vector representing the normal of the triangle, with the b point as center', ( next ) => {
      const triangle1 = Triangle.create( Vector.create( 0, 1, 0 ), Vector.create( 0, 1, 1 ), Vector.create( 1, 1, 1 ) )
      const triangle2 = Triangle.create( Vector.create( 1, 1, 1 ), Vector.create( 1, 1, 0 ), Vector.create( 0, 1, 0 ) )
      const normal1 = Triangle( triangle1 ).normal()
      const normal2 = Triangle( triangle2 ).normal()
      assert.ok( Vector.isEqual( normal1, Vector.create( 0, 1, 0 ) ) )
      assert.ok( Vector.isEqual( normal2, Vector.create( 0, 1, 0 ) ) )
      next()
    } )
  } )

  describe( 'Triangle().getBarycentric(vector)', () => {
    it( 'should return object with a,b,c properties representing the barycentric values for each vertex', ( next ) => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      const barycentric = Triangle( triangle ).getBarycentric( Vector.create( 0, 0, 2 ) )
      assert.ok( barycentric.a === 0 && barycentric.b === 0 && barycentric.c === 1 )
      next()
    } )

    it( 'should get a mixture if point is in center', ( next ) => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      const barycentric = Triangle( triangle ).getBarycentric( Vector.create( 1, 0, 1 ) )
      assert.ok( barycentric.a === 0.5 && barycentric.b === 0 && barycentric.c === 0.5 )
      next()
    } )

    it( 'should only work in one plane. If its on another plane it will treat is as being on the same plane. ', ( next ) => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      const barycentric = Triangle( triangle ).getBarycentric( Vector.create( 0, 1, 0 ) )
      assert.ok( barycentric.a === 0 && barycentric.b === 1 && barycentric.c === 0 )
      next()
    } )

    it( 'should return object with a,b,c properties representing the barycentric values for each vertex. Test BC ', ( next ) => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      const barycentric = Triangle( triangle ).getBarycentric( Vector.create( 0, 0, 1 ) )
      assert.ok( barycentric.a === 0 && barycentric.b === 0.5 && barycentric.c === 0.5 )
      next()
    } )
  } )

  describe( 'Triangle.create()', () => {
    it( 'should create a a=(0,0,0) b=(1,0,0) c=(0,1,0) _TriangleObject if no arguments specified', ( next ) => {
      const triangle = Triangle.create()
      assert.ok(
        ( triangle.a.x === 0 ) && ( triangle.a.y === 0 ) && ( triangle.a.z === 0 ) &&
        ( triangle.b.x === 1 ) && ( triangle.b.y === 0 ) && ( triangle.b.z === 0 ) &&
        ( triangle.c.x === 0 ) && ( triangle.c.y === 1 ) && ( triangle.c.z === 0 )
      )
      next()
    } )

    it( 'should create a a=(1,0,0) b=(0,1,0) c=(0,0,1) _TriangleObject if arguments are provided', ( next ) => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      assert.ok(
        ( triangle.a.x === 1 ) && ( triangle.a.y === 0 ) && ( triangle.a.z === 0 ) &&
        ( triangle.b.x === 0 ) && ( triangle.b.y === 1 ) && ( triangle.b.z === 0 ) &&
        ( triangle.c.x === 0 ) && ( triangle.c.y === 0 ) && ( triangle.c.z === 1 )
      )
      next()
    } )
  } )

  describe( 'Triangle.isValid()', () => {
    it( 'should return true for an object created with Triangle.create()', ( next ) => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      assert.ok( Triangle.isValid( triangle ) )
      next()
    } )

    it( 'should return true if an object with a,b,c vector properties is given', ( next ) => {
      const triangle = {
        a: { x: 1, y: 0, z: 0 },
        b: { x: 0, y: 1, z: 0 },
        c: { x: 0, y: 0, z: 1 }
      }
      assert.ok( Triangle.isValid( triangle ) )
      next()
    } )

    it( 'should return false if an object with wrong properties is given', ( next ) => {
      const triangle = {
        a: { x: 1, y: 0, z: 0 },
        b: { x: 0, y: null, z: 0 },
        c: { x: 0, y: 0, z: 1 }
      }
      assert.ok( !Triangle.isValid( triangle ) )
      next()
    } )

    it( 'should return false the value passed is not an object', ( next ) => {
      assert.ok( !Triangle.isValid( 'wrong' ) )
      next()
    } )
  } )

  describe( 'Triangle.isEqual()', () => {
    it( 'should return true if a given triangle is equal to the other', ( next ) => {
      const triangle1 = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const triangle2 = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      assert.ok( Triangle.isEqual( triangle1, triangle2 ) )
      next()
    } )

    it( 'should return false if a given triangle is not equal to the other', ( next ) => {
      const triangle1 = Triangle.create( Vector.create( 1, 0, 1 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const triangle2 = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 1, 0, 1 ) )
      assert.ok( !Triangle.isEqual( triangle1, triangle2 ) )
      next()
    } )

    it( 'should return true if a given triangle is equal to the other but in a different order', ( next ) => {
      const v1 = Vector.create( 0, 0, 0 )
      const v2 = Vector.create( 1, 0, 0 )
      const v3 = Vector.create( 0, 1, 0 )

      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v1, v2, v3 ) ) )
      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v1, v3, v2 ) ) )

      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v2, v1, v3 ) ) )
      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v2, v3, v1 ) ) )

      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v3, v2, v1 ) ) )
      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v3, v1, v2 ) ) )
      next()
    } )
  } )
} )
