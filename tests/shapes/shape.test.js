'use strict'

import { describe, it, beforeEach } from 'node:test'
import assert from 'node:assert'

import { Shape } from './../../src/shapes/shape.js'

describe( 'shapes.Shape', () => {
  class Extend extends Shape {}
  let instance = null

  beforeEach( () => {
    instance = new Extend()
  } )

  it( 'should not be able to create a class instance', () => {
    try {
      const shape = new Shape() // eslint-disable-line no-unused-vars
      assert.ok( false )
    } catch ( err ) {
      assert.ok( err.message === 'Cannot create instance of abstract class Shape' )
    }
  } )

  it( '.isValid(instance) should check if a given parameter is an instance of this class', () => {
    assert.ok( Extend.isValid( instance ) )
  } )

  it( '.id should be readonly', () => {
    try {
      instance.id = 0
      assert.ok( false )
    } catch ( err ) {
      assert.ok( true )
    }
  } )

  it( '.type should return the name of the class in lowercase', () => {
    assert.ok( instance.type === 'extend' )
  } )

  it( '.type should be readonly', () => {
    try {
      instance.type = 0
      assert.ok( false )
    } catch ( err ) {
      assert.ok( true )
    }
  } )
} )
