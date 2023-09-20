'use strict'

export class Element {
  get color () {
    return 0x000000
  }
  get colorWireframe () {
    return 0xFFFFFF
  }
  get colorFocus () {
    return 0xFF0000
  }
  get colorBounds () {
    return 0xFF0000
  }

  #element = null
  get element () {
    return this.#element
  }

  #data = null
  get data () {
    return this.#data
  }

  create () {}

  constructor ( data ) {
    if ( this.constructor.name === 'Element' ) {
      throw new Error( 'Cannot create instance of abstract class ' + this.constructor.name )
    }

    this.#data = data
    this.#element = this.create()
  }

  destroy () {
    const digdeep = ( o ) => {
      o.children.forEach( ( child ) => {
        digdeep( child )
      } )
      o.geometry.dispose()
      o.material.dispose()
    }
    digdeep( this.#element )
  }

  update () {}

  focus () {
    this.#element.material.color.set( this.colorFocus )
  }
  unfocus () {
    this.#element.material.color.set( this.color )
  }
}
