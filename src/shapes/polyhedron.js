'use strict'

import Base from './base.js'

import Vector from './../math/vector.js'
import Triangle from './../math/triangle.js'

export default class Polyhedron extends Base {
  #vertices = []
  #faces = []

  vertices = []
  faces = []

  constructor ( vertices, indexes = [] ) {
    super()

    const min = Vector.create( Infinity, Infinity, Infinity )
    const max = Vector.create( -Infinity, -Infinity, -Infinity )

    if ( indexes.length === 0 ) {
      for ( let i = 0, l = vertices.length; i < l; i = i + 9 ) {
        let v1 = Vector.create( vertices[ i ], vertices[ i + 1 ], vertices[ i + 2 ] )
        let v2 = Vector.create( vertices[ i + 3 ], vertices[ i + 4 ], vertices[ i + 5 ] )
        let v3 = Vector.create( vertices[ i + 6 ], vertices[ i + 7 ], vertices[ i + 8 ] )
        let cv1 = Vector( v1 ).clone().toObject()
        let cv2 = Vector( v2 ).clone().toObject()
        let cv3 = Vector( v3 ).clone().toObject()

        // Make sure we have no duplicated vertices
        const pv1 = this.#vertices.find( ( v ) => { return Vector.isEqual( v, v1 ) } )
        if ( !pv1 ) {
          this.#vertices.push( v1 )
        } else {
          v1 = pv1
        }
        const cpv1 = this.vertices.find( ( v ) => { return Vector.isEqual( v, cv1 ) } )
        if ( !cpv1 ) {
          this.vertices.push( cv1 )
        } else {
          cv1 = cpv1
        }

        const pv2 = this.#vertices.find( ( v ) => { return Vector.isEqual( v, v2 ) } )
        if ( !pv2 ) {
          this.#vertices.push( v2 )
        } else {
          v2 = pv2
        }
        const cpv2 = this.vertices.find( ( v ) => { return Vector.isEqual( v, cv2 ) } )
        if ( !cpv2 ) {
          this.vertices.push( cv2 )
        } else {
          cv2 = cpv2
        }

        const pv3 = this.#vertices.find( ( v ) => { return Vector.isEqual( v, v3 ) } )
        if ( !pv3 ) {
          this.#vertices.push( v3 )
        } else {
          v3 = pv3
        }
        const cpv3 = this.vertices.find( ( v ) => { return Vector.isEqual( v, cv3 ) } )
        if ( !cpv3 ) {
          this.vertices.push( cv3 )
        } else {
          cv3 = cpv3
        }

        // Compute bounding box
        const checkVertexIfOuter = ( vertex ) => {
          if ( vertex.x < min.x ) { min.x = vertex.x }
          if ( vertex.y < min.y ) { min.y = vertex.y }
          if ( vertex.z < min.z ) { min.z = vertex.z }
          if ( vertex.x > max.x ) { max.x = vertex.x }
          if ( vertex.y > max.y ) { max.y = vertex.y }
          if ( vertex.z > max.z ) { max.z = vertex.z }
        }
        checkVertexIfOuter( v1 )
        checkVertexIfOuter( v2 )
        checkVertexIfOuter( v3 )

        // Since we don't have indexes we automatically compute faces
        this.#faces.push( Triangle.create( v1, v2, v3 ) )
        this.faces.push( Triangle.create( cv1, cv2, cv3 ) )
      }
    } else {
      for ( let i = 0, l = vertices.length; i < l; i = i + 3 ) {
        let v = Vector.create( vertices[ i ], vertices[ i + 1 ], vertices[ i + 2 ] )
        let cv = Vector( v ).clone().toObject()

        this.#vertices.push( v )
        this.vertices.push( cv )

        // Compute bounding box
        if ( v.x < min.x ) { min.x = v.x }
        if ( v.y < min.y ) { min.y = v.y }
        if ( v.z < min.z ) { min.z = v.z }
        if ( v.x > max.x ) { max.x = v.x }
        if ( v.y > max.y ) { max.y = v.y }
        if ( v.z > max.z ) { max.z = v.z }
      }

      // Create faces from indexes
      for ( let i = 0, l = indexes.length; i < l; i = i + 3 ) {
        const i1 = indexes[ i ]
        const i2 = indexes[ i + 1 ]
        const i3 = indexes[ i + 2 ]

        const v1 = this.#vertices[ i1 ]
        const v2 = this.#vertices[ i2 ]
        const v3 = this.#vertices[ i3 ]
        const cv1 = this.vertices[ i1 ]
        const cv2 = this.vertices[ i2 ]
        const cv3 = this.vertices[ i3 ]

        this.#faces.push( Triangle.create( v1, v2, v3 ) )
        this.faces.push( Triangle.create( cv1, cv2, cv3 ) )
      }
    }

    Vector( this.bounds.min ).copy( min )
    Vector( this.bounds.max ).copy( max )
  }

  update () {
    if ( this.needsUpdate ) {
      const min = Vector.create( Infinity, Infinity, Infinity )
      const max = Vector.create( -Infinity, -Infinity, -Infinity )

      this.vertices.forEach( ( vertex, index ) => {
        const mutatedVertex = Vector( this.#vertices[ index ] ).clone().toObject()
        Vector( mutatedVertex ).multiplyScalar( this.scale )
        Vector( mutatedVertex ).rotate( this.rotation ).toObject()
        Vector( vertex ).copy( mutatedVertex )

        if ( vertex.x < min.x ) { min.x = vertex.x }
        if ( vertex.y < min.y ) { min.y = vertex.y }
        if ( vertex.z < min.z ) { min.z = vertex.z }
        if ( vertex.x > max.x ) { max.x = vertex.x }
        if ( vertex.y > max.y ) { max.y = vertex.y }
        if ( vertex.z > max.z ) { max.z = vertex.z }
      } )

      Vector( this.bounds.min ).copy( min )
      Vector( this.bounds.max ).copy( max )
    }

    super.update()
  }
}
