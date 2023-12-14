'use strict'

import { Polyhedron } from './polyhedron.js'

import { Vector } from './../math/vector.js'

const getVerticesFromSize = ( width, height, depth ) => {
  if ( !( typeof width === 'number' && !Number.isNaN( width ) ) ) {
    throw new Error( 'Width must be a number' )
  }
  if ( !( typeof height === 'number' && !Number.isNaN( width ) ) ) {
    throw new Error( 'Height must be a number' )
  }
  if ( !( typeof depth === 'number' && !Number.isNaN( width ) ) ) {
    throw new Error( 'Depth must be a number' )
  }

  const halfW = width / 2
  const halfH = height / 2
  const halfD = depth / 2

  const v111 = Vector.create( halfW, halfH, halfD )
  const v011 = Vector.create( -halfW, halfH, halfD )
  const v101 = Vector.create( halfW, -halfH, halfD )
  const v001 = Vector.create( -halfW, -halfH, halfD )
  const v110 = Vector.create( halfW, halfH, -halfD )
  const v010 = Vector.create( -halfW, halfH, -halfD )
  const v100 = Vector.create( halfW, -halfH, -halfD )
  const v000 = Vector.create( -halfW, -halfH, -halfD )

  const vertices = [
    // Front
    v001, v101, v111,
    v111, v011, v001,
    // Left
    v010, v000, v001,
    v001, v011, v010,
    // Back
    v000, v010, v110,
    v110, v100, v000,
    // Right
    v100, v110, v101,
    v110, v111, v101,
    // Bottom
    v000, v100, v101,
    v101, v001, v000,
    // Top
    v111, v110, v010,
    v010, v011, v111
  ]

  return vertices
}

export class Box extends Polyhedron {
  resize ( width, height, depth ) {
    this.vertices = getVerticesFromSize( width, height, depth )
  }

  constructor ( width = 1, height = 1, depth = 1 ) {
    const vertices = getVerticesFromSize( width, height, depth )
    super( vertices )
  }
}
