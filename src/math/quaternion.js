'use strict'

import approx from './../utils/approx.js'
import { Vector } from './vector.js'

/**
 * The definition of a quaternion. You may alter this object with additional properties but they will be ignored by methods such as: copy(), clone(), isEqual()
 * @typedef {Object} _QuaternionObject
 * @property {Number} x The X coordonate in 3D space
 * @property {Number} y The Y coordonate in 3D space
 * @property {Number} z The Z coordonate in 3D space
 * @property {Number} w The W coordonate in 3D space
 */

/**
 * Checks if an object is a valid _QuaternionObject
 * @param {_QuaternionObject} quaternion The object to be checked
 * @returns {Boolean} Returns true if quaternion is a valid _QuaternionObject and false otherwise
 */
export function isValidQuaternion ( quaternion ) {
  return (
    typeof quaternion === 'object' &&
    typeof quaternion.x === 'number' &&
    typeof quaternion.y === 'number' &&
    typeof quaternion.z === 'number' &&
    typeof quaternion.w === 'number'
  )
}

/**
 * A function used to create and manage mathematical quaternions (_QuaternionObject). If the first parameter is an object, it will use that as the original _QuaternionObject.
 * @param {(_QuaternionObject|Number)} [x=0] A _QuaternionObject to perform operations on. Or the X coordonate in 3D space
 * @param {Number} [y=0] The Y coordonate in 3D space
 * @param {Number} [z=0] The Z coordonate in 3D space
 * @param {Number} [w=1] The w value
 * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
 */
