'use strict'

import { describe, it } from 'node:test'
import assert from 'node:assert'

import { Grid } from './../../src/collision/grid.js'
import { Vector } from './../../src/math/vector.js'
import { Sphere } from './../../src/shapes/sphere.js'

const createSphere = ( radius, x, y, z ) => {
  const shape = new Sphere( radius )
  shape.position = Vector.create( x, y, z )
  return shape
}

describe( 'collision.Grid', () => {
  describe( 'Grid.getCellName()', () => {
    it( 'should return a unique name based on the arguments', () => {
      assert.ok( Grid.getCellName( 1, 2, 3 ) === '1,2,3' )
    } )
  } )

  describe( 'constructor()', () => {
    it( 'should create a new Grid instance with a size of 1 by default', () => {
      const grid = new Grid()
      assert.ok( grid.size === 1 )
    } )

    it( 'should create a new Grid instance with a custom size', () => {
      const grid = new Grid( 5 )
      assert.ok( grid.size === 5 )
    } )
  } )

  describe( 'Grid().size', () => {
    it( 'should have a property called .size which returns the cell size', () => {
      const grid = new Grid( 10 )
      assert.ok( grid.size === 10 )
    } )
  } )

  describe( 'Grid().cells', () => {
    it( 'should have a property called .cells which returns all the cells', () => {
      const grid = new Grid( 10 )
      grid.add( new Sphere( 5 ) )
      assert.ok( grid.cells.size === 8 )
    } )
  } )

  describe( 'Grid().add()', () => {
    it( 'should add a shape into the grid', () => {
      const grid = new Grid( 10 )

      grid.add( createSphere( 1, 2, 3, 4 ) )
      grid.add( createSphere( 1, 2, 2, 3 ) )
      grid.add( createSphere( 1, 3, 3, 2 ) )

      grid.applyToCellsInArea( 0, 5, 0, 5, 0, 5, ( cell ) => {
        assert.ok( cell.children.size === 3 )
      } )
    } )
  } )

  describe( 'Grid().remove()', () => {
    it( 'should remove a shape from the grid', () => {
      const grid = new Grid( 10 )

      const shape1 = createSphere( 1, 2, 3, 4 )
      grid.add( shape1 )
      grid.add( createSphere( 1, 2, 2, 3 ) )
      grid.add( createSphere( 1, 3, 3, 2 ) )

      grid.applyToCellsInArea( 0, 5, 0, 5, 0, 5, ( cell ) => {
        assert.ok( cell.children.size === 3 )
      } )

      grid.remove( shape1 )

      grid.applyToCellsInArea( 0, 5, 0, 5, 0, 5, ( cell ) => {
        assert.ok( cell.children.size === 2 )
      } )
    } )

    it( 'should remove a cell if it has no children', () => {
      const grid = new Grid( 10 )

      const shape1 = createSphere( 1, 2, 3, 4 )
      grid.add( shape1 )

      grid.applyToCellsInArea( 0, 5, 0, 5, 0, 5, ( cell ) => {
        assert.ok( cell.children.size === 1 )
      } )

      grid.remove( shape1 )

      let cells = 0
      grid.applyToCellsInArea( 0, 5, 0, 5, 0, 5, () => {
        cells++
      } )
      assert.ok( cells === 0 )
    } )
  } )

  describe( 'Grid().clear()', () => {
    it( 'should empty the grid', () => {
      const grid = new Grid( 10 )

      grid.add( createSphere( 1, 2, 2, 3 ) )
      grid.add( createSphere( 5, 15, 3, 2 ) )

      assert.ok( grid.cells.size === 9 )
      grid.clear()
      assert.ok( grid.cells.size === 0 )
    } )
  } )

  describe( 'Grid().applyToCellsOfShape()', () => {
    it( 'should get the cell and the cell coordonates based on a shape', () => {
      const grid = new Grid( 5 )

      grid.add( createSphere( 1, 2, 2, 2 ) )
      grid.add( createSphere( 1, 12, 12, 12 ) )
      grid.add( createSphere( 1, 22, 22, 22 ) )

      grid.applyToCellsOfShape( createSphere( 1, 13, 13, 13 ), ( cell ) => {
        assert.ok( cell.children.size === 1 )
      } )
    } )

    it( 'should get the cell and the cell should contain the coordonates', () => {
      const grid = new Grid( 5 )

      grid.add( createSphere( 1, 2, 2, 2 ) )
      grid.add( createSphere( 1, 12, 12, 12 ) )
      grid.add( createSphere( 1, 22, 22, 22 ) )

      grid.applyToCellsOfShape( createSphere( 1, 13, 13, 13 ), ( cell ) => {
        assert.ok( cell.x === 2 && cell.y === 2 && cell.z === 2 )
      } )
    } )
  } )
} )
