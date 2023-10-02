'use strict'

import { approx } from './../utils/approx.js'
import { Vector } from './vector.js'

export function Quaternion ( quaternion ) {
  const original = Quaternion.isValid( quaternion ) ? quaternion : Quaternion.create()

  return {
    toObject: () => {
      return original
    },

    clone: () => {
      return Quaternion( Quaternion.create( original.x, original.y, original.z, original.w ) )
    },

    copy: ( quaternion ) => {
      original.x = quaternion.x
      original.y = quaternion.y
      original.z = quaternion.z
      original.w = quaternion.w
      return Quaternion( original )
    },

    round: ( decimals = 0 ) => {
      original.x = approx( original.x, decimals )
      original.y = approx( original.y, decimals )
      original.z = approx( original.z, decimals )
      original.w = approx( original.w, decimals )
      return Quaternion( original )
    },

    difference: ( quaternion ) => {
      return Quaternion( original ).multiply( Quaternion( quaternion ).clone().inverse().toObject() )
    },

    multiply: ( quaternion ) => {
      const qax = original.x; const qay = original.y; const qaz = original.z; const qaw = original.w
      const qbx = quaternion.x; const qby = quaternion.y; const qbz = quaternion.z; const qbw = quaternion.w

      original.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby
      original.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz
      original.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx
      original.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz

      return Quaternion( original )
    },

    premultiply: ( quaternion ) => {
      return Quaternion( original ).copy( Quaternion( quaternion ).clone().multiply( original ).toObject() )
    },

    inverse: () => {
      original.x = -original.x
      original.y = -original.y
      original.z = -original.z
      return Quaternion( original )
    },

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

    length: () => {
      return Math.sqrt( Quaternion( original ).doubleLength() )
    },

    doubleLength: () => {
      return original.x * original.x + original.y * original.y + original.z * original.z + original.w * original.w
    },

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
    },

    toEuler: () => {
      const x = original.x
      const y = original.y
      const z = original.z
      const w = original.w

      // Calculate the pitch (x-axis rotation)
      const sinPitch = 2.0 * ( w * x - y * z )
      const cosPitch = 1.0 - 2.0 * ( x * x + y * y )
      const pitch = Math.atan2( sinPitch, cosPitch )

      // Calculate the yaw (y-axis rotation)
      const sinYaw = 2.0 * ( w * y + x * z )
      const cosYaw = 1.0 - 2.0 * ( y * y + z * z )
      const yaw = Math.atan2( sinYaw, cosYaw )

      // Calculate the roll (z-axis rotation)
      const sinRoll = 2.0 * ( w * z + x * y )
      const cosRoll = 1.0 - 2.0 * ( y * y + z * z )
      const roll = Math.atan2( sinRoll, cosRoll )

      return {
        x: pitch,
        y: yaw,
        z: roll
      }
    }
  }
}

Quaternion.create = ( x = 0, y = 0, z = 0, w = 1 ) => {
  return {
    x: x,
    y: y,
    z: z,
    w: w
  }
}

Quaternion.fromAxisAngle = ( axis, angle ) => {
  const halfAngle = angle / 2
  const sin = Math.sin( halfAngle )

  return {
    x: axis.x * sin,
    y: axis.y * sin,
    z: axis.z * sin,
    w: Math.cos( halfAngle )
  }
}

Quaternion.fromUnitVectors = ( vector1, vector2 ) => {
  let radius = Vector.dot( vector1, vector2 ) + 1

  let x = 0
  let y = 0
  let z = 0
  let w = 1

  if ( radius < Number.EPSILON ) {
    // vector1 and vector2 point in opposite directions
    radius = 0
    if ( Math.abs( vector1.x ) > Math.abs( vector1.z ) ) {
      x = -vector1.y
      y = vector1.x
      z = 0
      w = radius
    } else {
      x = 0
      y = -vector1.z
      z = vector1.y
      w = radius
    }
  } else {
    x = vector1.y * vector2.z - vector1.z * vector2.y
    y = vector1.z * vector2.x - vector1.x * vector2.z
    z = vector1.x * vector2.y - vector1.y * vector2.x
    w = radius
  }
  return Quaternion( Quaternion.create( x, y, z, w ) ).normalize().toObject()
}

Quaternion.isValid = ( quaternion ) => {
  return (
    typeof quaternion === 'object' &&
    typeof quaternion.x === 'number' &&
    typeof quaternion.y === 'number' &&
    typeof quaternion.z === 'number' &&
    typeof quaternion.w === 'number'
  )
}

Quaternion.isEqual = ( quaternion1, quaternion2 ) => {
  return (
    quaternion1.x === quaternion2.x &&
    quaternion1.y === quaternion2.y &&
    quaternion1.z === quaternion2.z &&
    quaternion1.w === quaternion2.w
  )
}

Quaternion.dot = ( quaternion1, quaternion2 ) => {
  return quaternion1.x * quaternion2.x + quaternion1.y * quaternion2.y + quaternion1.z * quaternion2.z + quaternion1.w * quaternion2.w
}

Quaternion.angle = ( quaternion1, quaternion2 ) => {
  const dot = Math.max( -1, Math.min( 1, Quaternion.dot( quaternion1, quaternion2 ) ) )
  return 2 * Math.acos( Math.abs( dot ) )
}
