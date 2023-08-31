'use strict'

import Vector from './../math/vector.js'

export default class Grid {
  #cellSize = null
  get size () {
    return this.#cellSize
  }

  #grid = new Map()
  get cells () {
    return this.#grid
  }

  constructor ( cellSize = 1 ) {
    this.#cellSize = cellSize
  }

  #getCellValueFromCoordonate ( value ) {
    return Math.floor( value / this.#cellSize )
  }

  add ( shape ) {
    const boundsMin = Vector( shape.bounds.min ).clone().add( shape.position ).toObject()
    const boundsMax = Vector( shape.bounds.max ).clone().add( shape.position ).toObject()
    this.applyToCellsInArea( boundsMin.x, boundsMax.x, boundsMin.y, boundsMax.y, boundsMin.z, boundsMax.z, ( cell ) => {
      cell.set( shape.id, shape )
    } )
    return this
  }

  remove ( shape ) {
    const boundsMin = Vector( shape.bounds.min ).clone().add( shape.position ).toObject()
    const boundsMax = Vector( shape.bounds.max ).clone().add( shape.position ).toObject()
    this.applyToCellsInArea( boundsMin.x, boundsMax.x, boundsMin.y, boundsMax.y, boundsMin.z, boundsMax.z, ( cell ) => {
      cell.delete( shape.id )
    } )
    return this
  }

  applyToCellsOfShape ( shape, callback ) {
    const boundsMin = Vector( shape.bounds.min ).clone().add( shape.position ).toObject()
    const boundsMax = Vector( shape.bounds.max ).clone().add( shape.position ).toObject()
    this.applyToCellsInArea( boundsMin.x, boundsMax.x, boundsMin.y, boundsMax.y, boundsMin.z, boundsMax.z, callback )
  }

  applyToCellsInArea ( x1, x2, y1, y2, z1, z2, fn ) {
    for ( let fromX = this.#getCellValueFromCoordonate( x1 ), toX = this.#getCellValueFromCoordonate( x2 ), i = fromX; i <= toX; i++ ) {
      for ( let fromY = this.#getCellValueFromCoordonate( y1 ), toY = this.#getCellValueFromCoordonate( y2 ), j = fromY; j <= toY; j++ ) {
        for ( let fromZ = this.#getCellValueFromCoordonate( z1 ), toZ = this.#getCellValueFromCoordonate( z2 ), k = fromZ; k <= toZ; k++ ) {
          const pn = this.constructor.getCellName( i, j, k )
          this.#grid.set( pn, this.#grid.get( pn ) || new Map() )
          fn( this.#grid.get( pn ), i, j, k )
        }
      }
    }
  }

  static getCellName = ( x, y, z ) => {
    return x + ',' + y + ',' + z
  }
}
