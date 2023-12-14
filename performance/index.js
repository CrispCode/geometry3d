'use strict'

import { Runner } from './lib/runner.js'

import {
  Box,
  Polyhedron,
  Sphere
} from './../src/index.js'

const random = ( min = 0, max = 1 ) => {
  return Math.floor( Math.random() * ( Math.floor( max ) - Math.ceil( min ) + 1 ) ) + Math.ceil( min )
}

const runner = new Runner( 'SHAPES' )

runner.add( 'BOX', () => {
  const box = new Box( random( -100, 100 ), random( -100, 100 ), random( -100, 100 ) ) // eslint-disable-line no-unused-vars
} )

runner.add( 'SPHERE', () => {
  const sphere = new Sphere( random( -100, 100 ) ) // eslint-disable-line no-unused-vars
}, 1000000 )

runner.run()
  .then( () => {
    console.log( 'Runner ' + runner.name + ' finished.' )
  } )
  .catch( ( err ) => {
    console.error( 'Runner ' + runner.name + ' failed.', err )
  } )
