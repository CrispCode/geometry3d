'use strict'

import { uid } from './../utils/uid.js'
import { Vector } from './../math/vector.js'
import { Quaternion } from './../math/quaternion.js'

export class Shape {
  #id = uid()
  get id () {
    return this.#id
  }

  #type = this.constructor.name.toLocaleLowerCase()
  get type () {
    return this.#type
  }

  #position = Vector.create()
  set position ( vector ) {
    if ( !Vector.isValid( vector ) ) {
      throw new Error( 'Position needs to be a Vector' )
    }
    Vector( this.#position ).copy( vector )
  }
  get position () {
    return this.#position
  }

  #scale = 1
  set scale ( value ) {
    if ( !( typeof value === 'number' && !Number.isNaN( value ) && value >= 0 ) ) {
      throw new Error( 'Scale needs to be a positive Number' )
    }
    this.#scale = value
  }
  get scale () {
    return this.#scale
  }

  #rotation = Quaternion.create()
  set rotation ( quaternion ) {
    if ( !Quaternion.isValid( quaternion ) ) {
      throw new Error( 'Rotation needs to be a Quaternion' )
    }
    Quaternion( this.#rotation ).copy( quaternion )
  }
  get rotation () {
    return this.#rotation
  }

  #boundsMin = Vector.create()
  get boundsMin () {
    return this.#boundsMin
  }
  #boundsMax = Vector.create()
  get boundsMax () {
    return this.#boundsMax
  }

  constructor () {
    if ( this.constructor.name === 'Shape' ) {
      throw new Error( 'Cannot create instance of abstract class Shape' )
    }
  }

  static isValid ( shape ) {
    return ( shape instanceof this )
  }
}
