/* globals describe, it */

import assert from 'assert'
import approx from './../../src/utils/approx.js'
import Quaternion from './../../src/math/quaternion.js'
import Vector from './../../src/math/vector.js'

describe( 'math.Quaternion', () => {
  describe( 'Quaterinon()', () => {
    it( 'should return _QuaternionrManipulation with the quaternion given set as original', ( next ) => {
      const quaternion = Quaternion.create( 1, 2, 3, 4 )
      const original = Quaternion( quaternion ).toObject()
      assert.ok( ( original.x === 1 ) && ( original.y === 2 ) && ( original.z === 3 ) && ( original.w === 4 ) )
      next()
    } )

    it( 'should create an empty _QuaternionObject if no valid _QuaternionObject is passed', ( next ) => {
      const quaternion = Quaternion().toObject()
      assert.ok( ( quaternion.x === 0 ) && ( quaternion.y === 0 ) && ( quaternion.z === 0 ) && ( quaternion.w === 1 ) )
      next()
    } )
  } )

  describe( 'Quaternion().toObject()', () => {
    it( 'should return the original _QuaternionObject', ( next ) => {
      const quaternion = Quaternion.create( 1, 2, 3, 4 )
      const original = Quaternion( quaternion ).toObject()
      assert.ok( ( original === quaternion ) )
      next()
    } )
  } )

  describe( 'Quaternion().clone()', () => {
    it( 'should create a new identical _QuaternionObject but with a different reference', ( next ) => {
      const quaternion = Quaternion.create( 1, 2, 3, 4 )
      const clonedQuaternion = Quaternion( quaternion ).clone().toObject()
      assert.ok( ( quaternion.x === clonedQuaternion.x ) && ( quaternion.y === clonedQuaternion.y ) && ( quaternion.z === clonedQuaternion.z ) && ( quaternion.w === clonedQuaternion.w ) && ( quaternion !== clonedQuaternion ) )
      next()
    } )
  } )

  describe( 'Quaternion().copy()', () => {
    it( 'should copy the values of the _QuaternionObject into the original', ( next ) => {
      const quaternion1 = Quaternion.create( 4, 5, 6, 7 )
      const quaternion2 = Quaternion.create( 1, 2, 3, 4 )
      const quaternion = Quaternion( quaternion1 ).copy( quaternion2 ).toObject()
      assert.ok( ( quaternion.x === 1 ) && ( quaternion.y === 2 ) && ( quaternion.z === 3 ) && ( quaternion.w === 4 ) )
      next()
    } )
  } )

  describe( 'Quaternion().round()', () => {
    it( 'should round the values of the _QuaternionObject to the specified number of decimals', ( next ) => {
      const quaternion = Quaternion.create( 1.12, 2.345, 3.6789, 1.123 )
      const original = Quaternion( quaternion ).round( 1 ).toObject()
      assert.ok( ( original.x === 1.1 ) && ( original.y === 2.3 ) && ( original.z === 3.7 ) && ( original.w === 1.1 ) )
      next()
    } )

    it( 'should round out to integers if the second parameter is not specified', ( next ) => {
      const quaternion = Quaternion.create( 1.12, 2.345, 3.6789, 1.123 )
      const original = Quaternion( quaternion ).round().toObject()
      assert.ok( ( original.x === 1 ) && ( original.y === 2 ) && ( original.z === 4 ) && ( original.w === 1 ) )
      next()
    } )
  } )

  describe( 'Quaternion().difference()', () => {
    it( 'should return the difference between 2 quaternions', ( next ) => {
      const quaternion1 = Quaternion.fromUnitVectors( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ) )
      const quaternion2 = Quaternion.fromUnitVectors( Vector.create( 1, 0, 0 ), Vector( Vector.create( -0.5, 0.5, 0 ) ).normalize().toObject() )
      const diff = Quaternion( quaternion2 ).difference( quaternion1 ).toObject()
      assert.ok( Quaternion.isEqual( Quaternion.create( 0, 0, 0.3826834323650896, 0.9238795325112867 ), diff ) )
      next()
    } )
  } )

  describe( 'Quaternion().multiply()', () => {
    it( 'should multiply 2 quaternions', ( next ) => {
      const quaternion1 = Quaternion.fromUnitVectors( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ) )
      const quaternion2 = Quaternion.fromUnitVectors( Vector.create( 0, 1, 0 ), Vector( Vector.create( 0, 0.5, 0.5 ) ).normalize().toObject() )
      const mult = Quaternion( quaternion2 ).clone().multiply( quaternion1 ).toObject()
      assert.ok( Quaternion.isEqual( Quaternion.create( 0.27059805007309845, -0.27059805007309845, 0.6532814824381882, 0.6532814824381882 ), mult ) )
      next()
    } )
  } )

  describe( 'Quaternion().premultiply()', () => {
    it( 'should multiply 2 quaternions, but in reverse order', ( next ) => {
      const quaternion1 = Quaternion.fromUnitVectors( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ) )
      const quaternion2 = Quaternion.fromUnitVectors( Vector.create( 0, 1, 0 ), Vector( Vector.create( 0, 0.5, 0.5 ) ).normalize().toObject() )
      const mult = Quaternion( quaternion2 ).clone().multiply( quaternion1 ).toObject()
      const premult = Quaternion( quaternion1 ).clone().premultiply( quaternion2 ).toObject()
      assert.ok( Quaternion.isEqual( premult, mult ) )
      next()
    } )
  } )

  describe( 'Quaternion().inverse()', () => {
    it( 'should inverse a quaternion', ( next ) => {
      const quaternion = Quaternion.fromUnitVectors( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ) )
      const inverse = Quaternion( quaternion ).clone().inverse().toObject()
      assert.ok( Quaternion.isEqual( inverse, Quaternion.create( -quaternion.x, -quaternion.y, -quaternion.z, quaternion.w ) ) )
      next()
    } )
  } )

  describe( 'Quaternion().normalize()', () => {
    it( 'should be able to normalize a quaternion with a length greater than 1', ( next ) => {
      const quaternion = Quaternion.create( 1, 2, 3, 2 )
      const length = Quaternion( quaternion ).length()
      const normalized = Quaternion( quaternion ).normalize().toObject()
      assert.ok( ( normalized.x === 1 / length && normalized.y === 2 / length && normalized.z === 3 / length && normalized.w === 2 / length ) )
      next()
    } )

    it( 'should be able to normalize a quaternion with 0,0,0,1', ( next ) => {
      const quaternion = Quaternion( Quaternion.create( 0, 0, 0, 1 ) ).normalize().toObject()
      assert.ok( ( quaternion.x === 0 && quaternion.y === 0 && quaternion.z === 0 && quaternion.w === 1 ) )
      next()
    } )

    it( 'should be able to normalize a quaternion with negative values', ( next ) => {
      const quaternion = Quaternion.create( 1, -2, 3, 1 )
      const length = Quaternion( quaternion ).length()
      const normalized = Quaternion( quaternion ).normalize().toObject()
      assert.ok( ( normalized.x === 1 / length && normalized.y === -2 / length && normalized.z === 3 / length && normalized.w === 1 / length ) )
      next()
    } )

    it( 'should return a quaternion of 0,0,0,1 if the length is 0', ( next ) => {
      const quaternion1 = Quaternion.create( 0, 0, 0, 0 )
      const quaternion2 = Quaternion.create( 0, 0, 0, 1 )
      const normalized = Quaternion( quaternion1 ).normalize().toObject()
      assert.ok( Quaternion.isEqual( normalized, quaternion2 ) )
      next()
    } )
  } )

  describe( 'Quaternion().length()', () => {
    it( 'should be able to calculate the length of a quaternion', ( next ) => {
      const quaternion = Quaternion.create( 1, 2, 3, 4 )
      const length = Quaternion( quaternion ).length()
      assert.ok( length === Math.sqrt( 1 + 4 + 9 + 16 ) )
      next()
    } )

    it( 'should return 1 if the axies are 0 and w is 1', ( next ) => {
      const quaternion = Quaternion.create( 0, 0, 0, 1 )
      const length = Quaternion( quaternion ).length()
      assert.ok( length === 1 )
      next()
    } )
  } )

  describe( 'Quaternion().doubleLength()', () => {
    it( 'should be able to calculate the double length of a quaternion', ( next ) => {
      const quaternion = Quaternion.create( 1, 2, 3, 4 )
      const length = Quaternion( quaternion ).doubleLength()
      assert.ok( length === 1 + 4 + 9 + 16 )
      next()
    } )

    it( 'should return 1 if the axies are 0 and w is 1', ( next ) => {
      const quaternion = Quaternion.create( 0, 0, 0, 1 )
      const length = Quaternion( quaternion ).doubleLength()
      assert.ok( length === 1 )
      next()
    } )
  } )

  describe( 'Quaternion().slerp()', () => {
    it( 'should return the first quaternion values if time is 0', ( next ) => {
      const quaternion1 = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI / 2 )
      const quaternion2 = Quaternion.fromAxisAngle( Vector.create( 0, 1, 0 ), Math.PI / 2 )
      const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 0 ).toObject()
      assert.ok( Quaternion.isEqual( quaternion, quaternion1 ) )
      next()
    } )

    it( 'should return the second quaternion values if time is 1', ( next ) => {
      const quaternion1 = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI / 2 )
      const quaternion2 = Quaternion.fromAxisAngle( Vector.create( 0, 1, 0 ), Math.PI / 2 )
      const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 1 ).toObject()
      assert.ok( Quaternion.isEqual( quaternion, quaternion2 ) )
      next()
    } )

    it( 'should return a quaternion in the middle if time is 0.5', ( next ) => {
      const quaternion1 = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI / 2 )
      const quaternion2 = Quaternion.fromAxisAngle( Vector.create( 0, 1, 0 ), Math.PI / 2 )
      const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 0.5 ).toObject()
      assert.ok( quaternion.x === 0 && quaternion.y === 0.40824829046386296 && quaternion.z === 0.40824829046386296 && quaternion.w === 0.816496580927726 )
      next()
    } )

    it( 'should return a quaternion in the middle if time is 0.5 and quaternions have a dot product lower than 0', ( next ) => {
      const quaternion1 = Quaternion.fromAxisAngle( Vector.create( 1, 0, -1 ), Math.PI / 2 )
      const quaternion2 = Quaternion.fromAxisAngle( Vector.create( -5, 0, 0 ), Math.PI / 2 )
      const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 0.5 ).toObject()
      assert.ok( quaternion.x === 0.7071067811865475 && quaternion.y === 0 && quaternion.z === -0.7071067811865475 && quaternion.w === 0.7071067811865476 )
      next()
    } )

    it( 'should return a quaternion in the middle if time is 0.5 and quaternions have a dot product very very close to 1 but still below (mathematical errors)', ( next ) => {
      const quaternion1 = Quaternion.create( 0, 0, 1, 1 )
      const quaternion2 = Quaternion.create( 0, 0, 0.9999999999999999, 0 )
      const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 0.5 ).toObject()
      assert.ok( quaternion.x === 0 && quaternion.y === 0 && quaternion.z === 0.8944271909999159 && quaternion.w === 0.4472135954999579 )
      next()
    } )
  } )

  describe( 'Quaternion().toEuler()', () => {
    it( 'should return euler angle for axis X and angle 45', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 1, 0, 0 ), Math.PI / 4 )
      const euler = Quaternion( quaternion ).toEuler()
      assert.ok( approx( euler.x, 6 ) === approx( Math.PI / 4, 6 ) && euler.y === 0 && euler.z === 0 )
      next()
    } )

    it( 'should return euler angle for axis Y and angle 45', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 0, 1, 0 ), Math.PI / 4 )
      const euler = Quaternion( quaternion ).toEuler()
      assert.ok( euler.x === 0 && approx( euler.y, 6 ) === approx( Math.PI / 4, 6 ) && euler.z === 0 )
      next()
    } )

    it( 'should return euler angle for axis Z and angle 45', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI / 4 )
      const euler = Quaternion( quaternion ).toEuler()
      assert.ok( euler.x === 0 && euler.y === 0 && approx( euler.z, 6 ) === approx( Math.PI / 4, 6 ) )
      next()
    } )

    it( 'should return euler angles a complex rotation', ( next ) => {
      const quaternion = Quaternion.fromUnitVectors( Vector.create( 1, 1, 1 ), Vector.create( -1, -1, -1 ) )
      const euler = Quaternion( quaternion ).toEuler()
      assert.ok( euler.x === 1.5707963267948963 && euler.y === 3.141592653589793 && euler.z === 3.141592653589793 )
      next()
    } )
  } )

  describe( 'Quaternion.create()', () => {
    it( 'should create a (0,0,0,1) _QuaternionObject if no arguments specified', ( next ) => {
      const quaternion = Quaternion.create()
      assert.ok( ( quaternion.x === 0 ) && ( quaternion.y === 0 ) && ( quaternion.z === 0 ) && ( quaternion.w === 1 ) )
      next()
    } )

    it( 'should create a (1,2,-3,4) _QuaternionObject if 1,2,-3,4 are given as arguments', ( next ) => {
      const quaternion = Quaternion.create( 1, 2, -3, 4 )
      assert.ok( ( quaternion.x === 1 ) && ( quaternion.y === 2 ) && ( quaternion.z === -3 ) && ( quaternion.w === 4 ) )
      next()
    } )

    it( 'should create a (0,0,-3,1) _QuaternionObject if undefined,undefined,-3,undefined are given as arguments', ( next ) => {
      const quaternion = Quaternion.create( undefined, undefined, -3, undefined )
      assert.ok( ( quaternion.x === 0 ) && ( quaternion.y === 0 ) && ( quaternion.z === -3 ) && ( quaternion.w === 1 ) )
      next()
    } )
  } )

  describe( 'Quaternion.isValid()', () => {
    it( 'should return true for an object created with Quaternion.create()', ( next ) => {
      const quaternion = Quaternion.create( 1, 2, 3, 4 )
      assert.ok( Quaternion.isValid( quaternion ) )
      next()
    } )

    it( 'should return true if an object with x,y,z,w numeric properties is given', ( next ) => {
      assert.ok( Quaternion.isValid( { x: 1, y: -1, z: 0.5, w: 2 } ) )
      next()
    } )

    it( 'should return false if an object with wrong properties is given', ( next ) => {
      assert.ok( !Quaternion.isValid( { x: 1, y: null, z: 'wrong', w: null } ) )
      next()
    } )

    it( 'should return false the value passed is not an object', ( next ) => {
      assert.ok( !Quaternion.isValid( 'wrong' ) )
      next()
    } )
  } )

  describe( 'Quaternion.isEqual()', () => {
    it( 'should return true if a given quaternion is equal to the other', ( next ) => {
      const quaternion1 = Quaternion.create( 1, 2, 3, 4 )
      const quaternion2 = Quaternion.create( 1, 2, 3, 4 )
      assert.ok( Quaternion.isEqual( quaternion1, quaternion2 ) )
      next()
    } )

    it( 'should return false if a given quaternion is not equal to the other', ( next ) => {
      const quaternion1 = Quaternion.create( 4, 3, 2, 1 )
      const quaternion2 = Quaternion.create( 1, 2, 3, 4 )
      assert.ok( !Quaternion.isEqual( quaternion1, quaternion2 ) )
      next()
    } )
  } )

  describe( 'Quaternion.dot()', () => {
    it( 'should be able to calculate the dot product of 2 quaternions', ( next ) => {
      const quaternion1 = Quaternion.create( 5, -1, 0, 1 )
      const quaternion2 = Quaternion.create( 1, 0, 0, -1 )
      const dot = Quaternion.dot( quaternion1, quaternion2 )
      assert.ok( dot === 4 )
      next()
    } )
  } )

  describe( 'Quaternion.angle()', () => {
    it( 'should be able to calculate the angle between 2 quaternions (with approximation)', ( next ) => {
      const quaternion1 = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI / 2 )
      const quaternion2 = Quaternion.fromAxisAngle( Vector.create( 0, 1, 0 ), Math.PI / 2 )
      const angle = Quaternion.angle( quaternion1, quaternion2 ) * 180 / Math.PI
      assert.ok( approx( angle ) === 120 )
      next()
    } )
  } )

  describe( 'Quaternion.fromAxisAngle()', () => {
    it( 'should be able to create a quaternion from a normalized vector and an angle', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 1, 0, 0 ), Math.PI / 2 )
      assert.ok( approx( quaternion.x, 3 ) === 0.707 && approx( quaternion.y, 3 ) === 0 && approx( quaternion.z, 3 ) === 0 && approx( quaternion.w, 3 ) === 0.707 )
      next()
    } )
  } )

  describe( 'Quaternion.fromUnitVectors()', () => {
    it( 'should be able to create a quaternion from 2 normalized vectors', ( next ) => {
      const quaternion = Quaternion.fromUnitVectors( Vector.create( 1, 0, 0 ), Vector.create( 0, 1, 0 ) )
      assert.ok( approx( quaternion.x, 3 ) === 0 && approx( quaternion.y, 3 ) === 0 && approx( quaternion.z, 3 ) === 0.707 && approx( quaternion.w, 3 ) === 0.707 )
      next()
    } )

    it( 'should be able to create a quaternion from 2 normalized vectors', ( next ) => {
      const quaternion = Quaternion.fromUnitVectors( Vector.create( 0.1, 0.1, 0.1 ), Vector.create( 0, -1, 0 ) )
      assert.ok( approx( quaternion.x, 3 ) === 0.110 && approx( quaternion.y, 3 ) === 0 && approx( quaternion.z, 3 ) === -0.110 && approx( quaternion.w, 3 ) === 0.988 )
      next()
    } )

    it( 'should be able to create a quaternion from 2 normalized vectors pointing in oppsite directions on X axis', ( next ) => {
      const quaternion = Quaternion.fromUnitVectors( Vector.create( 1, 0, 0 ), Vector.create( -1, 0, 0 ) )
      assert.ok( Quaternion.isEqual( quaternion, Quaternion.create( 0, 1, 0, 0 ) ) )
      next()
    } )

    it( 'should be able to create a quaternion from 2 normalized vectors pointing in oppsite directions on Z axis', ( next ) => {
      const quaternion = Quaternion.fromUnitVectors( Vector.create( 0, 0, 1 ), Vector.create( 0, 0, -1 ) )
      assert.ok( Quaternion.isEqual( quaternion, Quaternion.create( 0, -1, 0, 0 ) ) )
      next()
    } )

    it( 'should be able to create a quaternion from 2 normalized vectors pointing in the same directions', ( next ) => {
      const quaternion = Quaternion.fromUnitVectors( Vector.create( 1, 0, 0 ), Vector.create( 0.5, 0, 0 ) )
      assert.ok( Quaternion.isEqual( quaternion, Quaternion.create( 0, 0, 0, 1 ) ) )
      next()
    } )
  } )
} )
