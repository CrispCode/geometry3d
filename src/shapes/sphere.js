'use strict'

import { Shape } from './shape.js'

import { Vector } from './../../src/math/vector.js'

export class Sphere extends Shape {
  #radius = 1
  set radius ( value ) {
    if ( !( typeof value === 'number' && !Number.isNaN( value ) ) ) {
      throw new Error( 'Radius needs to be a Number' )
    }
    this.#radius = value
    this.#worldRadius = value * this.scale
    this.#updateBoundingBox()
  }
  get radius () {
    return this.#radius
  }

  #worldRadius = 1
  get worldRadius () {
    return this.#worldRadius
  }

  #updateBoundingBox () {
    Vector( this.boundsMin ).copy( Vector.create( -1 * this.radius * this.scale, -1 * this.radius * this.scale, -1 * this.radius * this.scale ) )
    Vector( this.boundsMax ).copy( Vector.create( 1 * this.radius * this.scale, 1 * this.radius * this.scale, 1 * this.radius * this.scale ) )
  }

  set scale ( value ) {
    super.scale = value
    this.#worldRadius = this.#radius * value
    this.#updateBoundingBox()
  }
  get scale () {
    return super.scale
  }

  constructor ( radius = 1 ) {
    super()

    this.radius = radius
  }
}
