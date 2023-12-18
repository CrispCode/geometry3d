'use strict'

import { Vector } from './../math/vector.js'

export class Grid {
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

  #createCell ( x, y, z ) {
    return {
      id: this.constructor.getCellName( x, y, z ),
      children: new Map(),
      x: x,
      y: y,
      z: z
    }
  }

  add ( shape ) {
    const boundsMin = Vector( shape.boundsMin ).clone().add( shape.position ).toObject()
    const boundsMax = Vector( shape.boundsMax ).clone().add( shape.position ).toObject()

    for ( let fromX = this.#getCellValueFromCoordonate( boundsMin.x ), toX = this.#getCellValueFromCoordonate( boundsMax.x ), i = fromX; i <= toX; i++ ) {
      for ( let fromY = this.#getCellValueFromCoordonate( boundsMin.y ), toY = this.#getCellValueFromCoordonate( boundsMax.y ), j = fromY; j <= toY; j++ ) {
        for ( let fromZ = this.#getCellValueFromCoordonate( boundsMin.z ), toZ = this.#getCellValueFromCoordonate( boundsMax.z ), k = fromZ; k <= toZ; k++ ) {
          const pn = this.constructor.getCellName( i, j, k )
          let cell = this.#grid.get( pn )
          if ( !cell ) {
            cell = this.#createCell( i, j, k )
            this.#grid.set( pn, cell )
          }
          cell.children.set( shape.id, shape )
        }
      }
    }
    return this
  }

  remove ( shape ) {
    const boundsMin = Vector( shape.boundsMin ).clone().add( shape.position ).toObject()
    const boundsMax = Vector( shape.boundsMax ).clone().add( shape.position ).toObject()
    this.applyToCellsInArea( boundsMin.x, boundsMax.x, boundsMin.y, boundsMax.y, boundsMin.z, boundsMax.z, ( cell ) => {
      cell.children.delete( shape.id )
      if ( cell.children.size === 0 ) {
        this.#grid.delete( cell.id )
      }
    } )
    return this
  }

  clear () {
    this.#grid.clear()
  }

  applyToCellsOfShape ( shape, callback ) {
    const boundsMin = Vector( shape.boundsMin ).clone().add( shape.position ).toObject()
    const boundsMax = Vector( shape.boundsMax ).clone().add( shape.position ).toObject()
    this.applyToCellsInArea( boundsMin.x, boundsMax.x, boundsMin.y, boundsMax.y, boundsMin.z, boundsMax.z, callback )
  }

  applyToCellsInArea ( x1, x2, y1, y2, z1, z2, fn ) {
    for ( let fromX = this.#getCellValueFromCoordonate( x1 ), toX = this.#getCellValueFromCoordonate( x2 ), i = fromX; i <= toX; i++ ) {
      for ( let fromY = this.#getCellValueFromCoordonate( y1 ), toY = this.#getCellValueFromCoordonate( y2 ), j = fromY; j <= toY; j++ ) {
        for ( let fromZ = this.#getCellValueFromCoordonate( z1 ), toZ = this.#getCellValueFromCoordonate( z2 ), k = fromZ; k <= toZ; k++ ) {
          const cell = this.#grid.get( this.constructor.getCellName( i, j, k ) )
          if ( cell ) {
            fn( cell )
          }
        }
      }
    }
  }

  static getCellName = ( x, y, z ) => {
    return x + ',' + y + ',' + z
  }
}
