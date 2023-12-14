/* globals describe, it */

import assert from 'assert'
import approx from './../../src/utils/approx.js'
import Vector from './../../src/math/vector.js'
import Quaternion from './../../src/math/quaternion.js'

describe( 'math.Vector', () => {
  describe( 'Vector()', () => {
    it( 'should return _VectorManipulation with the vector given set as original', ( next ) => {
      const vector = Vector.create( 1, 2, 3 )
      const original = Vector( vector ).toObject()
      assert.ok( ( original.x === 1 ) && ( original.y === 2 ) && ( original.z === 3 ) )
      next()
    } )

    it( 'should create an empty _VectorObject if no valid _VectorObject is passed', ( next ) => {
      const vector = Vector().toObject()
      assert.ok( ( vector.x === 0 ) && ( vector.y === 0 ) && ( vector.z === 0 ) )
      next()
    } )
  } )

  describe( 'Vector().toObject()', () => {
    it( 'should return the original _VectorObject', ( next ) => {
      const vector = Vector.create( 1, 2, 3 )
      const original = Vector( vector ).toObject()
      assert.ok( ( original === vector ) )
      next()
    } )
  } )

  describe( 'Vector().clone()', () => {
    it( 'should create a new identical _VectorObject but with a different reference', ( next ) => {
      const vector = Vector.create( 1, 2, 3 )
      const clonedVector = Vector( vector ).clone().toObject()
      assert.ok( ( vector.x === clonedVector.x ) && ( vector.y === clonedVector.y ) && ( vector.z === clonedVector.z ) && ( vector !== clonedVector ) )
      next()
    } )
  } )

  describe( 'Vector().copy()', () => {
    it( 'should copy the values of the _VectorObject into the original', ( next ) => {
      const vector1 = Vector.create( 4, 5, 6 )
      const vector2 = Vector.create( 1, 2, 3 )
      const vector = Vector( vector1 ).copy( vector2 ).toObject()
      assert.ok( ( vector.x === 1 ) && ( vector.y === 2 ) && ( vector.z === 3 ) )
      next()
    } )
  } )

  describe( 'Vector().round()', () => {
    it( 'should round the values of the _VectorObject to the specified number of decimals', ( next ) => {
      const vector = Vector.create( 1.12, 2.345, 3.6789 )
      const original = Vector( vector ).round( 1 ).toObject()
      assert.ok( ( original.x === 1.1 ) && ( original.y === 2.3 ) && ( original.z === 3.7 ) )
      next()
    } )

    it( 'should round out to integers if the second parameter is not specified', ( next ) => {
      const vector = Vector.create( 1.12, 2.345, 3.6789 )
      const original = Vector( vector ).round().toObject()
      assert.ok( ( original.x === 1 ) && ( original.y === 2 ) && ( original.z === 4 ) )
      next()
    } )
  } )

  describe( 'Vector().add()', () => {
    it( 'should be able to add a _VectorObject to original', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const vector2 = Vector.create( -1, 2, 0.5 )
      const vector = Vector( vector1 ).add( vector2 ).toObject()
      assert.ok( ( vector.x === 0 && vector.y === 4 && vector.z === 3.5 ) )
      next()
    } )
  } )

  describe( 'Vector().addScalar()', () => {
    it( 'should be able to add a scalar value to original', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const scalar = 5
      const vector = Vector( vector1 ).addScalar( scalar ).toObject()
      assert.ok( ( vector.x === 6 && vector.y === 7 && vector.z === 8 ) )
      next()
    } )
  } )

  describe( 'Vector().subtract()', () => {
    it( 'should be able to subtract a _VectorObject from original', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const vector2 = Vector.create( -1, 2, 0.5 )
      const vector = Vector( vector1 ).subtract( vector2 ).toObject()
      assert.ok( ( vector.x === 2 && vector.y === 0 && vector.z === 2.5 ) )
      next()
    } )
  } )

  describe( 'Vector().subtractScalar()', () => {
    it( 'should be able to subtract a scalar value from original', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const scalar = 5
      const vector = Vector( vector1 ).subtractScalar( scalar ).toObject()
      assert.ok( ( vector.x === -4 && vector.y === -3 && vector.z === -2 ) )
      next()
    } )
  } )

  describe( 'Vector().multiply()', () => {
    it( 'should be able to multiply a _VectorObject with original', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const vector2 = Vector.create( -1, 2, 0.5 )
      const vector = Vector( vector1 ).multiply( vector2 ).toObject()
      assert.ok( ( vector.x === -1 && vector.y === 4 && vector.z === 1.5 ) )
      next()
    } )
  } )

  describe( 'Vector().multiplyScalar()', () => {
    it( 'should be able to multiply a scalar value with original', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const scalar = 5
      const vector = Vector( vector1 ).multiplyScalar( scalar ).toObject()
      assert.ok( ( vector.x === 5 && vector.y === 10 && vector.z === 15 ) )
      next()
    } )
  } )

  describe( 'Vector().divide()', () => {
    it( 'should be able to divide a _VectorObject from original', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const vector2 = Vector.create( -1, 2, 0.5 )
      const vector = Vector( vector1 ).divide( vector2 ).toObject()
      assert.ok( ( vector.x === -1 && vector.y === 1 && vector.z === 6 ) )
      next()
    } )
  } )

  describe( 'Vector().divideScalar()', () => {
    it( 'should be able to divide a scalar value from original', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const scalar = 5
      const vector = Vector( vector1 ).divideScalar( scalar ).toObject()
      assert.ok( ( vector.x === 1 / 5 && vector.y === 2 / 5 && vector.z === 3 / 5 ) )
      next()
    } )
  } )

  describe( 'Vector().reverse()', () => {
    it( 'should be able to reverse the original vector', ( next ) => {
      const vector = Vector.create( 1, 2, 3 )
      const original = Vector( vector ).reverse().toObject()
      assert.ok( ( original.x === -1 && original.y === -2 && original.z === -3 ) )
      next()
    } )
  } )

  describe( 'Vector().normalize()', () => {
    it( 'should be able to normalize a vector with a length greater than 1', ( next ) => {
      const vector = Vector.create( 1, 2, 3 )
      const length = Vector( vector ).length()
      const original = Vector( vector ).normalize().toObject()
      assert.ok( ( original.x === 1 / length && original.y === 2 / length && original.z === 3 / length ) )
      next()
    } )

    it( 'should be able to normalize a vector with 0,0,0', ( next ) => {
      const vector = Vector.create( 0, 0, 0 )
      const original = Vector( vector ).normalize().toObject()
      assert.ok( ( original.x === 0 && original.y === 0 && original.z === 0 ) )
      next()
    } )

    it( 'should be able to normalize a vector with negative values', ( next ) => {
      const vector = Vector.create( 1, -2, 3 )
      const length = Vector( vector ).length()
      const original = Vector( vector ).normalize().toObject()
      assert.ok( ( original.x === 1 / length && vector.y === -2 / length && vector.z === 3 / length ) )
      next()
    } )
  } )

  describe( 'Vector().length()', () => {
    it( 'should be able to calculate the length of a vector', ( next ) => {
      const vector = Vector.create( 1, 2, 3 )
      const length = Vector( vector ).length()
      assert.ok( length === Math.sqrt( 1 + 4 + 9 ) )
      next()
    } )

    it( 'should return 0 if the axies are 0', ( next ) => {
      const vector = Vector.create( 0, 0, 0 )
      const length = Vector( vector ).length()
      assert.ok( length === 0 )
      next()
    } )
  } )

  describe( 'Vector().doubleLength()', () => {
    it( 'should be able to calculate the double length of a vector', ( next ) => {
      const vector = Vector.create( 1, 2, 3 )
      const length = Vector( vector ).doubleLength()
      assert.ok( length === 1 + 4 + 9 )
      next()
    } )

    it( 'should return 0 if the axies are 0', ( next ) => {
      const vector = Vector.create( 0, 0, 0 )
      const length = Vector( vector ).doubleLength()
      assert.ok( length === 0 )
      next()
    } )
  } )

  describe( 'Vector().rotate()', () => {
    it( 'should be able to rotate a vector to 90deg by Z axis', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI / 2 )
      const vector = Vector.create( 1, 0, 0 )
      const rotated = Vector( vector ).rotate( quaternion ).toObject()
      assert.ok( approx( rotated.x, 3 ) === 0 && approx( rotated.y, 3 ) === 1 && approx( rotated.z, 3 ) === 0 )
      next()
    } )

    it( 'should be able to rotate a vector to 135deg by Y axis', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 0, 1, 0 ), Math.PI * ( 3 / 4 ) )
      const vector = Vector.create( 1, 0, 0 )
      const rotated = Vector( vector ).rotate( quaternion ).toObject()
      assert.ok( approx( rotated.x, 3 ) === -0.707 && approx( rotated.y, 3 ) === 0 && approx( rotated.z, 3 ) === -0.707 )
      next()
    } )

    it( 'should be able to rotate a vector to 270deg by Z axis', ( next ) => {
      const quaternion = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), Math.PI * 2 * ( 3 / 4 ) )
      const vector = Vector.create( 1, 0, 0 )
      const rotated = Vector( vector ).rotate( quaternion ).toObject()
      assert.ok( approx( rotated.x, 3 ) === 0 && approx( rotated.y, 3 ) === -1 && approx( rotated.z, 3 ) === 0 )
      next()
    } )
  } )

  describe( 'Vector().lerp()', () => {
    it( 'should return the first vector values if time is 0', ( next ) => {
      const vector1 = Vector.create( 5, 1, 2 )
      const vector2 = Vector.create( 10, 2, 3 )
      const lerp = Vector( vector1 ).clone().lerp( vector2, 0 ).toObject()
      assert.ok( lerp.x === 5 && lerp.y === 1 && lerp.z === 2 )
      next()
    } )

    it( 'should return the second vector values if time is 1', ( next ) => {
      const vector1 = Vector.create( 5, 1, 2 )
      const vector2 = Vector.create( 10, 2, 3 )
      const lerp = Vector( vector1 ).clone().lerp( vector2, 1 ).toObject()
      assert.ok( lerp.x === 10 && lerp.y === 2 && lerp.z === 3 )
      next()
    } )

    it( 'should return a vector in the middle if time is 0.5', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const vector2 = Vector.create( 2, 3, 4 )
      const lerp = Vector( vector1 ).clone().lerp( vector2, 0.5 ).toObject()
      assert.ok( lerp.x === 1.5 && lerp.y === 2.5 && lerp.z === 3.5 )
      next()
    } )
  } )

  describe( 'Vector.create()', () => {
    it( 'should create a (0,0,0) _VectorObject if no arguments specified', ( next ) => {
      const vector = Vector.create()
      assert.ok( ( vector.x === 0 ) && ( vector.y === 0 ) && ( vector.z === 0 ) )
      next()
    } )

    it( 'should create a (1,2,-3) _VectorObject if 1,2,-3 are given as arguments', ( next ) => {
      const vector = Vector.create( 1, 2, -3 )
      assert.ok( ( vector.x === 1 ) && ( vector.y === 2 ) && ( vector.z === -3 ) )
      next()
    } )

    it( 'should create a (0,0,-3) _VectorObject if undefined,undefined,-3 are given as arguments', ( next ) => {
      const vector = Vector.create( undefined, undefined, -3 )
      assert.ok( ( vector.x === 0 ) && ( vector.y === 0 ) && ( vector.z === -3 ) )
      next()
    } )
  } )

  describe( 'Vector.isValid()', () => {
    it( 'should return true for an object created with Vector.create()', ( next ) => {
      const vector = Vector.create( 1, 2, 3 )
      assert.ok( Vector.isValid( vector ) )
      next()
    } )

    it( 'should return true if an object with x,y,z numeric properties is given', ( next ) => {
      assert.ok( Vector.isValid( { x: 1, y: -1, z: 0.5 } ) )
      next()
    } )

    it( 'should return false if an object with wrong properties is given', ( next ) => {
      assert.ok( !Vector.isValid( { x: 1, y: null, z: 'wrong' } ) )
      next()
    } )

    it( 'should return false the value passed is not an object', ( next ) => {
      assert.ok( !Vector.isValid( 'wrong' ) )
      next()
    } )
  } )

  describe( 'Vector.isEqual()', () => {
    it( 'should return true if a given vector is equal to the other', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const vector2 = Vector.create( 1, 2, 3 )
      assert.ok( Vector.isEqual( vector1, vector2 ) )
      next()
    } )

    it( 'should return false if a given vector is not equal to the other', ( next ) => {
      const vector1 = Vector.create( 1, 2, 3 )
      const vector2 = Vector.create( 3, 2, 1 )
      assert.ok( !Vector.isEqual( vector1, vector2 ) )
      next()
    } )
  } )

  describe( 'Vector.dot()', () => {
    it( 'should be able to calculate the dot product of 2 vectors', ( next ) => {
      const vector1 = Vector.create( 5, 1, 0 )
      const vector2 = Vector.create( 1, 0, 0 )
      const dot = Vector.dot( vector1, vector2 )
      assert.ok( dot === 5 )
      next()
    } )

    it( 'should return 0 if the vectors are perpendicular', ( next ) => {
      const vector1 = Vector.create( 1, 5, 0 )
      const vector2 = Vector.create( 5, -1, 0 )
      const dot = Vector.dot( vector1, vector2 )
      assert.ok( dot === 0 )
      next()
    } )

    it( 'should return the correct value if the vectors are opposite', ( next ) => {
      const vector1 = Vector.create( 0, 5, 0 )
      const vector2 = Vector.create( 0, -5, 0 )
      const dot = Vector.dot( vector1, vector2 )
      assert.ok( dot === -25 )
      next()
    } )
  } )

  describe( 'Vector.cross()', () => {
    it( 'should be able to calculate the cross product of 2 vectors', ( next ) => {
      const vector1 = Vector.create( 5, 0, 0 )
      const vector2 = Vector.create( 0, 5, 0 )
      const vector = Vector.cross( vector1, vector2 )
      assert.ok( ( vector.x === 0 && vector.y === 0 && vector.z === 25 ) )
      next()
    } )

    it( 'should be able to calculate the cross product of 2 parallel vectors, facing the same direction and return 0,0,0', ( next ) => {
      const vector1 = Vector.create( 5, 0, 0 )
      const vector2 = Vector.create( 5, 0, 0 )
      const vector = Vector.cross( vector1, vector2 )
      assert.ok( ( vector.x === 0 && vector.y === 0 && vector.z === 0 ) )
      next()
    } )

    it( 'should be able to calculate the cross product of 2 parallel vectors, facing opposite directions and return 0,0,0', ( next ) => {
      const vector1 = Vector.create( 5, 0, 0 )
      const vector2 = Vector.create( -5, 0, 0 )
      const vector = Vector.cross( vector1, vector2 )
      assert.ok( ( vector.x === 0 && vector.y === 0 && vector.z === 0 ) )
      next()
    } )

    it( 'should be able to calculate the cross product of 2 vectors and reverse it depending on the order of vectors', ( next ) => {
      const vector1 = Vector.create( 5, 0, 0 )
      const vector2 = Vector.create( 0, 5, 0 )
      const cross1 = Vector.cross( vector1, vector2 )
      const cross2 = Vector.cross( vector2, vector1 )
      assert.ok( ( cross1.x === -cross2.x && cross1.y === -cross2.y && cross1.z === -cross2.z ) )
      next()
    } )
  } )

  describe( 'Vector.angle()', () => {
    it( 'should be able to calculate the angle between 2 vectors (with approximation)', ( next ) => {
      const vector1 = Vector.create( 5, 5, 0 )
      const vector2 = Vector.create( 5, 0, 0 )
      const angle = Vector.angle( vector1, vector2 )
      assert.ok( approx( angle, 6 ) === approx( Math.PI / 4, 6 ) )
      next()
    } )

    it( 'should be able to calculate the angle between 2 parallel vectors', ( next ) => {
      const vector1 = Vector.create( 0, 2, 0 )
      const vector2 = Vector.create( 0, 5, 0 )
      const angle = Vector.angle( vector1, vector2 )
      assert.ok( angle === 0 )
      next()
    } )

    it( 'should be able to calculate the angle between 2 parallel and opposite vectors', ( next ) => {
      const vector1 = Vector.create( 0, -2, 0 )
      const vector2 = Vector.create( 0, 5, 0 )
      const angle = Vector.angle( vector1, vector2 )
      assert.ok( angle === Math.PI )
      next()
    } )

    it( 'should be able to calculate the angle between 2 perpendicular vectors', ( next ) => {
      const vector1 = Vector.create( 5, 0, 0 )
      const vector2 = Vector.create( 0, 5, 0 )
      const angle = Vector.angle( vector1, vector2 )
      assert.ok( angle === Math.PI / 2 )
      next()
    } )

    it( 'should be able to calculate the angle between a vector of length 0 and another vector', ( next ) => {
      const vector1 = Vector.create( 5, 0, 0 )
      const vector2 = Vector.create( 0, 0, 0 )
      const angle = Vector.angle( vector1, vector2 )
      assert.ok( angle === Math.PI )
      next()
    } )
  } )
} )
