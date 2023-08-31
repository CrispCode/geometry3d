/* globals describe, it */

import assert from 'assert'
import Grid from './../../src/collision/grid.js'
import Vector from './../../src/math/vector.js'
import Sphere from './../../src/shapes/sphere.js'

describe( 'collision.Grid', () => {
  describe( 'Grid.getCellName()', () => {
    it( 'should return a unique name based on the arguments', ( next ) => {
      assert.ok( Grid.getCellName( 1, 2, 3 ) === '1,2,3' )
      next()
    } )
  } )

  describe( 'constructor()', () => {
    it( 'should create a new Grid instance with a size of 1 by default', ( next ) => {
      const grid = new Grid()
      assert.ok( grid.size === 1 )
      next()
    } )

    it( 'should create a new Grid instance with a custom size', ( next ) => {
      const grid = new Grid( 5 )
      assert.ok( grid.size === 5 )
      next()
    } )
  } )

  describe( 'Grid().size', () => {
    it( 'should have a property called .size which returns the cell size', ( next ) => {
      const grid = new Grid( 10 )
      assert.ok( grid.size === 10 )
      next()
    } )
  } )

  describe( 'Grid().cells', () => {
    it( 'should have a property called .cells which returns all the cells', ( next ) => {
      const grid = new Grid( 10 )
      grid.add( new Sphere( 5 ) )
      assert.ok( grid.cells.size === 8 )
      next()
    } )
  } )

  describe( 'Grid().add()', () => {
    it( 'should add a shape into the grid', ( next ) => {
      const grid = new Grid( 10 )

      const createSphere = ( radius, x, y, z ) => {
        const shape = new Sphere( radius )
        Sphere.transform( shape, Vector.create( x, y, z ), null, null )
        return shape
      }

      grid.add( createSphere( 1, 2, 3, 4 ) )
      grid.add( createSphere( 1, 2, 2, 3 ) )
      grid.add( createSphere( 1, 3, 3, 2 ) )

      grid.applyToCellsInArea( 0, 5, 0, 5, 0, 5, ( cell ) => {
        assert.ok( cell.size === 3 )
      } )
      next()
    } )
  } )

  describe( 'Grid().remove()', () => {
    it( 'should remove a shape from the grid', ( next ) => {
      const grid = new Grid( 10 )

      const createSphere = ( radius, x, y, z ) => {
        const shape = new Sphere( radius )
        Sphere.transform( shape, Vector.create( x, y, z ), null, null )
        return shape
      }

      const shape1 = createSphere( 1, 2, 3, 4 )
      grid.add( shape1 )
      grid.add( createSphere( 1, 2, 2, 3 ) )
      grid.add( createSphere( 1, 3, 3, 2 ) )

      grid.applyToCellsInArea( 0, 5, 0, 5, 0, 5, ( cell ) => {
        assert.ok( cell.size === 3 )
      } )

      grid.remove( shape1 )

      grid.applyToCellsInArea( 0, 5, 0, 5, 0, 5, ( cell ) => {
        assert.ok( cell.size === 2 )
      } )

      next()
    } )
  } )

  describe( 'Grid().applyToCellsOfShape()', () => {
    it( 'should get the cell and the cell coordonates based on a shape', ( next ) => {
      const grid = new Grid( 5 )

      const createSphere = ( radius, x, y, z ) => {
        const shape = new Sphere( radius )
        Sphere.transform( shape, Vector.create( x, y, z ), null, null )
        return shape
      }

      grid.add( createSphere( 1, 2, 2, 2 ) )
      grid.add( createSphere( 1, 12, 12, 12 ) )
      grid.add( createSphere( 1, 22, 22, 22 ) )

      grid.applyToCellsOfShape( createSphere( 1, 13, 13, 13 ), ( cell ) => {
        assert.ok( cell.size === 1 )
      } )

      next()
    } )
  } )
} )
