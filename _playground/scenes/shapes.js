'use strict'

import { Scene } from './scene.js'

import {
  Sphere,
  Box,
  Polyhedron
} from 'main'

export class SceneShapes extends Scene {
  load () {
    super.load()

    const sphere = new Sphere( 5 )
    sphere.position.x = 40
    this.add( sphere )

    const box = new Box( 5, 5, 5 )
    box.position.x = 20
    this.add( box )

    const polyhedron = new Polyhedron( [
      // Front
      -6, -6, 6, 6, -6, 6, 6, 6, 6,
      6, 6, 6, -6, 6, 6, -6, -6, 6,
      // Left
      -3, 3, -6, -3, -3, -6, -6, -6, 6,
      -6, -6, 6, -6, 6, 6, -3, 3, -6,
      // Back
      -3, -3, -6, -3, 3, -6, 3, 3, -6,
      3, 3, -6, 3, -3, -6, -3, -3, -6,
      // Right
      3, -3, -6, 3, 3, -6, 6, -6, 6,
      3, 3, -6, 6, 6, 6, 6, -6, 6,
      // Bottom
      -3, -3, -6, 3, -3, -6, 6, -6, 6,
      6, -6, 6, -6, -6, 6, -3, -3, -6,
      // Top
      6, 6, 6, 3, 3, -6, -3, 3, -6,
      -3, 3, -6, -6, 6, 6, 6, 6, 6
    ] )
    this.add( polyhedron )
  }
}
