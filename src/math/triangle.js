'use strict'

import Vector from './vector.js'

export default function Triangle ( triangle ) {
  const original = Triangle.isValid( triangle ) ? triangle : Triangle.create()

  return {
    toObject: () => {
      return original
    },

    clone: () => {
      return Triangle( Triangle.create(
        Vector( original.a ).clone().toObject(),
        Vector( original.b ).clone().toObject(),
        Vector( original.c ).clone().toObject()
      ) )
    },

    copy: ( triangle ) => {
      Vector( original.a ).copy( triangle.a )
      Vector( original.b ).copy( triangle.b )
      Vector( original.c ).copy( triangle.c )
      return Triangle( original )
    },

    normal: () => {
      const vCB = Vector( original.c ).clone().subtract( original.b ).toObject()
      const vAB = Vector( original.a ).clone().subtract( original.b ).toObject()
      return Vector( Vector.cross( vCB, vAB ) ).normalize().toObject()
    },

    getBarycentric ( point ) {
      const v0 = Vector( original.c ).clone().subtract( original.b ).toObject()
      const v1 = Vector( original.a ).clone().subtract( original.b ).toObject()

      const v2 = Vector( point ).clone().subtract( original.b ).toObject()

      const dot00 = Vector.dot( v0, v0 )
      const dot01 = Vector.dot( v0, v1 )
      const dot02 = Vector.dot( v0, v2 )
      const dot11 = Vector.dot( v1, v1 )
      const dot12 = Vector.dot( v1, v2 )

      const denominator = dot00 * dot11 - dot01 * dot01
      const u = ( dot11 * dot02 - dot01 * dot12 ) / denominator
      const v = ( dot00 * dot12 - dot01 * dot02 ) / denominator
      const w = 1 - u - v

      return {
        a: v,
        b: w,
        c: u
      }
    }
  }
}

Triangle.create = ( a, b, c ) => {
  return {
    a: Vector.isValid( a ) ? a : Vector.create( 0, 0, 0 ),
    b: Vector.isValid( b ) ? b : Vector.create( 1, 0, 0 ),
    c: Vector.isValid( c ) ? c : Vector.create( 0, 1, 0 )
  }
}

Triangle.isValid = ( triangle ) => {
  return (
    typeof triangle === 'object' &&
    Vector.isValid( triangle.a ) &&
    Vector.isValid( triangle.b ) &&
    Vector.isValid( triangle.c )
  )
}

Triangle.isEqual = ( triangle1, triangle2 ) => {
  return (
    (
      Vector.isEqual( triangle1.a, triangle2.a ) &&
      Vector.isEqual( triangle1.b, triangle2.b ) &&
      Vector.isEqual( triangle1.c, triangle2.c )
    ) ||
    (
      Vector.isEqual( triangle1.a, triangle2.a ) &&
      Vector.isEqual( triangle1.b, triangle2.c ) &&
      Vector.isEqual( triangle1.c, triangle2.b )
    ) ||
    (
      Vector.isEqual( triangle1.a, triangle2.b ) &&
      Vector.isEqual( triangle1.b, triangle2.c ) &&
      Vector.isEqual( triangle1.c, triangle2.a )
    ) ||
    (
      Vector.isEqual( triangle1.a, triangle2.b ) &&
      Vector.isEqual( triangle1.b, triangle2.a ) &&
      Vector.isEqual( triangle1.c, triangle2.c )
    ) ||
    (
      Vector.isEqual( triangle1.a, triangle2.c ) &&
      Vector.isEqual( triangle1.b, triangle2.a ) &&
      Vector.isEqual( triangle1.c, triangle2.b )
    ) ||
    (
      Vector.isEqual( triangle1.a, triangle2.c ) &&
      Vector.isEqual( triangle1.b, triangle2.b ) &&
      Vector.isEqual( triangle1.c, triangle2.a )
    )
  )
}
