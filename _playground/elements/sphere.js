'use strict'

import { Element } from './element.js'

import {
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh
} from 'three'

export class Sphere extends Element {
  get color () {
    return 0x00FFFF
  }

  create () {
    const data = this.data

    const geometry = new SphereGeometry( data.radius / data.scale, 32, 16 )
    const material = new MeshStandardMaterial( { color: this.color } )

    const mesh = new Mesh( geometry, material )
    const wireframe = new LineSegments( new EdgesGeometry( mesh.geometry ), new LineBasicMaterial( { color: this.colorWireframe } ) )
    mesh.add( wireframe )

    mesh.name = data.id
    mesh.position.set( data.position.x, data.position.y, data.position.z )
    mesh.scale.set( data.scale, data.scale, data.scale )
    mesh.quaternion.set( data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w )

    return mesh
  }
}
