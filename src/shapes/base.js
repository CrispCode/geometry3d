'use strict'

import Vector from './../math/vector.js'
import Quaternion from './../math/quaternion.js'

export default class Base {
  _type = this.constructor.name

  get type () {
    return this._type
  }

  _position = Vector.create()
  _scale = 1
  _rotation = Quaternion.create()

  get position () {
    return Vector( this._position ).clone().toObject()
  }

  get scale () {
    return this._scale
  }

  get rotation () {
    return Quaternion( this._rotation ).clone().toObject()
  }

  _bounds = {
    min: Vector.create(),
    max: Vector.create()
  }

  get bounds () {
    return {
      min: Vector( this._bounds.min ).clone().toObject(),
      max: Vector( this._bounds.max ).clone().toObject()
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
      Vector( shape._position ).add( translate )
    }
    if ( scale && typeof scale === 'number' ) {
      shape._scale *= scale
    }
    if ( rotate && Quaternion.isValid( rotate ) ) {
      Quaternion( shape._rotation ).premultiply( rotate )
    }

    this.updateBounds( shape )
  }

  static isValid ( shape ) {
    return ( shape instanceof this )
  }
}