export function Quaternion ( x = 0, y = 0, z = 0, w = 1 ) {
  let original = {}

  if ( isValidQuaternion( x ) ) {
    original = x
  } else if ( typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && typeof w === 'number' ) {
    original.x = x
    original.y = y
    original.z = z
    original.w = w
  } else {
    throw new Error( 'Invalid parameters received for _QuaternionObject creation' )
  }

  return {
    /**
     * Returns the original _QuaternionObject
     * @memberof _QuaternionManipulation
     * @returns {_QuaternionObject} Returns the original _QuaternionObject
     */
    toObject: () => {
      return original
    },

    /**
     * Clones a _QuaternionObject
     * @memberof _QuaternionManipulation
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    clone: () => {
      return Quaternion( original.x, original.y, original.z, original.w )
    },

    /**
     * Copies the values of a _QuaternionObject into the original _QuaternionObject
     * @memberof _QuaternionManipulation
     * @param {_QuaternionObject} quaternion Source _QuaternionObject
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    copy: ( quaternion ) => {
      original.x = quaternion.x
      original.y = quaternion.y
      original.z = quaternion.z
      original.w = quaternion.w
      return Quaternion( original )
    },

    /**
     * Compares a _QuaternionObject to the original _QuaternionObject
     * @memberof _QuaternionManipulation
     * @param {_QuaternionObject} quaternion A _QuaternionObject to compare to
     * @returns {Boolean} Returns true if the value of the given _QuaternionObject matches the original _QuaternionObject
     */
    isEqual: ( quaternion ) => {
      return (
        original.x === quaternion.x &&
        original.y === quaternion.y &&
        original.z === quaternion.z &&
        original.w === quaternion.w
      )
    },

    /**
     * Rounds the _QuaternionObject properties to a specified number of decimals
     * @memberof _QuaternionManipulation
     * @param {Number} [decimals=0] The number of decimals to round to
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    round: ( decimals = 0 ) => {
      original.x = approx( original.x, decimals )
      original.y = approx( original.y, decimals )
      original.z = approx( original.z, decimals )
      original.w = approx( original.w, decimals )
      return Quaternion( original )
    },

    /**
     * Sets the original _QuaternionObject to be the difference _QuaternionObject between the original and the given one. This is useful when you need to find the quaternion that was used to make a rotation from the original to the given one.
     * @memberof _QuaternionManipulation
     * @param {_QuaternionObject} quaternion A _QuaternionObject used to calculate the difference
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    difference: ( quaternion ) => {
      return Quaternion( original ).multiply( Quaternion( quaternion ).clone().inverse().toObject() )
    },

    /**
     * Multiplies the original _QuaternionObject with a _QuaternionObject. Remember quaternion multiplication is not commutative. If you want to combine quaternions you probably want to use premultiply.
     * @memberof _QuaternionManipulation
     * @param {_QuaternionObject} quaternion A _QuaternionObject to multiply with
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    multiply: ( quaternion ) => {
      const qax = original.x; const qay = original.y; const qaz = original.z; const qaw = original.w
      const qbx = quaternion.x; const qby = quaternion.y; const qbz = quaternion.z; const qbw = quaternion.w

      original.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby
      original.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz
      original.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx
      original.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz

      return Quaternion( original )
    },

    /**
     * Multiplies a _QuaternionObject with the original _QuaternionObject. Remember quaternion multiplication is not commutative. If you have 3 quaternions, q1, q2 and q3. And you want to combine (q1 with q2) with q3, you need to use premultiply like this: q1.premultiply(q2).premultiply(q3). In this example q1 will contain the data of all 3 quaternions
     * @memberof _QuaternionManipulation
     * @param {_QuaternionObject} quaternion A _QuaternionObject to premultiply with
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    premultiply: ( quaternion ) => {
      return Quaternion( original ).copy( Quaternion( quaternion ).clone().multiply( original ).toObject() )
    },

    /**
     * Invers the original _QuaternionObject. A quaternion to the power of -1.
     * @memberof _QuaternionManipulation
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    inverse: () => {
      original.x = -original.x
      original.y = -original.y
      original.z = -original.z
      return Quaternion( original )
    },

    /**
     * Normalize the original _QuaternionObject
     * @memberof _QuaternionManipulation
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    normalize: () => {
      const length = Quaternion( original ).length()

      if ( length === 0 ) {
        return Quaternion()
      } else {
        original.x /= length
        original.y /= length
        original.z /= length
        original.w /= length
      }
      return Quaternion( original )
    },

    /**
     * Calculates the length of the original _QuaternionObject
     * @memberof _QuaternionManipulation
     * @returns {Number} The length of the original _QuaternionObject
     */
    length: () => {
      return Math.sqrt( Quaternion( original ).doubleLength() )
    },

    /**
     * Calculates the length of the original _QuaternionObject to the power of 2
     * @memberof _QuaternionManipulation
     * @returns {Number} The length of the original _QuaternionObject to the power of 2
     */
    doubleLength: () => {
      return original.x * original.x + original.y * original.y + original.z * original.z + original.w * original.w
    },

    /**
     * Calculates the dot product between the original _QuaternionObject and the given _QuaternionObject
     * @memberof _QuaternionManipulation
     * @param {_QuaternionObject} quaternion The _QuaternionObject used to calculate the dot product
     * @returns {Number} The dot product between the original _QuaternionObject and the given _QuaternionObject
     */
    dot: ( quaternion ) => {
      return original.x * quaternion.x + original.y * quaternion.y + original.z * quaternion.z + original.w * quaternion.w
    },

    /**
     * Returns the angle (in radians) between the original _QuaternionObject and the give _QuaternionObject ( between 0 and PI )
     * @memberof _QuaternionManipulation
     * @param {_QuaternionObject} quaternion The _QuaternionObject used to form the angle
     * @returns {Number} The angle in radians between the original _QuaternionObject and the given _QuaternionObject
     */
    angle: ( quaternion ) => {
      const dot = Math.max( -1, Math.min( 1, Quaternion( original ).dot( quaternion ) ) )
      return 2 * Math.acos( Math.abs( dot ) )
    },

    /**
     * Sets the original _QuaternionObject to be the quaternion defined by an axis and an angle in radians
     * @memberof _QuaternionManipulation
     * @param {_VectorObject} axis The axis used in determining the quaternion. IMPORTANT: The axis MUST BE NORMALIZED
     * @param {Number} angle An angle in radians
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    fromAxisAngle: ( axis, angle ) => {
      const halfAngle = angle / 2
      const sin = Math.sin( halfAngle )

      original.x = axis.x * sin
      original.y = axis.y * sin
      original.z = axis.z * sin
      original.w = Math.cos( halfAngle )
      return Quaternion( original )
    },

    /**
     * Sets the original _QuaternionObject to be the quaternion defined by 2 unit vectors
     * @memberof _QuaternionManipulation
     * @param {_VectorObject} vector1 The FROM vector. IMPORTANT: The vector MUST BE NORMALIZED
     * @param {_VectorObject} vector2 The TO vector. IMPORTANT: The vector MUST BE NORMALIZED
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    fromUnitVectors: ( vector1, vector2 ) => {
      let radius = Vector( vector1 ).dot( vector2 ) + 1

      if ( radius < Number.EPSILON ) {
        // vector1 and vector2 point in opposite directions
        radius = 0
        if ( Math.abs( vector1.x ) > Math.abs( vector1.z ) ) {
          original.x = -vector1.y
          original.y = vector1.x
          original.z = 0
          original.w = radius
        } else {
          original.x = 0
          original.y = -vector1.z
          original.z = vector1.y
          original.w = radius
        }
      } else {
        original.x = vector1.y * vector2.z - vector1.z * vector2.y
        original.y = vector1.z * vector2.x - vector1.x * vector2.z
        original.z = vector1.x * vector2.y - vector1.y * vector2.x
        original.w = radius
      }
      return Quaternion( original ).normalize()
    },

    /**
     * Sets the original _QuaternionObject to the linear interpolation with another _QuaternionObject
     * @memberof _QuaternionManipulation
     * @param {_QuaternionObject} quaternion The _QuaternionObject to interpolate with
     * @param {Number} [time=1] The time of interpolation. Between 0 and 1
     * @returns {_QuaternionManipulation} Returns a set of functions used to manipulate the _QuaternionObject
     */
    slerp: ( quaternion, time ) => {
      if ( time <= 0 ) {
        return Quaternion( original )
      }
      if ( time >= 1 ) {
        return Quaternion( original ).copy( quaternion )
      }

      const x = original.x
      const y = original.y
      const z = original.z
      const w = original.w

      let cosHalfTheta = w * quaternion.w + x * quaternion.x + y * quaternion.y + z * quaternion.z

      if ( cosHalfTheta < 0 ) {
        original.x = -quaternion.x
        original.y = -quaternion.y
        original.z = -quaternion.z
        original.w = -quaternion.w
        cosHalfTheta = -cosHalfTheta
      } else {
        Quaternion( original ).copy( quaternion )
      }

      if ( cosHalfTheta >= 1.0 ) {
        original.x = x
        original.y = y
        original.z = z
        original.w = w
        return Quaternion( original )
      }

      const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta
      if ( sqrSinHalfTheta <= Number.EPSILON ) {
        const s = 1 - time
        original.x = s * x + time * original.x
        original.y = s * y + time * original.y
        original.z = s * z + time * original.z
        original.w = s * w + time * original.w
        return Quaternion( original ).normalize()
      }

      const sinHalfTheta = Math.sqrt( sqrSinHalfTheta )
      const halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta )
      const ratioA = Math.sin( ( 1 - time ) * halfTheta ) / sinHalfTheta
      const ratioB = Math.sin( time * halfTheta ) / sinHalfTheta

      original.x = ( x * ratioA + original.x * ratioB )
      original.y = ( y * ratioA + original.y * ratioB )
      original.z = ( z * ratioA + original.z * ratioB )
      original.w = ( w * ratioA + original.w * ratioB )

      return Quaternion( original )
    }
  }
}

/**
 * An object containing A set of functions used to manipulate the _QuaternionObject. This is returned by the quaternion() function. All manipulation functions will alter the _QuaternionObject generated by quaternion()
 * @typedef {Object} _QuaternionManipulation
 */
