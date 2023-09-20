/* globals describe, it */

import assert from 'assert'
import Vector from './../../src/math/vector.js'
import Quaternion from './../../src/math/quaternion.js'
import Base from './../../src/shapes/base.js'
import Sphere from './../../src/shapes/sphere.js'

describe( 'shapes.Sphere', () => {
  it( 'should extend Base class', ( next ) => {
    assert.ok( Sphere.prototype instanceof Base )
    next()
  } )

  describe( 'Sphere.transform()', () => {
    it( 'should have a static method .transform(shape,translate,scale,rotate) which updates the properties', ( next ) => {
      const sphere = new Sphere( 1 )
      Sphere.transform( sphere, Vector.create( 2, 2, 2 ), 2, null )
      assert.ok( sphere.radius === 2 )
      assert.ok( Vector.isEqual( sphere.position, Vector.create( 2, 2, 2 ) ) )
      next()
    } )

    it( 'should update the bounds properties on transform', ( next ) => {
      const sphere = new Sphere( 1 )
      Sphere.transform( sphere, null, 2, null )
      assert.ok( Vector.isEqual( sphere.bounds.min, Vector.create( -2, -2, -2 ) ) && Vector.isEqual( sphere.bounds.max, Vector.create( 2, 2, 2 ) ) )
      next()
    } )
  } )

  describe( 'Sphere.clone()', () => {
    it( 'should have a static method .clone(sphere)', ( next ) => {
      assert.ok( typeof Sphere.clone === 'function' )

      const instance = new Sphere( 5 )
      Sphere.transform( instance, Vector.create( 1, 1, 1 ), 5, Quaternion.create( 5, 5, 5, 5 ) )
      const clone = Sphere.clone( instance )

      assert.ok( Vector.isEqual( clone.position, instance.position ) )
      assert.ok( clone.scale === instance.scale )
      assert.ok( Quaternion.isEqual( clone.rotation, instance.rotation ) )
      assert.ok( clone.radius === instance.radius )
      assert.ok( Vector.isEqual( clone.bounds.min, instance.bounds.min ) )
      assert.ok( Vector.isEqual( clone.bounds.max, instance.bounds.max ) )

      next()
    } )
  } )

  describe( 'constructor()', () => {
    it( 'should be able to create an instance if a radius is provided', ( next ) => {
      const sphere = new Sphere( 5 )
      assert.ok( sphere.radius === 5 )
      next()
    } )

    it( 'should return the correct radius even when scaled', ( next ) => {
      const sphere = new Sphere( 2 )
      Sphere.transform( sphere, null, 5, null )
      assert.ok( sphere.radius === 10 )
      next()
    } )

    it( 'should update the bounds properties on creation based on the radius given', ( next ) => {
      const sphere = new Sphere( 2 )
      assert.ok( Vector.isEqual( sphere.bounds.min, Vector.create( -2, -2, -2 ) ) && Vector.isEqual( sphere.bounds.max, Vector.create( 2, 2, 2 ) ) )
      next()
    } )
  } )
} )
