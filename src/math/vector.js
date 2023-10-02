'use strict'

import { approx } from './../utils/approx.js'

export function Vector ( vector ) {
  const original = Vector.isValid( vector ) ? vector : Vector.create()

  return {
    toObject: () => {
      return original
    },

    clone: () => {
      return Vector( Vector.create( original.x, original.y, original.z ) )
    },

    copy: ( vector ) => {
      original.x = vector.x
      original.y = vector.y
      original.z = vector.z
      return Vector( original )
    },

    round: ( decimals = 0 ) => {
      original.x = approx( original.x, decimals )
      original.y = approx( original.y, decimals )
      original.z = approx( original.z, decimals )
      return Vector( original )
    },

    add: ( vector ) => {
      original.x += vector.x
      original.y += vector.y
      original.z += vector.z
      return Vector( original )
    },

    addScalar: ( value ) => {
      original.x += value
      original.y += value
      original.z += value
      return Vector( original )
    },

    subtract: ( vector ) => {
      original.x -= vector.x
      original.y -= vector.y
      original.z -= vector.z
      return Vector( original )
    },

    subtractScalar: ( value ) => {
      original.x -= value
      original.y -= value
      original.z -= value
      return Vector( original )
    },

    multiply: ( vector ) => {
      original.x *= vector.x
      original.y *= vector.y
      original.z *= vector.z
      return Vector( original )
    },

    multiplyScalar: ( value ) => {
      original.x *= value
      original.y *= value
      original.z *= value
      return Vector( original )
    },

    divide: ( vector ) => {
      original.x /= vector.x
      original.y /= vector.y
      original.z /= vector.z
      return Vector( original )
    },

    divideScalar: ( value ) => {
      original.x /= value
      original.y /= value
      original.z /= value
      return Vector( original )
    },

    reverse: () => {
      original.x = -original.x
      original.y = -original.y
      original.z = -original.z
      return Vector( original )
    },

    normalize: () => {
      return Vector( original ).divideScalar( Vector( original ).length() || 1 )
    },

    length: () => {
      return Math.sqrt( Vector( original ).doubleLength() )
    },

    doubleLength: () => {
      return original.x * original.x + original.y * original.y + original.z * original.z
    },

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
    },

    lerp: ( vector, time = 1 ) => {
      original.x = original.x + ( vector.x - original.x ) * time
      original.y = original.y + ( vector.y - original.y ) * time
      original.z = original.z + ( vector.z - original.z ) * time
      return Vector( original )
    }
  }
}

Vector.create = ( x = 0, y = 0, z = 0 ) => {
  return {
    x: x,
    y: y,
    z: z
  }
}

Vector.isValid = ( vector ) => {
  return (
    typeof vector === 'object' &&
    typeof vector.x === 'number' &&
    typeof vector.y === 'number' &&
    typeof vector.z === 'number'
  )
}

Vector.isEqual = ( vector1, vector2 ) => {
  return (
    vector1.x === vector2.x &&
    vector1.y === vector2.y &&
    vector1.z === vector2.z
  )
}

Vector.dot = ( vector1, vector2 ) => {
  return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z
}

Vector.cross = ( vector1, vector2 ) => {
  return Vector.create(
    vector1.y * vector2.z - vector1.z * vector2.y,
    vector1.z * vector2.x - vector1.x * vector2.z,
    vector1.x * vector2.y - vector1.y * vector2.x
  )
}

Vector.angle = ( vector1, vector2 ) => {
  const denominator = Math.sqrt( Vector( vector1 ).doubleLength() * Vector( vector2 ).doubleLength() )
  if ( denominator === 0 ) return Math.PI
  const dot = Vector.dot( vector1, vector2 )
  const cos = Math.max( -1, Math.min( 1, dot / denominator ) )
  return Math.acos( cos )
}
