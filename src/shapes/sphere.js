'use strict'

import { Base } from './base.js'

import { Vector } from './../../src/math/vector.js'

export class Sphere extends Base {
  #radius = 1

  radius = 1

  constructor ( radius = 1 ) {
    super()

    this.#radius = radius
    this.radius = radius

    // Compute bounding box
    Vector( this.bounds.min ).copy( Vector.create( -1 * radius, -1 * radius, -1 * radius ) )
    Vector( this.bounds.max ).copy( Vector.create( 1 * radius, 1 * radius, 1 * radius ) )
  }

  update () {
    if ( this.needsUpdate ) {
      const radius = this.#radius * this.scale
      this.radius = radius

      // Compute bounding box
      Vector( this.bounds.min ).copy( Vector.create( -1 * radius, -1 * radius, -1 * radius ) )
      Vector( this.bounds.max ).copy( Vector.create( 1 * radius, 1 * radius, 1 * radius ) )
    }

    super.update()
  }
}
