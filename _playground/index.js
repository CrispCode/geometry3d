/* globals window, document */

'use strict'

import { Playground } from '/playground.js'

import { AxesHelper } from 'three'

import { SceneShapes } from './scenes/shapes.js'
import { SceneGrid } from './scenes/grid.js'

window.addEventListener( 'load', () => {
  const playground = new Playground( document.querySelector( '.playground' ) )
  playground.start()

  const axes = new AxesHelper( Number.MAX_SAFE_INTEGER )
  playground.add( axes )

  const scene = new SceneGrid( playground )
  scene.load()
} )
