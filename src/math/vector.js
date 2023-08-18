'use strict'

import approx from './../utils/approx.js'

/**
 * The definition of a vector. You may alter this object with additional properties but they will be ignored by methods such as: copy(), clone(), isEqual()
 * @typedef {Object} _VectorObject
 * @property {Number} x The X coordonate in 3D space
 * @property {Number} y The Y coordonate in 3D space
 * @property {Number} z The Z coordonate in 3D space
 */

/**
 * A function used to manage mathematical vectors (_VectorObject). It will create an empty _VectorObject if an invalid parameter is received
 * @param {_VectorObject} [vector] A _VectorObject to perform operations on
 * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
 */
export function Vector ( vector ) {
  const original = Vector.isValid( vector ) ? vector : Vector.create()

  return {
    /**
     * Returns the original _VectorObject
     * @memberof _VectorManipulation
     * @returns {_VectorObject} Returns the original _VectorObject
     */
    toObject: () => {
      return original
    },

    /**
     * Clones a _VectorObject
     * @memberof _VectorManipulation
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    clone: () => {
      return Vector( Vector.create( original.x, original.y, original.z ) )
    },

    /**
     * Copies the values of a _VectorObject into the original _VectorObject
     * @memberof _VectorManipulation
     * @param {_VectorObject} vector Source _VectorObject
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    copy: ( vector ) => {
      original.x = vector.x
      original.y = vector.y
      original.z = vector.z
      return Vector( original )
    },

    /**
     * Rounds the _VectorObject coordonates to a specified number of decimals
     * @memberof _VectorManipulation
     * @param {Number} [decimals=0] The number of decimals to round to
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    round: ( decimals = 0 ) => {
      original.x = approx( original.x, decimals )
      original.y = approx( original.y, decimals )
      original.z = approx( original.z, decimals )
      return Vector( original )
    },

    /**
     * Adds a VectorsObject to the original _VectorObject
     * @memberof _VectorManipulation
     * @param {_VectorObject} vector The _VectorObject to be added to the original _VectorObject
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    add: ( vector ) => {
      original.x += vector.x
      original.y += vector.y
      original.z += vector.z
      return Vector( original )
    },

    /**
     * Adds a scalar value to the original _VectorObject
     * @memberof _VectorManipulation
     * @param {Number} value The scalar number to be added to the original _VectorObject
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    addScalar: ( value ) => {
      original.x += value
      original.y += value
      original.z += value
      return Vector( original )
    },

    /**
     * Subtracts a VectorsObject from the original _VectorObject
     * @memberof _VectorManipulation
     * @param {_VectorObject} vector The _VectorObject subtracted from the original _VectorObject
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    subtract: ( vector ) => {
      original.x -= vector.x
      original.y -= vector.y
      original.z -= vector.z
      return Vector( original )
    },

    /**
     * Subtracts a scalar value from the original _VectorObject
     * @memberof _VectorManipulation
     * @param {Number} value The scalar value subtracted from the original _VectorObject
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    subtractScalar: ( value ) => {
      original.x -= value
      original.y -= value
      original.z -= value
      return Vector( original )
    },

    /**
     * Multiplies the original _VectorObject with the given _VectorObject
     * @memberof _VectorManipulation
     * @param {_VectorObject} vector The _VectorObject to multiply the original _VectorObject with
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    multiply: ( vector ) => {
      original.x *= vector.x
      original.y *= vector.y
      original.z *= vector.z
      return Vector( original )
    },

    /**
     * Multiplies the original _VectorObject with the given scalar value
     * @memberof _VectorManipulation
     * @param {Number} value The scalar value to multiply the original _VectorObject with
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    multiplyScalar: ( value ) => {
      original.x *= value
      original.y *= value
      original.z *= value
      return Vector( original )
    },

    /**
     * Divides the original _VectorObject by the given _VectorObject
     * @memberof _VectorManipulation
     * @param {_VectorObject} vector The _VectorObject to divide the original _VectorObject by
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    divide: ( vector ) => {
      original.x /= vector.x
      original.y /= vector.y
      original.z /= vector.z
      return Vector( original )
    },

    /**
     * Divides the original _VectorObject by the given scalar value
     * @memberof _VectorManipulation
     * @param {Number} value The scalar value to divide the original _VectorObject by
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    divideScalar: ( value ) => {
      original.x /= value
      original.y /= value
      original.z /= value
      return Vector( original )
    },

    /**
     * Reverse the original _VectorObject. A scalar -1 multiplication
     * @memberof _VectorManipulation
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    reverse: () => {
      original.x = -original.x
      original.y = -original.y
      original.z = -original.z
      return Vector( original )
    },

    /**
     * Normalize the original _VectorObject
     * @memberof _VectorManipulation
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    normalize: () => {
      return Vector( original ).divideScalar( Vector( original ).length() || 1 )
    },

    /**
     * Calculates the length of the original _VectorObject
     * @memberof _VectorManipulation
     * @returns {Number} The length of the original _VectorObject
     */
    length: () => {
      return Math.sqrt( Vector( original ).doubleLength() )
    },

    /**
     * Calculates the length of the original _VectorObject to the power of 2. Useful for sphere proximity check when exact value isn't important
     * @memberof _VectorManipulation
     * @returns {Number} The length of the original _VectorObject to the power of 2
     */
    doubleLength: () => {
      return original.x * original.x + original.y * original.y + original.z * original.z
    },

    /**
     * Rotate the original _VectorObject using a QuaternionObject
     * @memberof _VectorManipulation
     * @param {QuaternionObject} quaternion The QuaternionObject used to define the rotation
     * @returns {_VectorManipulation} Returns a set of functions used to manipulate the _VectorObject
     */
    rotate: ( quaternion ) => {
      const x = original.x
      const y = original.y
      const z = original.z

      const qx = quaternion.x
      const qy = quaternion.y
      const qz = quaternion.z
      const qw = quaternion.w

      // calculate quat * vector

      const ix = qw * x + qy * z - qz * y
      const iy = qw * y + qz * x - qx * z
      const iz = qw * z + qx * y - qy * x
      const iw = -qx * x - qy * y - qz * z

      // calculate result * inverse quat

      original.x = ix * qw + iw * -qx + iy * -qz - iz * -qy
      original.y = iy * qw + iw * -qy + iz * -qx - ix * -qz
      original.z = iz * qw + iw * -qz + ix * -qy - iy * -qx

      return Vector( original )
    }
  }
}

