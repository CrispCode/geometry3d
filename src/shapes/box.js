'use strict'

import Polyhedron from './polyhedron.js'

import Vector from './../math/vector.js'

export default class Box extends Polyhedron {
  constructor ( min, max ) {
    const center = Vector( min ).clone().lerp( max, 0.5 ).subtract( min ).toObject()
    const centerToWorld = Vector( center ).clone().add( min ).toObject()

    const vertices = {
      v000: Vector( Vector.create( -center.x, -center.y, -center.z ) ).add( centerToWorld ).toObject(),
      v100: Vector( Vector.create( center.x, -center.y, -center.z ) ).add( centerToWorld ).toObject(),
      v010: Vector( Vector.create( -center.x, center.y, -center.z ) ).add( centerToWorld ).toObject(),
      v110: Vector( Vector.create( center.x, center.y, -center.z ) ).add( centerToWorld ).toObject(),
      v001: Vector( Vector.create( -center.x, -center.y, center.z ) ).add( centerToWorld ).toObject(),
      v101: Vector( Vector.create( center.x, -center.y, center.z ) ).add( centerToWorld ).toObject(),
      v011: Vector( Vector.create( -center.x, center.y, center.z ) ).add( centerToWorld ).toObject(),
      v111: Vector( Vector.create( center.x, center.y, center.z ) ).add( centerToWorld ).toObject()
    }

    const faces = [
      // Front
      vertices.v001, vertices.v101, vertices.v111,
      vertices.v111, vertices.v011, vertices.v001,
      // Left
      vertices.v010, vertices.v000, vertices.v001,
      vertices.v001, vertices.v011, vertices.v010,
      // Back
      vertices.v000, vertices.v010, vertices.v110,
      vertices.v110, vertices.v100, vertices.v000,
      // Right
      vertices.v100, vertices.v110, vertices.v101,
      vertices.v110, vertices.v111, vertices.v101,
      // Bottom
      vertices.v000, vertices.v100, vertices.v101,
      vertices.v101, vertices.v001, vertices.v000,
      // Top
      vertices.v111, vertices.v110, vertices.v010,
      vertices.v010, vertices.v011, vertices.v111
    ]

    super( faces )
  }

  static fromSize ( width = 1, height = 1, depth = 1 ) {
    const halfW = width / 2
    const halfH = height / 2
    const halfD = depth / 2

    const min = Vector.create( -halfW, -halfH, -halfD )
    const max = Vector.create( halfW, halfH, halfD )

    return new this( min, max )
  }
}
