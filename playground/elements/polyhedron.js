'use strict'

import { Element } from './element.js'

import {
  BufferGeometry,
  BufferAttribute,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  DoubleSide
} from 'three'

import { Quaternion, Vector } from 'main'

export class Polyhedron extends Element {
  get color () {
    return 0xFF00FF
  }

  create () {
    const data = this.data

    const geometry = new BufferGeometry()
    const material = new MeshStandardMaterial( { color: this.color, side: DoubleSide } )

    // Decompress faces
    const vertices = []
    const inversedRotation = Quaternion( data.rotation ).clone().inverse().toObject()

    data.faces.forEach( ( triangle ) => {
      const a = Vector( triangle.a ).clone().divideScalar( data.scale ).rotate( inversedRotation ).toObject()
      vertices.push( a.x, a.y, a.z )
      const b = Vector( triangle.b ).clone().divideScalar( data.scale ).rotate( inversedRotation ).toObject()
      vertices.push( b.x, b.y, b.z )
      const c = Vector( triangle.c ).clone().divideScalar( data.scale ).rotate( inversedRotation ).toObject()
      vertices.push( c.x, c.y, c.z )
    } )
    geometry.setAttribute( 'position', new BufferAttribute( new Float32Array( vertices ), 3 ) )
    geometry.setAttribute( 'normal', new BufferAttribute( new Float32Array( vertices ), 3 ) )

    const mesh = new Mesh( geometry, material )
    const wireframe = new LineSegments( new EdgesGeometry( mesh.geometry ), new LineBasicMaterial( { color: this.colorWireframe } ) )
    mesh.add( wireframe )

    mesh.name = data.id
    mesh.position.set( data.position.x, data.position.y, data.position.z )
    mesh.scale.set( data.scale, data.scale, data.scale )
    mesh.quaternion.set( data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w )

    return mesh
  }

  update () {
    const data = this.data
    this.element.position.set( data.position.x, data.position.y, data.position.z )
    this.element.scale.set( data.scale, data.scale, data.scale )
    this.element.quaternion.set( data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w )
    super.update()
  }
}
