/* globals describe, it */

import assert from 'assert'
import { Point } from './../../src/math/point.js'
import { Vector } from './../../src/math/vector.js'

describe( 'math.Point', () => {
  describe( 'Point()', () => {
    it( 'should return _PointManipulation with the point given set as original', ( next ) => {
      const point = Point.create( 1, 2, 3 )
      const original = Point( point ).toObject()
      assert.ok( ( original.x === 1 ) && ( original.y === 2 ) && ( original.z === 3 ) )
      next()
    } )

    it( 'should create an empty _PointObject if no valid _PointObject is passed', ( next ) => {
      const point = Point().toObject()
      assert.ok( ( point.x === 0 ) && ( point.y === 0 ) && ( point.z === 0 ) )
      next()
    } )
  } )

  describe( 'Point().toObject()', () => {
    it( 'should return the original _PointObject', ( next ) => {
      const point = Point.create( 1, 2, 3 )
      const original = Point( point ).toObject()
      assert.ok( ( original === point ) )
      next()
    } )
  } )

  describe( 'Point().clone()', () => {
    it( 'should create a new identical _PointObject but with a different reference', ( next ) => {
      const point = Point.create( 1, 2, 3 )
      const clonedPoint = Point( point ).clone().toObject()
      assert.ok( ( point.x === clonedPoint.x ) && ( point.y === clonedPoint.y ) && ( point.z === clonedPoint.z ) && ( point !== clonedPoint ) )
      next()
    } )
  } )

  describe( 'Point().copy()', () => {
    it( 'should copy the values of the _PointObject into the original', ( next ) => {
      const point1 = Point.create( 4, 5, 6 )
      const point2 = Point.create( 1, 2, 3 )
      const point = Point( point1 ).copy( point2 ).toObject()
      assert.ok( ( point.x === 1 ) && ( point.y === 2 ) && ( point.z === 3 ) )
      next()
    } )
  } )

  describe( 'Point().round()', () => {
    it( 'should round the values of the _PointObject to the specified number of decimals', ( next ) => {
      const point = Point.create( 1.12, 2.345, 3.6789 )
      const original = Point( point ).round( 1 ).toObject()
      assert.ok( ( original.x === 1.1 ) && ( original.y === 2.3 ) && ( original.z === 3.7 ) )
      next()
    } )

    it( 'should round out to integers if the second parameter is not specified', ( next ) => {
      const point = Point.create( 1.12, 2.345, 3.6789 )
      const original = Point( point ).round().toObject()
      assert.ok( ( original.x === 1 ) && ( original.y === 2 ) && ( original.z === 4 ) )
      next()
    } )
  } )

  describe( 'Point().translate()', () => {
    it( 'should translate a _PointObject by a given vector', ( next ) => {
      const vector = Vector.create( -1, 1, 0 )
      const point = Point( Point.create( 1, -1, 0 ) ).translate( vector ).toObject()
      assert.ok( ( point.x === 0 ) && ( point.y === 0 ) && ( point.z === 0 ) )
      next()
    } )
  } )

  describe( 'Point.create()', () => {
    it( 'should create a (0,0,0) _PointObject if no arguments specified', ( next ) => {
      const point = Point.create()
      assert.ok( ( point.x === 0 ) && ( point.y === 0 ) && ( point.z === 0 ) )
      next()
    } )

    it( 'should create a (1,2,-3) _PointObject if 1,2,-3 are given as arguments', ( next ) => {
      const point = Point.create( 1, 2, -3 )
      assert.ok( ( point.x === 1 ) && ( point.y === 2 ) && ( point.z === -3 ) )
      next()
    } )

    it( 'should create a (0,0,-3) _PointObject if undefined,undefined,-3 are given as arguments', ( next ) => {
      const point = Point.create( undefined, undefined, -3 )
      assert.ok( ( point.x === 0 ) && ( point.y === 0 ) && ( point.z === -3 ) )
      next()
    } )
  } )

  describe( 'Point.isValid()', () => {
    it( 'should return true for an object created with Point.create()', ( next ) => {
      const point = Point.create( 1, 2, 3 )
      assert.ok( Point.isValid( point ) )
      next()
    } )

    it( 'should return true if an object with x,y,z numeric properties is given', ( next ) => {
      assert.ok( Point.isValid( { x: 1, y: -1, z: 0.5 } ) )
      next()
    } )

    it( 'should return false if an object with wrong properties is given', ( next ) => {
      assert.ok( !Point.isValid( { x: 1, y: null, z: 'wrong' } ) )
      next()
    } )

    it( 'should return false the value passed is not an object', ( next ) => {
      assert.ok( !Point.isValid( 'wrong' ) )
      next()
    } )
  } )

  describe( 'Point.isEqual()', () => {
    it( 'should return true if a given point is equal to the other', ( next ) => {
      const point1 = Point.create( 1, 2, 3 )
      const point2 = Point.create( 1, 2, 3 )
      assert.ok( Point.isEqual( point1, point2 ) )
      next()
    } )

    it( 'should return false if a given point is not equal to the other', ( next ) => {
      const point1 = Point.create( 1, 2, 3 )
      const point2 = Point.create( 3, 2, 1 )
      assert.ok( !Point.isEqual( point1, point2 ) )
      next()
    } )
  } )
} )
