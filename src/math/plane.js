'use strict'

import { Vector } from './vector.js'

export function Plane ( plane ) {
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
    },

    distanceToPoint ( point ) {
      return Vector.dot( original.n, point ) + original.c
    },

    containsPoint ( point ) {
      return ( Math.abs( Plane( original ).distanceToPoint( point ) ) <= Number.EPSILON )
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

// The vector must be normalized
Plane.fromNormalAndPoint = ( normal, point ) => {
  return Plane.create( normal, -1 * Vector.dot( normal, point ) )
}

Plane.fromPoints = ( a, b, c ) => {
  const ab = Vector( a ).clone().subtract( b ).toObject()
  const cb = Vector( c ).clone().subtract( b ).toObject()
  const normal = Vector( Vector.cross( cb, ab ) ).normalize().toObject()

  return Plane.fromNormalAndPoint( normal, a )
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
