'use strict'

import uid from './../utils/uid.js'
import Vector from './../math/vector.js'
import Quaternion from './../math/quaternion.js'

export default class Base {
  #id = uid()
  get id () {
    return this.#id
  }

  #type = this.constructor.name.toLocaleLowerCase()
  get type () {
    return this.#type
  }

  #scale = 1
  #rotation = Quaternion.create()

  position = Vector.create()
  scale = 1
  rotation = Quaternion.create()

  get needsUpdate () {
    return ( this.scale !== this.#scale ) || !Quaternion.isEqual( this.rotation, this.#rotation )
  }

  bounds = {
    min: Vector.create(),
    max: Vector.create()
  }

  constructor () {
    if ( this.constructor.name === 'Base' ) {
      throw new Error( 'Cannot create instance of abstract class Base' )
    }
  }

  update () {
    if ( this.needsUpdate ) {
      this.#scale = this.scale
      Quaternion( this.#rotation ).copy( this.rotation )
    }
  }

  static isValid ( shape ) {
    return ( shape instanceof this )
  }
}
