/* globals describe, it */

import assert from 'assert'
import Vector from './../../src/math/vector.js'
import Base from './../../src/shapes/base.js'
import Sphere from './../../src/shapes/sphere.js'

describe( 'shapes.Sphere', () => {
  it( 'should extend Base class', ( next ) => {
    assert.ok( Sphere.prototype instanceof Base )
    next()
  } )

  describe( 'Sphere.updateBounds()', () => {
    it( 'should have a static method .updateBounds(shape) which updates the bounds properties on transform', ( next ) => {
      assert.ok( typeof Sphere.updateBounds === 'function' )
      const sphere = new Sphere()
      Sphere.transform( sphere, null, 2, null )
      assert.ok( Vector.isEqual( sphere.bounds.min, Vector.create( -2, -2, -2 ) ) && Vector.isEqual( sphere.bounds.max, Vector.create( 2, 2, 2 ) ) )
      next()
    } )
  } )

  describe( 'Sphere.transform()', () => {
    it( 'should have a static method .transform(shape,translate,scale,rotate) which updates the properties', ( next ) => {
      assert.ok( typeof Sphere.updateBounds === 'function' )
      const sphere = new Sphere( 1 )
      Sphere.transform( sphere, Vector.create( 2, 2, 2 ), 2, null )
      assert.ok( sphere.radius === 2 )
      assert.ok( Vector.isEqual( sphere.position, Vector.create( 2, 2, 2 ) ) )
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
  } )
} )
