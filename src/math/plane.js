'use strict'

import Vector from './vector.js'

export default function Plane ( plane ) {
  const original = Plane.isValid( plane ) ? plane : Plane.create()

  return {
    toObject: () => {
      return original
    },

    clone: () => {
      return Plane( Plane.create( Vector( original.n ).clone().toObject(), original.c ) )
    },

    copy: ( plane ) => {
      Vector( original.n ).copy( plane.n )
      original.c = plane.c
      return Plane( original )
    },

    reverse: () => {
      Vector( original.n ).reverse()
      original.c *= -1
      return Plane( original )
    },

    rotate: ( quaternion ) => {
      Vector( original.n ).rotate( quaternion )
      original.c = original.c * original.n.x + original.c * original.n.y + original.c * original.n.z
      return Plane( original )
    }
  }
}

// The vector must be normalized
Plane.create = ( vector, constant = 0 ) => {
  return {
    n: Vector.isValid( vector ) ? vector : Vector.create( 0, 1, 0 ),
    c: constant
  }
}

Plane.isValid = ( plane ) => {
  return (
    typeof plane === 'object' &&
    Vector.isValid( plane.n ) &&
    typeof plane.c === 'number'
  )
}

Plane.isEqual = ( plane1, plane2 ) => {
  return (
    Vector.isEqual( plane1.n, plane2.n ) &&
    plane1.c === plane2.c
  )
}
