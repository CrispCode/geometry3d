'use strict'

import Base from './base.js'

import Vector from './../../src/math/vector.js'

export default class Sphere extends Base {
  _radius = 1

  get radius () {
    return this._radius
  }

  constructor ( radius ) {
    super()

    this._radius = ( typeof radius === 'number' ) ? radius : this._radius
  }

  static updateBounds ( sphere ) {
    Vector( sphere._bounds.min ).addScalar( -1 * sphere.radius )
    Vector( sphere._bounds.max ).addScalar( 1 * sphere.radius )
  }

  static transform ( sphere, translate, scale, rotate ) {
    sphere._radius *= scale

    super.transform( sphere, translate, scale, rotate )
  }
}
