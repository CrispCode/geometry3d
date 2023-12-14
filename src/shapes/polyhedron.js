'use strict'

import { Shape } from './shape.js'

import { Vector } from './../math/vector.js'

export class Polyhedron extends Shape {
  #vertices = []
  set vertices ( vertices ) {
    if ( !Array.isArray( vertices ) ) {
      throw new Error( 'Vertices needs to be an array of Vectors' )
    }
    this.#vertices = []
    this.#worldVertices = []
    this.#faces = []
    const min = Vector.create( Infinity, Infinity, Infinity )
    const max = Vector.create( -Infinity, -Infinity, -Infinity )
    for ( let i = 0, l = vertices.length; i < l; i++ ) {
      const vertex = vertices[ i ]
      if ( !Vector.isValid( vertex ) ) {
        throw new Error( 'Vertices needs to be an array of Vectors' )
      }
      if ( !this.#vertices.includes( vertex ) ) {
        this.#vertices.push( vertex )
        this.#worldVertices.push( Vector( vertex ).clone().toObject() )
      }
      this.#faces.push( this.#vertices.indexOf( vertex ) )
      this.#expandBoundsWithVertex( min, max, vertex )
    }
    Vector( this.boundsMin ).copy( min )
    Vector( this.boundsMax ).copy( max )
  }
  get vertices () {
    return this.#vertices
  }

  #faces = []
  get faces () {
    return this.#faces
  }

  #worldVertices = []
  get worldVertices () {
    return this.#worldVertices
  }

  #expandBoundsWithVertex ( min, max, vertex ) {
    if ( vertex.x < min.x ) { min.x = vertex.x }
    if ( vertex.y < min.y ) { min.y = vertex.y }
    if ( vertex.z < min.z ) { min.z = vertex.z }
    if ( vertex.x > max.x ) { max.x = vertex.x }
    if ( vertex.y > max.y ) { max.y = vertex.y }
    if ( vertex.z > max.z ) { max.z = vertex.z }
  }

  #updateWorldVertices ( f ) {
    const min = Vector.create( Infinity, Infinity, Infinity )
    const max = Vector.create( -Infinity, -Infinity, -Infinity )
    this.#worldVertices = []
    for ( let i = 0, l = this.vertices.length; i < l; i++ ) {
      const vertex = this.vertices[ i ]
      const cloned = Vector( vertex ).clone().toObject()
      f( cloned )
      this.#worldVertices.push( cloned )
      this.#expandBoundsWithVertex( min, max, cloned )
    }
    Vector( this.boundsMin ).copy( min )
    Vector( this.boundsMax ).copy( max )
  }

  set scale ( value ) {
    super.scale = value
    this.#updateWorldVertices( ( vertex ) => {
      Vector( vertex ).multiplyScalar( value )
      Vector( vertex ).rotate( this.rotation )
    } )
  }
  get scale () {
    return super.scale
  }

  set rotation ( quaternion ) {
    super.rotation = quaternion
    this.#updateWorldVertices( ( vertex ) => {
      Vector( vertex ).multiplyScalar( this.scale )
      Vector( vertex ).rotate( quaternion )
    } )
  }
  get rotation () {
    return super.rotation
  }

  constructor ( vertices = [] ) {
    super()

    this.vertices = vertices
  }
}
