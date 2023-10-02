'use strict'

import { Polyhedron } from './polyhedron.js'

export class Box extends Polyhedron {
  constructor ( width = 1, height = 1, depth = 1 ) {
    const halfW = width / 2
    const halfH = height / 2
    const halfD = depth / 2

    const vertices = [
      halfW, halfH, halfD, // v111
      -halfW, halfH, halfD, // v011
      halfW, -halfH, halfD, // v101
      -halfW, -halfH, halfD, // v001
      halfW, halfH, -halfD, // v110
      -halfW, halfH, -halfD, // v010
      halfW, -halfH, -halfD, // v100
      -halfW, -halfH, -halfD // v000
    ]

    const indexes = [
      // Front
      3, 2, 0,
      0, 1, 3,
      // Left
      5, 7, 3,
      3, 1, 5,
      // Back
      7, 5, 4,
      4, 6, 7,
      // Right
      6, 4, 2,
      4, 0, 2,
      // Bottom
      7, 6, 2,
      2, 3, 7,
      // Top
      0, 4, 5,
      5, 1, 0
    ]

    super( vertices, indexes )
  }
}
