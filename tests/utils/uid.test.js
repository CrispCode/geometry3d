'use strict'

import { describe, it } from 'node:test'
import assert from 'node:assert'

import { uid } from './../../src/utils/uid.js'

describe( 'utils.uid', () => {
  it( 'should return a unique identifier', () => {
    assert.ok( typeof uid() === 'number' )
  } )

  it( 'should return a unique identifier even if the calls happen really fast', () => {
    const ids = []
    const uids = new Set()
    for ( let i = 0; i < 10; i++ ) {
      const id = uid()
      ids.push( id )
      uids.add( id )
    }
    assert.ok( ids.length === uids.size )
  } )
} )
