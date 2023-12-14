'use strict'

import { terminal } from 'terminal-kit'

export class Report {
  static #createLayout ( data ) {
    const layout = new Map()

    for ( let i = 0, l = data.length; i < l; i++ ) {
      const entry = data[ i ]
      const id = data[ i ].name

      switch ( entry.element ) {
        case 'message':
          break
        case 'progress':
          const progress = terminal.progressBar( {
            width: 80,
            title: id,
            eta: true,
            percent: true
          } )
          layout.set( id, progress )
          break
        default:
          break
      }
    }
  }

  static start ( data ) {
    this.#createLayout( data )
  }

  static stop () {

  }
}

var progressBar; var progress = 0

function doProgress () {
  // Add random progress
  progress += Math.random() / 10
  progressBar.update( progress )

  if ( progress >= 1 ) {
    // Cleanup and exit
    setTimeout( function () { term( '\n' ); process.exit() }, 200 )
  } else {
    setTimeout( doProgress, 100 + Math.random() * 400 )
  }
}

progressBar = term.progressBar( {
  width: 80,
  title: 'Serious stuff in progress:',
  eta: true,
  percent: true
} )

doProgress()
