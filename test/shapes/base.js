/* globals describe, it, before, after */

import assert from 'assert'
import Base from './../../src/shapes/base.js'
import Vector from './../../src/math/vector.js'
import Quaternion from './../../src/math/quaternion.js'

describe( 'shapes.Base', () => {
  class Extend extends Base {}
  let instance = null

  before( () => {
    instance = new Extend()
  } )

  describe( 'Base.updateBounds()', () => {
    it( 'should have a static method .updateBounds(shape)', ( next ) => {
      assert.ok( typeof Base.updateBounds === 'function' )
      try {
        Base.updateBounds()
      } catch ( err ) {
        assert.ok( err.message === '.updateBounds() is not implemented' )
      }
      next()
    } )
  } )

  describe( 'Base.transform()', () => {
    it( 'should have a static method .transform(shape, translate, scale, rotate)', ( next ) => {
      assert.ok( typeof Base.transform === 'function' )
      class Extend1 extends Base {
        static updateBounds () {}
      }

      const example = new Extend1()
      Extend1.transform( example, Vector.create( 1, 1, 1 ), null, null )
      assert.ok( example.position.x === 1 && example.position.y === 1 && example.position.z === 1 )
      Extend1.transform( example, null, 2, null )
      assert.ok( example.scale === 2 )
      Extend1.transform( example, null, 3, null )
      assert.ok( example.scale === 6 )
      Extend1.transform( example, null, null, Quaternion.create( 2, 2, 2, 2 ) )
      assert.ok( example.rotation.x === 2 && example.rotation.y === 2 && example.rotation.z === 2 && example.rotation.w === 2 )

      Extend1.transform( example, Vector.create( 2, 2, 2 ), 2, Quaternion.create( 0, 0, 0, 1 ) )
      assert.ok( example.position.x === 3 && example.position.y === 3 && example.position.z === 3 )
      assert.ok( example.scale === 12 )
      assert.ok( example.rotation.x === 2 && example.rotation.y === 2 && example.rotation.z === 2 && example.rotation.w === 2 )
      next()
    } )
  } )

  describe( 'Base.isValid()', () => {
    it( 'should have a static method .isValid(shape)', ( next ) => {
      assert.ok( typeof Base.isValid === 'function' )
      assert.ok( Extend.isValid( instance ) )
      next()
    } )
  } )

  describe( 'constructor()', () => {
    it( 'should not be able to create a class instance', ( next ) => {
      try {
        const base = new Base()
        console.log( base )
      } catch ( err ) {
        assert.ok( err.message === 'Cannot create instance of abstract class Base' )
      }
      next()
    } )
  } )

  describe( 'extending the class', () => {
    it( 'should be able to get the .type property', ( next ) => {
      assert.ok( instance.type === 'Extend' )
      next()
    } )

    it( 'should be able to get the .position property which should be a Vector', ( next ) => {
      assert.ok( Vector.isValid( instance.position ) )
      assert.ok( instance.position.x === 0 && instance.position.y === 0 && instance.position.z === 0 )
      next()
    } )

    it( 'should be able to get the .scale property which should be a Number', ( next ) => {
      assert.ok( typeof instance.scale === 'number' )
      assert.ok( instance.scale === 1 )
      next()
    } )

    it( 'should be able to get the .rotation property which should be a Quaternion', ( next ) => {
      assert.ok( Quaternion.isValid( instance.rotation ) )
      assert.ok( instance.rotation.x === 0 && instance.rotation.y === 0 && instance.rotation.z === 0 && instance.rotation.w === 1 )
      next()
    } )

    it( 'should be able to get the .bounds property which should be an Object with 2 properties (min,max) of type Vector', ( next ) => {
      const min = instance.bounds.min
      const max = instance.bounds.max
      assert.ok( Vector.isValid( min ) )
      assert.ok( min.x === 0 && min.y === 0 && min.z === 0 )
      assert.ok( Vector.isValid( max ) )
      assert.ok( max.x === 0 && max.y === 0 && max.z === 0 )
      next()
    } )
  } )

  after( () => {
    instance = null
  } )
} )
