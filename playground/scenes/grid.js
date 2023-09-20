'use strict'

import { Scene } from './scene.js'

import {
  Sphere,
  Box,
  Polyhedron,
  Vector,
  Quaternion,
  Grid
} from 'main'

import {
  BoxGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial
} from 'three'

export class SceneGrid extends Scene {
  #grid = new Grid( 10 )

  #meshes = new Map()

  #createMeshForCell ( data, size ) {
    const geometry = new BoxGeometry( size, size, size )
    const mesh = new LineSegments( new EdgesGeometry( geometry ), new LineBasicMaterial( { color: 0x0000FF } ) )
    mesh.name = data.id
    mesh.position.set( data.x * size + size / 2, data.y * size + size / 2, data.z * size + size / 2 )
    this.#meshes.set( data.id, mesh )
    return mesh
  }

  #createBoundingBoxForElement ( element ) {
    const boundsMin = element.bounds.min
    const boundsMax = element.bounds.max
    const geometry = new BoxGeometry( boundsMax.x - boundsMin.x, boundsMax.y - boundsMin.y, boundsMax.z - boundsMin.z )
    const boundingBox = new LineSegments( new EdgesGeometry( geometry ), new LineBasicMaterial( { color: 0xFF0000 } ) )
    const position = Vector( element.position ).clone().add( boundsMin ).add( Vector( boundsMax ).clone().subtract( boundsMin ).divideScalar( 2 ).toObject() ).toObject()
    boundingBox.position.set( position.x, position.y, position.z )
    return boundingBox
  }

  beforeRender () {
    this.#grid.clear()
  }

  beforeEachRender ( element ) {
    // Remove bounding box
    if ( element.boundingBox ) {
      this.playground.remove( element.boundingBox )
    }
  }

  afterEachRender ( element ) {
    this.#grid.add( element )

    // Create bounding box
    const boundingBox = this.#createBoundingBoxForElement( element )
    this.playground.add( boundingBox )
    element.boundingBox = boundingBox
  }

  afterRender () {
    // Remove cells
    this.#meshes.forEach( ( mesh ) => {
      const cell = this.#grid.cells.get( mesh.name )
      if ( !cell ) {
        this.#meshes.delete( mesh.name )
        this.playground.remove( mesh )
      }
    } )
    // Create cells
    this.#grid.cells.forEach( ( cell ) => {
      const mesh = this.#meshes.get( cell.id )
      if ( !mesh ) {
        this.playground.add( this.#createMeshForCell( cell, this.#grid.size ) )
      }
    } )
  }

  load () {
    super.load()

    const sphere = new Sphere( 5 )
    this.add( sphere )

    const box = new Box( 5, 5, 5 )
    Vector( box.position ).copy( Vector.create( 7, 4, 0 ) )
    Quaternion( box.rotation ).copy( Quaternion.create( 0, 0, 0.3826834323650898, 0.9238795325112867 ) )
    box.update()
    this.add( box )

    const polyhedron = new Polyhedron( [
      -1.0, -1.0, 1.0, // v0
      1.0, -1.0, 1.0, // v1
      1.0, 1.0, 1.0, // v2
      -1.0, 1.0, 1.0 // v3
    ], [
      0, 1, 2,
      2, 3, 0
    ] )
    Vector( polyhedron.position ).copy( Vector.create( 30, 0, 0 ) )
    polyhedron.scale = 5
    polyhedron.update()
    this.add( polyhedron )
  }
}
