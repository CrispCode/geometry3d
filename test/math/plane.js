/* globals describe, it */

import assert from 'assert'
import Plane from './../../src/math/plane.js'
import Vector from './../../src/math/vector.js'
import Quaternion from './../../src/math/quaternion.js'

describe( 'math.Plane', () => {
  describe( 'Plane()', () => {
    it( 'should return _PlaneManipulation with the plane given set as original', ( next ) => {
      const normal = Vector.create( 1, 0, 0 )
      const plane = Plane.create( normal, 5 )
      const original = Plane( plane ).toObject()
      assert.ok( ( original.n.x === 1 ) && ( original.n.y === 0 ) && ( original.n.z === 0 ) && ( original.c === 5 ) )
      next()
    } )

    it( 'should create an empty _PlaneObject if no valid _PlaneObject is passed', ( next ) => {
      const plane = Plane().toObject()
      assert.ok( ( plane.n.x === 0 ) && ( plane.n.y === 1 ) && ( plane.n.z === 0 ) && ( plane.c === 0 ) )
      next()
    } )
  } )

  describe( 'Plane().toObject()', () => {
    it( 'should return the original _PlaneObject', ( next ) => {
      const plane = Plane.create( Vector.create( 1, 0, 0 ), 5 )
      const original = Plane( plane ).toObject()
      assert.ok( ( original === plane ) )
      next()
    } )
  } )

  describe( 'Plane().clone()', () => {
    it( 'should create a new identical _PlaneObject but with a different reference', ( next ) => {
      const plane = Plane.create( Vector.create( 3, 2, 1 ), 10 )
      const clonedPlane = Plane( plane ).clone().toObject()
      assert.ok(
        ( plane.n.x === clonedPlane.n.x ) && ( plane.n.y === clonedPlane.n.y ) && ( plane.n.z === clonedPlane.n.z ) && ( plane.n !== clonedPlane.n ) &&
        ( plane.c === clonedPlane.c )
      )
      next()
    } )
  } )

  describe( 'Plane().copy()', () => {
    it( 'should copy the values of the _PlaneObject into the original', ( next ) => {
      const plane1 = Plane.create( Vector.create( 4, 5, 6 ), 3 )
      const plane2 = Plane.create( Vector.create( 1, 2, 3 ), 2 )
      const plane = Plane( plane1 ).copy( plane2 ).toObject()
      assert.ok( ( plane.n.x === 1 ) && ( plane.n.y === 2 ) && ( plane.n.z === 3 ) && ( plane.n === plane1.n ) && ( plane.c === 2 ) )
      next()
    } )
  } )

  describe( 'Plane().reverse()', () => {
    it( 'should be able to reverse the original plane', ( next ) => {
      const normal = Vector.create( 1, 0, 0 )
      const plane = Plane.create( normal, 5 )
      const original = Plane( plane ).reverse().toObject()
      assert.ok( ( original.n.x === -1 && original.n.y === 0 && original.n.z === 0 ) && ( original.c === -5 ) )
      next()
    } )
  } )

  describe( 'Plane().rotate()', () => {
    it( 'should be able to rotate a plane to 90deg by Z axis', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI / 2 )
      const plane = Plane.create( Vector.create( 1, 0, 0 ), 4 )
      const rotated = Plane( plane ).rotate( quaternion ).toObject()
      assert.ok( rotated.n.x === 2.220446049250313e-16 && rotated.n.y === 1 && rotated.n.z === 0 && rotated.c === 4.000000000000001 )
      next()
    } )

    it( 'should be able to rotate a plane to 135deg by Y axis', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 0, 1, 0 ), Math.PI * ( 3 / 4 ) )
      const plane = Plane.create( Vector.create( 1, 0, 0 ), 4 )
      const rotated = Plane( plane ).rotate( quaternion ).toObject()
      assert.ok( rotated.n.x === -0.7071067811865475 && rotated.n.y === 0 && rotated.n.z === -0.7071067811865477 && rotated.c === -5.656854249492381 )
      next()
    } )

    it( 'should be able to rotate a plane to 270deg by Z axis', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI * 2 * ( 3 / 4 ) )
      const plane = Plane.create( Vector.create( 1, 0, 0 ), 4 )
      const rotated = Plane( plane ).rotate( quaternion ).toObject()
      assert.ok( rotated.n.x === -2.220446049250313e-16 && rotated.n.y === -1 && rotated.n.z === 0 && rotated.c === -4.000000000000001 )
      next()
    } )
  } )

  describe( 'Plane().distanceToPoint()', () => {
    it( 'should be able to return the distance from a plane to a point', ( next ) => {
      const plane = Plane.create( Vector.create( 0, 1, 0 ), -4 )
      const point = Vector.create( 1, 5, 1 )
      assert.ok( Plane( plane ).distanceToPoint( point ) === 1 )
      next()
    } )

    it( 'should be able to return the distance from a plane to a point if the point is on the plane', ( next ) => {
      const plane = Plane.create( Vector.create( 0, 1, 0 ), -4 )
      const point = Vector.create( 1, 4, 1 )
      assert.ok( Plane( plane ).distanceToPoint( point ) === 0 )
      next()
    } )
  } )

  describe( 'Plane().containsPoint()', () => {
    it( 'should return true if the point is coplanar', ( next ) => {
      const plane = Plane.create( Vector.create( 0, 1, 0 ), -4 )
      const point = Vector.create( 1, 4, 1 )
      assert.ok( Plane( plane ).containsPoint( point ) )
      next()
    } )

    it( 'should return false if the point is not coplanar', ( next ) => {
      const plane = Plane.create( Vector.create( 0, 1, 0 ), -4 )
      const point = Vector.create( 1, 5, 1 )
      assert.ok( !Plane( plane ).containsPoint( point ) )
      next()
    } )
  } )

  describe( 'Plane.create()', () => {
    it( 'should create a n=(0,1,0) c=0 _PlaneObject if no arguments specified', ( next ) => {
      const plane = Plane.create()
      assert.ok( ( plane.n.x === 0 ) && ( plane.n.y === 1 ) && ( plane.n.z === 0 ) && ( plane.c === 0 ) )
      next()
    } )

    it( 'should create a n=(0,1,0) c=5 _PlaneObject if no arguments specified for normal, and 5 is given as constant', ( next ) => {
      const plane = Plane.create( undefined, 5 )
      assert.ok( ( plane.n.x === 0 ) && ( plane.n.y === 1 ) && ( plane.n.z === 0 ) && ( plane.c === 5 ) )
      next()
    } )

    it( 'should create a n=(0,-1,0) c=1 _PlaneObject if a 0,-1,0 vector and a 1 constant are given as arguments', ( next ) => {
      const normal = Vector.create( 0, -1, 0 )
      const plane = Plane.create( normal, 1 )
      assert.ok( ( plane.n.x === 0 ) && ( plane.n.y === -1 ) && ( plane.n.z === 0 ) && plane.c === 1 )
      next()
    } )

    it( 'should create a n=(0,0,1) c=0 _PlaneObject if undefined,undefined,1 vector and an undefined constant are given as arguments', ( next ) => {
      const normal = Vector.create( undefined, undefined, 1 )
      const plane = Plane.create( normal )
      assert.ok( ( plane.n.x === 0 ) && ( plane.n.y === 0 ) && ( plane.n.z === 1 ) && ( plane.c === 0 ) )
      next()
    } )
  } )

  describe( 'Plane.fromNormalAndPoint()', () => {
    it( 'should create a plane from a normal and a point', ( next ) => {
      const plane = Plane.fromNormalAndPoint( Vector.create( 0, 1, 0 ), Vector.create( 1, 1, 1 ) )
      assert.ok( ( plane.n.x === 0 ) && ( plane.n.y === 1 ) && ( plane.n.z === 0 ) && ( plane.c === -1 ) )
      next()
    } )
  } )

  describe( 'Plane.fromPoints()', () => {
    it( 'should create a plane from 3 points', ( next ) => {
      const plane = Plane.fromPoints( Vector.create( 0, 2, 0 ), Vector.create( 1, 2, 1 ), Vector.create( 1, 2, 0 ) )
      assert.ok( ( plane.n.x === 0 ) && ( plane.n.y === 1 ) && ( plane.n.z === 0 ) && ( plane.c === -2 ) )
      next()
    } )
  } )

  describe( 'Plane.isValid()', () => {
    it( 'should return true for an object created with Plane.create()', ( next ) => {
      const normal = Vector.create( 1, 2, 3 )
      const plane = Plane.create( normal )
      assert.ok( Plane.isValid( plane ) )
      next()
    } )

    it( 'should return true if an object with x,y,z vector and a constant numeric properties is given', ( next ) => {
      const plane = { n: { x: 1, y: -1, z: 0.5 }, c: 3 }
      assert.ok( Plane.isValid( plane ) )
      next()
    } )

    it( 'should return false if an object with wrong properties is given', ( next ) => {
      assert.ok( !Plane.isValid( { n: { x: 1, y: null, z: 'wrong' }, c: 2 } ) )
      next()
    } )

    it( 'should return false the value passed is not an object', ( next ) => {
      assert.ok( !Plane.isValid( 'wrong' ) )
      next()
    } )
  } )

  describe( 'Plane.isEqual()', () => {
    it( 'should return true if a given plane is equal to the other', ( next ) => {
      const normal1 = Vector.create( 1, 2, 3 )
      const plane1 = Plane.create( normal1, 3 )
      const normal2 = Vector.create( 1, 2, 3 )
      const plane2 = Plane.create( normal2, 3 )
      assert.ok( Plane.isEqual( plane1, plane2 ) )
      next()
    } )

    it( 'should return false if a given plane has a different constant then the other', ( next ) => {
      const normal1 = Vector.create( 1, 2, 3 )
      const plane1 = Plane.create( normal1, 3 )
      const normal2 = Vector.create( 1, 2, 3 )
      const plane2 = Plane.create( normal2, 4 )
      assert.ok( !Plane.isEqual( plane1, plane2 ) )
      next()
    } )

    it( 'should return false if a given plane is not equal to the other', ( next ) => {
      const normal1 = Vector.create( 1, 2, 3 )
      const plane1 = Plane.create( normal1, 3 )
      const normal2 = Vector.create( 3, 2, 1 )
      const plane2 = Plane.create( normal2, 3 )
      assert.ok( !Plane.isEqual( plane1, plane2 ) )
      next()
    } )
  } )
} )
