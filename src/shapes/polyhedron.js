'use strict'

import Base from './base.js'

import Vector from './../math/vector.js'
import Triangle from './../math/triangle.js'

export default class Polyhedron extends Base {
  #vertices = []
  #faces = []
  #normals = []

  get vertices () {
    return [ ...this.#vertices ]
  }
  get faces () {
    return [ ...this.#faces ]
  }
  get normals () {
    return [ ...this.#normals ]
  }

  constructor ( vertices ) {
    super()

    for ( let i = 0, l = vertices.length; i < l; i = i + 3 ) {
      const v1 = vertices[ i ]
      const v2 = vertices[ i + 1 ]
      const v3 = vertices[ i + 2 ]

      if ( this.#vertices.indexOf( v1 ) === -1 ) { this.#vertices.push( v1 ) }
      if ( this.#vertices.indexOf( v2 ) === -1 ) { this.#vertices.push( v2 ) }
      if ( this.#vertices.indexOf( v3 ) === -1 ) { this.#vertices.push( v3 ) }

      const face = Triangle.create( v1, v2, v3 )
      this.#faces.push( face )
      this.#normals.push( Triangle( face ).normal() )
    }

    this.constructor.updateBounds( this )
  }

  static updateBounds ( polyhedron ) {
    const min = Vector.create( Infinity, Infinity, Infinity )
    const max = Vector.create( -Infinity, -Infinity, -Infinity )

    polyhedron.vertices.forEach( ( vector ) => {
      if ( vector.x < min.x ) { min.x = vector.x }
      if ( vector.y < min.y ) { min.y = vector.y }
      if ( vector.z < min.z ) { min.z = vector.z }
      if ( vector.x > max.x ) { max.x = vector.x }
      if ( vector.y > max.y ) { max.y = vector.y }
      if ( vector.z > max.z ) { max.z = vector.z }
    } )

    Vector( polyhedron.bounds.min ).copy( min )
    Vector( polyhedron.bounds.max ).copy( max )
  }

  static transform ( polyhedron, translate, scale, rotate ) {
    if ( scale || rotate ) {
      polyhedron.vertices.forEach( ( vertex ) => {
        if ( scale ) {
          Vector( vertex ).multiplyScalar( scale )
        }
        if ( rotate ) {
          Vector( vertex ).rotate( rotate )
        }
      } )
    }

    super.transform( polyhedron, translate, scale, rotate )
  }
}
