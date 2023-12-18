'use strict'

import { describe, it } from 'node:test'
import assert from 'node:assert'

import { Vector } from './../../src/math/vector.js'
import { Triangle } from './../../src/math/triangle.js'

describe( 'math.Triangle', () => {
  describe( 'Triangle()', () => {
    it( 'should return _TriangleManipulation with the triangle given set as original', () => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const original = Triangle( triangle ).toObject()
      assert.ok(
        ( original.a.x === 1 ) && ( original.a.y === 0 ) && ( original.a.z === 0 ) &&
        ( original.b.x === 0 ) && ( original.b.y === 1 ) && ( original.b.z === 0 ) &&
        ( original.c.x === 0 ) && ( original.c.y === 0 ) && ( original.c.z === 1 )
      )
    } )

    it( 'should create an empty _TriangleObject if no valid _TriangleObject is passed', () => {
      const triangle = Triangle().toObject()
      assert.ok(
        ( triangle.a.x === 0 ) && ( triangle.a.y === 0 ) && ( triangle.a.z === 0 ) &&
        ( triangle.b.x === 1 ) && ( triangle.b.y === 0 ) && ( triangle.b.z === 0 ) &&
        ( triangle.c.x === 0 ) && ( triangle.c.y === 1 ) && ( triangle.c.z === 0 )
      )
    } )
  } )

  describe( 'Triangle().toObject()', () => {
    it( 'should return the original _TriangleObject', () => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const original = Triangle( triangle ).toObject()
      assert.ok( ( original === triangle ) )
    } )
  } )

  describe( 'Triangle().clone()', () => {
    it( 'should create a new identical _TriangleObject but with a different reference', () => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const clonedTriangle = Triangle( triangle ).clone().toObject()
      assert.ok(
        ( triangle.a.x === clonedTriangle.a.x ) && ( triangle.a.y === clonedTriangle.a.y ) && ( triangle.a.z === clonedTriangle.a.z ) &&
        ( triangle.b.x === clonedTriangle.b.x ) && ( triangle.b.y === clonedTriangle.b.y ) && ( triangle.b.z === clonedTriangle.b.z ) &&
        ( triangle.c.x === clonedTriangle.c.x ) && ( triangle.c.y === clonedTriangle.c.y ) && ( triangle.c.z === clonedTriangle.c.z ) &&
        triangle !== clonedTriangle
      )
    } )
  } )

  describe( 'Triangle().copy()', () => {
    it( 'should copy the values of the _TriangleObject into the original', () => {
      const triangle1 = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const triangle2 = Triangle.create( Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ), Vector.create( 1, 0, 0 ) )
      const triangle = Triangle( triangle1 ).copy( triangle2 ).toObject()
      assert.ok(
        ( triangle.a.x === triangle2.a.x ) && ( triangle.a.y === triangle2.a.y ) && ( triangle.a.z === triangle2.a.z ) &&
        ( triangle.b.x === triangle2.b.x ) && ( triangle.b.y === triangle2.b.y ) && ( triangle.b.z === triangle2.b.z ) &&
        ( triangle.c.x === triangle2.c.x ) && ( triangle.c.y === triangle2.c.y ) && ( triangle.c.z === triangle2.c.z )
      )
    } )
  } )

  describe( 'Triangle().normal()', () => {
    it( 'should return a vector representing the normal of the triangle, with the b point as center', () => {
      const triangle1 = Triangle.create( Vector.create( 0, 1, 0 ), Vector.create( 0, 1, 1 ), Vector.create( 1, 1, 1 ) )
      const triangle2 = Triangle.create( Vector.create( 1, 1, 1 ), Vector.create( 1, 1, 0 ), Vector.create( 0, 1, 0 ) )
      const normal1 = Triangle( triangle1 ).normal()
      const normal2 = Triangle( triangle2 ).normal()
      assert.ok( Vector.isEqual( normal1, Vector.create( 0, 1, 0 ) ) )
      assert.ok( Vector.isEqual( normal2, Vector.create( 0, 1, 0 ) ) )
    } )
  } )

  describe( 'Triangle().getBarycentric(vector)', () => {
    it( 'should return object with a,b,c properties representing the barycentric values for each vertex', () => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      const barycentric = Triangle( triangle ).getBarycentric( Vector.create( 0, 0, 2 ) )
      assert.ok( barycentric.ab === 0 && barycentric.cb === 1 && barycentric.distance === 0 )
    } )

    it( 'should only work in one plane. If its on another plane it will treat is as being on the same plane, but having distance', () => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      const barycentric = Triangle( triangle ).getBarycentric( Vector.create( 0, 1, 0 ) )
      assert.ok( barycentric.ab === 0 && barycentric.cb === 0 && barycentric.distance === 1 )
    } )

    it( 'should return correctly if values are 1,0,1 and points are a = 2,0,0 b = 0,0,0 c = 0,0,2', () => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      const barycentric = Triangle( triangle ).getBarycentric( Vector.create( 1, 0, 1 ) )
      assert.ok( barycentric.ab === 0.5 && barycentric.cb === 0.5 && barycentric.distance === 0 )
    } )

    it( 'should return correctly if point is outside and below b', () => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      const barycentric = Triangle( triangle ).getBarycentric( Vector.create( -1, 0, -1 ) )
      assert.ok( barycentric.ab === -0.5 && barycentric.cb === -0.5 && barycentric.distance === 0 )
    } )

    it( 'should return correctly if point is outside and above b', () => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      const barycentric = Triangle( triangle ).getBarycentric( Vector.create( 0, 0, 3 ) )
      assert.ok( barycentric.ab === 0 && barycentric.cb === 1.5 && barycentric.distance === 0 )
    } )
  } )

  describe( 'Triangle().containsPoint(vector)', () => {
    it( 'should return true if point is inside the triangle', () => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      assert.ok( Triangle( triangle ).containsPoint( Vector.create( 1, 0, 1 ) ) )
    } )

    it( 'should return false if point is outside the triangle', () => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      assert.ok( !Triangle( triangle ).containsPoint( Vector.create( 3, 0, 1 ) ) )
    } )

    it( 'should return false if point is outside the triangle', () => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      assert.ok( !Triangle( triangle ).containsPoint( Vector.create( -3, 0, 1 ) ) )
    } )

    it( 'should return false if point is inside the triangle but on a different plane', () => {
      const triangle = Triangle.create( Vector.create( 2, 0, 0 ), Vector.create( 0, 0, 0 ), Vector.create( 0, 0, 2 ) )
      assert.ok( !Triangle( triangle ).containsPoint( Vector.create( 1, 1, 1 ) ) )
    } )
  } )

  describe( 'Triangle.create()', () => {
    it( 'should create a a=(0,0,0) b=(1,0,0) c=(0,1,0) _TriangleObject if no arguments specified', () => {
      const triangle = Triangle.create()
      assert.ok(
        ( triangle.a.x === 0 ) && ( triangle.a.y === 0 ) && ( triangle.a.z === 0 ) &&
        ( triangle.b.x === 1 ) && ( triangle.b.y === 0 ) && ( triangle.b.z === 0 ) &&
        ( triangle.c.x === 0 ) && ( triangle.c.y === 1 ) && ( triangle.c.z === 0 )
      )
    } )

    it( 'should create a a=(1,0,0) b=(0,1,0) c=(0,0,1) _TriangleObject if arguments are provided', () => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      assert.ok(
        ( triangle.a.x === 1 ) && ( triangle.a.y === 0 ) && ( triangle.a.z === 0 ) &&
        ( triangle.b.x === 0 ) && ( triangle.b.y === 1 ) && ( triangle.b.z === 0 ) &&
        ( triangle.c.x === 0 ) && ( triangle.c.y === 0 ) && ( triangle.c.z === 1 )
      )
    } )
  } )

  describe( 'Triangle.isValid()', () => {
    it( 'should return true for an object created with Triangle.create()', () => {
      const triangle = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      assert.ok( Triangle.isValid( triangle ) )
    } )

    it( 'should return true if an object with a,b,c vector properties is given', () => {
      const triangle = {
        a: { x: 1, y: 0, z: 0 },
        b: { x: 0, y: 1, z: 0 },
        c: { x: 0, y: 0, z: 1 }
      }
      assert.ok( Triangle.isValid( triangle ) )
    } )

    it( 'should return false if an object with wrong properties is given', () => {
      const triangle = {
        a: { x: 1, y: 0, z: 0 },
        b: { x: 0, y: null, z: 0 },
        c: { x: 0, y: 0, z: 1 }
      }
      assert.ok( !Triangle.isValid( triangle ) )
    } )

    it( 'should return false the value passed is not an object', () => {
      assert.ok( !Triangle.isValid( 'wrong' ) )
    } )
  } )

  describe( 'Triangle.isEqual()', () => {
    it( 'should return true if a given triangle is equal to the other', () => {
      const triangle1 = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const triangle2 = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      assert.ok( Triangle.isEqual( triangle1, triangle2 ) )
    } )

    it( 'should return false if a given triangle is not equal to the other', () => {
      const triangle1 = Triangle.create( Vector.create( 1, 0, 1 ), Vector.create( 0, 1, 0 ), Vector.create( 0, 0, 1 ) )
      const triangle2 = Triangle.create( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ), Vector.create( 1, 0, 1 ) )
      assert.ok( !Triangle.isEqual( triangle1, triangle2 ) )
    } )

    it( 'should return true if a given triangle is equal to the other but in a different order', () => {
      const v1 = Vector.create( 0, 0, 0 )
      const v2 = Vector.create( 1, 0, 0 )
      const v3 = Vector.create( 0, 1, 0 )

      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v1, v2, v3 ) ) )
      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v1, v3, v2 ) ) )

      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v2, v1, v3 ) ) )
      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v2, v3, v1 ) ) )

      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v3, v2, v1 ) ) )
      assert.ok( Triangle.isEqual( Triangle.create( v1, v2, v3 ), Triangle.create( v3, v1, v2 ) ) )
    } )
  } )
} )
