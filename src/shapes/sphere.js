'use strict'

import Base from './base.js'

import Vector from './../../src/math/vector.js'

export default class Sphere extends Base {
  #radius = 1

  get radius () {
    return this.#radius
  }

  constructor ( radius ) {
    super()

    this.#radius = ( typeof radius === 'number' ) ? radius : this.#radius

    this.constructor.updateBounds( this )
  }

  static updateBounds ( sphere ) {
    Vector( sphere.bounds.min ).copy( Vector.create( -1 * sphere.radius, -1 * sphere.radius, -1 * sphere.radius ) )
    Vector( sphere.bounds.max ).copy( Vector.create( 1 * sphere.radius, 1 * sphere.radius, 1 * sphere.radius ) )
  }

  static transform ( sphere, translate, scale, rotate ) {
    if ( scale && typeof scale === 'number' ) {
      sphere.#radius *= scale
    }

    super.transform( sphere, translate, scale, rotate )
  }
}
