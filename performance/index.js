'use strict'

import { Monitor } from './monitor.js'

import {
  Box,
  Sphere
} from './../src/index.js'

const random = ( min = 0, max = 1 ) => {
  return Math.floor( Math.random() * ( Math.floor( max ) - Math.ceil( min ) + 1 ) ) + Math.ceil( min )
}

Monitor.start()

const loops = 100000
setInterval( () => {
  Monitor.logStart( 'BASE' )
  for ( let i = 0; i < loops; i++ ) {}
  Monitor.logStop( 'BASE' )

  Monitor.logStart( 'Sphere' )
  for ( let i = 0; i < loops; i++ ) {
    const sphere = new Sphere( random( -100, 100 ) ) // eslint-disable-line no-unused-vars
  }
  Monitor.logStop( 'Sphere' )

  Monitor.logStart( 'Box' )
  for ( let i = 0; i < loops; i++ ) {
    const box = new Box( random( -100, 100 ), random( -100, 100 ), random( -100, 100 ) ) // eslint-disable-line no-unused-vars
  }
  Monitor.logStop( 'Box' )
}, 1 )