/**
 * A function used to create mathematical vectors (_VectorObject).
 * @param {Number} [x=0] The X coordonate in 3D space
 * @param {Number} [y=0] The Y coordonate in 3D space
 * @param {Number} [z=0] The Z coordonate in 3D space
 * @returns {_VectorObject} Returns a new _VectorObject
 */
Vector.create = ( x = 0, y = 0, z = 0 ) => {
  return {
    x: x,
    y: y,
    z: z
  }
}

/**
 * Checks if an object is a valid _VectorObject
 * @param {_VectorObject} vector The object to be checked
 * @returns {Boolean} Returns true if vector is a valid _VectorObject and false otherwise
 */
Vector.isValid = ( vector ) => {
  return (
    typeof vector === 'object' &&
    typeof vector.x === 'number' &&
    typeof vector.y === 'number' &&
    typeof vector.z === 'number'
  )
}

/**
 * Compares 2 _VectorObject
 * @param {_VectorObject} vector1 A _VectorObject
 * @param {_VectorObject} vector2 A _VectorObject
 * @returns {Boolean} Returns true if the values of _VectorObject match
 */
Vector.isEqual = ( vector1, vector2 ) => {
  return (
    vector1.x === vector2.x &&
    vector1.y === vector2.y &&
    vector1.z === vector2.z
  )
}

/**
 * Calculates the dot product between 2 _VectorObject
 * @param {_VectorObject} vector1 The _VectorObject used to calculate the dot product
 * @param {_VectorObject} vector2 The _VectorObject used to calculate the dot product
 * @returns {Number} The dot product between the 2 given _VectorObject
 */
Vector.dot = ( vector1, vector2 ) => {
  return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z
}

/**
 * Calculates the cross product between 2 _VectorObject
 * @param {_VectorObject} vector1 The _VectorObject used to calculate the cross product
 * @param {_VectorObject} vector2 The _VectorObject used to calculate the cross product
 * @returns {_VectorObject} Returns the cross product _VectorObject
 */
Vector.cross = ( vector1, vector2 ) => {
  return Vector.create(
    vector1.y * vector2.z - vector1.z * vector2.y,
    vector1.z * vector2.x - vector1.x * vector2.z,
    vector1.x * vector2.y - vector1.y * vector2.x
  )
}

/**
 * Returns the angle (in radians) between the 2 _VectorObject
 * @param {_VectorObject} vector1 The _VectorObject used to calculate the angle
 * @param {_VectorObject} vector2 The _VectorObject used to calculate the angle
 * @returns {Number} The angle in radians
 */
Vector.angle = ( vector1, vector2 ) => {
  const denominator = Math.sqrt( Vector( vector1 ).doubleLength() * Vector( vector2 ).doubleLength() )
  if ( denominator === 0 ) return Math.PI
  const dot = Vector.dot( vector1, vector2 )
  const cos = Math.max( -1, Math.min( 1, dot / denominator ) )
  return Math.acos( cos )
}

/**
 * The linear interpolation between 2 _VectorObject
 * @param {_VectorObject} vector1 The from _VectorObject
 * @param {_VectorObject} vector2 The to _VectorObject
 * @param {Number} [time=1] The time of interpolation. Between 0 and 1
 * @returns {_VectorObject} Returns the _VectorObject representing the interpolation
 */
Vector.lerp = ( vector1, vector2, time = 1 ) => {
  return Vector.create(
    vector1.x + ( vector2.x - vector1.x ) * time,
    vector1.y + ( vector2.y - vector1.y ) * time,
    vector1.z + ( vector2.z - vector1.z ) * time
  )
}

/**
 * An object containing A set of functions used to manipulate the __VectorObject. This is returned by the vector() function. All manipulation functions will alter the __VectorObject generated by vector()
 * @typedef {Object} _VectorManipulation
 */
