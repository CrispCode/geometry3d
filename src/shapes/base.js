'use strict'

import uid from './../utils/uid.js'
import Vector from './../math/vector.js'
import Quaternion from './../math/quaternion.js'

export default class Base {
  #id = uid()

  get id () {
    return this.#id
  }

  #type = this.constructor.name

  get type () {
    return this.#type
  }

  #position = Vector.create()
  #scale = 1
  #rotation = Quaternion.create()

  get position () {
    return Vector( this.#position ).clone().toObject()
  }

  get scale () {
    return this.#scale
  }

  get rotation () {
    return Quaternion( this.#rotation ).clone().toObject()
  }

  #bounds = {
    min: Vector.create(),
    max: Vector.create()
  }

  get bounds () {
    return {
      min: this.#bounds.min,
      max: this.#bounds.max
    }
  }

  constructor () {
    if ( this.constructor.name === 'Base' ) {
      throw new Error( 'Cannot create instance of abstract class ' + this.constructor.name )
    }
  }

  static updateBounds () {
    throw new Error( '.updateBounds() is not implemented' )
  }

  static transform ( shape, translate = null, scale = null, rotate = null ) {
    if ( translate && Vector.isValid( translate ) ) {
      Vector( shape.#position ).add( translate )
    }
    if ( scale && typeof scale === 'number' ) {
      shape.#scale *= scale
    }
    if ( rotate && Quaternion.isValid( rotate ) ) {
      Quaternion( shape.#rotation ).premultiply( rotate )
    }

    this.updateBounds( shape )
  }

  static isValid ( shape ) {
    return ( shape instanceof this )
  }
}
