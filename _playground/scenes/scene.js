'use strict'

import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

import { Box } from './../elements/box.js'
import { Polyhedron } from './../elements/polyhedron.js'
import { Sphere } from './../elements/sphere.js'

import { Quaternion, Vector } from 'main'

import {
  Raycaster,
  Vector2
} from 'three'

const classes = {
  'box': Box,
  'polyhedron': Polyhedron,
  'sphere': Sphere
}

export class Scene {
  #gui = new GUI()
  #guiFolders = new Map()

  #raycaster = new Raycaster()
  #pointer = new Vector2()
  #handlerPointer = ( event ) => {
    this.#pointer.x = ( event.clientX / this.#playground.element.clientWidth ) * 2 - 1
    this.#pointer.y = -( event.clientY / this.#playground.element.clientHeight ) * 2 + 1

    this.#raycaster.setFromCamera( this.#pointer, this.#playground.camera )
    this.#elements.forEach( ( element ) => {
      const selectedFolder = this.#guiFolders.get( element.data.id )
      if ( selectedFolder ) {
        const intersection = this.#raycaster.intersectObject( element.element, false )
        if ( intersection.length > 0 ) {
          selectedFolder.show()
          element.focus()
        } else {
          selectedFolder.hide()
          element.unfocus()
        }
      }
    } )
  }

  #playground = null
  get playground () {
    return this.#playground
  }

  #elements = new Map()

  constructor ( playground ) {
    if ( this.constructor.name === 'Scene' ) {
      throw new Error( 'Cannot create instance of abstract class Scene' )
    }

    this.#playground = playground
  }

  #createGUIFromData ( data ) {
    const folder = this.#gui.addFolder( data.type + ' - ' + data.id )

    const folderPosition = folder.addFolder( 'position' )
    folderPosition.add( data.position, 'x', -100, 100 ).listen( true )
    folderPosition.add( data.position, 'y', -100, 100 ).listen( true )
    folderPosition.add( data.position, 'z', -100, 100 ).listen( true )

    const folderScale = folder.addFolder( 'scale' )
    folderScale.add( data, 'scale', 1, 10 ).listen( true ).onChange( () => { data.update() } )

    const euler = {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    }

    const updateEulerFromQuaternion = () => {
      const angles = Quaternion( data.rotation ).toEuler()
      euler.rotateX = angles.x * 180 / Math.PI
      euler.rotateY = angles.y * 180 / Math.PI
      euler.rotateZ = angles.z * 180 / Math.PI
      data.update()
    }

    const updateQuaternionFromEuler = () => {
      const qx = Quaternion.fromAxisAngle( Vector.create( 1, 0, 0 ), euler.rotateX * Math.PI / 180 )
      const qy = Quaternion.fromAxisAngle( Vector.create( 0, 1, 0 ), euler.rotateY * Math.PI / 180 )
      const qz = Quaternion.fromAxisAngle( Vector.create( 0, 0, 1 ), euler.rotateZ * Math.PI / 180 )
      Quaternion( data.rotation ).copy( Quaternion.create() ).premultiply( qx ).premultiply( qy ).premultiply( qz )
      data.update()
    }

    const folderRotation = folder.addFolder( 'rotation' )
    folderRotation.add( data.rotation, 'x', -1, 1 ).listen( true ).onChange( () => { updateEulerFromQuaternion() } )
    folderRotation.add( data.rotation, 'y', -1, 1 ).listen( true ).onChange( () => { updateEulerFromQuaternion() } )
    folderRotation.add( data.rotation, 'z', -1, 1 ).listen( true ).onChange( () => { updateEulerFromQuaternion() } )
    folderRotation.add( data.rotation, 'w', -1, 1 ).listen( true ).onChange( () => { updateEulerFromQuaternion() } )

    const folderRotate = folder.addFolder( 'rotate' )
    folderRotate.add( euler, 'rotateX', 0, 360 ).listen( true ).onChange( () => { updateQuaternionFromEuler() } )
    folderRotate.add( euler, 'rotateY', 0, 360 ).listen( true ).onChange( () => { updateQuaternionFromEuler() } )
    folderRotate.add( euler, 'rotateZ', 0, 360 ).listen( true ).onChange( () => { updateQuaternionFromEuler() } )

    updateEulerFromQuaternion()

    folder.hide()
    return folder
  }

  add ( data ) {
    const element = new classes[data.type]( data )
    this.#elements.set( data.id, element )
    this.#playground.add( element.element )
    this.#guiFolders.set( data.id, this.#createGUIFromData( element.data ) )
  }

  remove ( id ) {
    const element = this.#elements.get( id )
    if ( element ) {
      this.#guiFolders.get( id ).destroy()
      this.#playground.remove( element.element )
      element.destroy()
      this.#elements.delete( id )
    }
  }

  load () {
    this.#playground.element.addEventListener( 'pointerup', this.#handlerPointer )

    this.#playground.onRender( ( delta ) => {
      if ( typeof this.beforeRender === 'function' ) {
        this.beforeRender( delta )
      }
      this.#elements.forEach( ( element ) => {
        if ( typeof this.beforeEachRender === 'function' ) {
          this.beforeEachRender( element.data, delta )
        }
        element.update()
        if ( typeof this.afterEachRender === 'function' ) {
          this.afterEachRender( element.data, delta )
        }
      } )
      if ( typeof this.afterRender === 'function' ) {
        this.afterRender( delta )
      }
    } )

    this.#gui.title( 'Scene - ' + this.constructor.name.replace( 'Scene', '' ) )
    this.#gui.open()
  }

  unload () {
    this.#playground.element.removeEventListener( 'pointerup', this.#handlerPointer )

    this.#playground.onRender( null )
    this.#elements.forEach( ( element, id ) => {
      this.remove( id )
    } )

    this.#gui.close()
    this.#gui.destroy()
  }
}
