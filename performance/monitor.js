'use strict'

import { MultiBar } from 'cli-progress'

const COLOR = {
  green: ( text ) => '\x1B[32m' + text + '\x1B[0m',
  yellow: ( text ) => '\x1B[33m' + text + '\x1B[0m'
}

export class Monitor {
  static #running = null

  static #container = new MultiBar( {
    format: '|' + COLOR.green( '{bar}' ) + '| {name} | {elapsed} ms (' + COLOR.yellow( 'delta: {delta} ms' ) + ') (min: {min} ms) (max: {max} ms) (count: {count})',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    clearOnComplete: false
  } )
  static #bars = new Map()

  static #round = ( number ) => {
    const int = Math.floor( number )
    const dec = number - int
    return int.toString().padStart( 5, ' ' ) + dec.toString().substring( 1, 7 ).padEnd( 5, ' ' )
  }

  static #logs = new Map()

  static #max = 0

  static start () {
    if ( this.#running ) {
      this.stop()
    }

    this.#running = setInterval( () => {
      this.#logs.forEach( ( log ) => {
        const name = log.name
        let bar = this.#bars.get( name )
        if ( !bar ) {
          bar = this.#container.create( this.#max, 0, { name: name.padEnd( 25, '.' ) } )
          this.#bars.set( name, bar )
        }
        bar.setTotal( this.#max )
        bar.update( log.last, {
          elapsed: this.#round( log.last ),
          min: this.#round( log.min ),
          max: this.#round( log.max ),
          delta: this.#round( log.delta ),
          count: this.#round( log.count )
        } )
      } )
    }, 1000 / 60 ) // 60 FPS
  }

  static stop () {
    clearInterval( this.#running )
    this.#running = null
    this.#container.stop()
    this.#bars.forEach( ( bar ) => {
      this.#container.remove( bar )
    } )
  }

  static logStart ( name = 'Monitor' ) {
    let log = this.#logs.get( name )
    if ( !log ) {
      log = {
        name: name,
        min: Infinity,
        max: 0,
        duration: 0,
        last: 0,
        delta: 0,
        count: 0
      }
      this.#logs.set( name, log )
    }
    performance.mark( name )
  }

  static logStop ( name = 'Monitor' ) {
    const mark = performance.getEntriesByName( name, 'mark' )[ 0 ]
    const duration = performance.now() - mark.startTime
    performance.clearMarks( name )
    const log = this.#logs.get( name )
    if ( duration < log.min ) { log.min = duration }
    if ( duration > log.max ) { log.max = duration }
    log.duration += duration
    log.count += 1
    log.last = duration
    log.delta = log.duration / log.count

    if ( duration > this.#max ) { this.#max = duration }
  }
}
