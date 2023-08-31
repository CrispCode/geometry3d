/* globals window, document */

'use strict'

import { Playground } from '/playground.js'

import { AxesHelper } from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

// @TODO find a whay to import the library
// import { Sphere } from 'file:///../src/shapes/sphere.js'

window.addEventListener( 'load', () => {
  const playground = new Playground( document.querySelector( '.playground' ) )
  playground.start()

  const axes = new AxesHelper( Number.MAX_SAFE_INTEGER )
  playground.add( axes )

  // @TODO add a panel to show live stats / performance

  // @TODO use this to control
  const gui = new GUI()
  const layers = {
    'Toggle Name': function () {
      console.log( 'x' )
    },

    value: 0,
    name: 'Dummy',
    options: 'opt1'
  }

  gui.title( 'Camera Layers' )

  const folder1 = gui.addFolder( 'Position' )
  folder1.open( false )
  const folder2 = gui.addFolder( 'Scale' )

  folder1.add( layers, 'Toggle Name' )
  folder1.add( layers, 'value', 0, 100, 1 )
  folder1.add( layers, 'value' )
  folder1.add( layers, 'name' )
  folder1.add( layers, 'options', {
    'o1': 'opt1',
    'o2': 'opt2',
    'o3': 'opt3',
    'o4': 'opt4'
  } )

  const colorFormats = {
    string: '#ffffff',
    int: 0xffffff,
    object: { r: 1, g: 1, b: 1 },
    array: [ 1, 1, 1 ]
  }
  folder2.addColor( colorFormats, 'string' )

  gui.open()
} )
