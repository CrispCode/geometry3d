'use strict'

export class Collisions {
  // Uses AABB detection in 3 dimensions
  static checkBoundsCollision ( shape1, shape2 ) {
    const s1min = shape1.boundsMin
    const s2min = shape2.boundsMin
    const s1max = shape1.boundsMax
    const s2max = shape2.boundsMax

    const collided = (
      s1min.x <= s2max.x &&
      s1max.x >= s2min.x &&
      s1min.y <= s2max.y &&
      s1max.y >= s2min.y &&
      s1min.z <= s2max.z &&
      s1max.z >= s2min.z
    )

    return collided
  }

  //   static checkshapesCollision ( shape1, shape2 ) {
  //     const collision = {
  //       collided: false,
  //       shape1: {
  //         shape: shape2,
  //         pairs: []
  //       },
  //       shape2: {
  //         shape: shape1,
  //         pairs: []
  //       }
  //     }

  //     if ( !this.checkCollisionBounds( shape1, shape2 ) ) {
  //       return collision
  //     }

  //     for ( const shape1 of shape1.geometry.shapes ) {
  //       for ( const shape2 of shape2.geometry.shapes ) {
  //         if ( shape1.type === 'Box' && shape2.type === 'Box' ) {
  //           if ( this.checkCollisionBoxBox( shape1, shape1.geometry.position, shape2, shape2.geometry.position ) ) {
  //             collision.collided = true
  //             collision.shape1.pairs.push( [ shape1, shape2 ] )
  //             collision.shape2.pairs.push( [ shape2, shape1 ] )
  //           }
  //         }
  //         if ( shape1.type === 'Box' && shape2.type === 'Sphere' ) {
  //           if ( this.checkCollisionBoxSphere( shape1, shape1.geometry.position, shape2, shape2.geometry.position ) ) {
  //             collision.collided = true
  //             collision.shape1.pairs.push( [ shape1, shape2 ] )
  //             collision.shape2.pairs.push( [ shape2, shape1 ] )
  //           }
  //         }
  //         if ( shape1.type === 'Sphere' && shape2.type === 'Box' ) {
  //           if ( this.checkCollisionBoxSphere( shape2, shape2.geometry.position, shape1, shape1.geometry.position ) ) {
  //             collision.collided = true
  //             collision.shape1.pairs.push( [ shape1, shape2 ] )
  //             collision.shape2.pairs.push( [ shape2, shape1 ] )
  //           }
  //         }
  //         if ( shape1.type === 'Sphere' && shape2.type === 'Sphere' ) {
  //           if ( this.checkCollisionSphereSphere( shape1, shape1.geometry.position, shape2, shape2.geometry.position ) ) {
  //             collision.collided = true
  //             collision.shape1.pairs.push( [ shape1, shape2 ] )
  //             collision.shape2.pairs.push( [ shape2, shape1 ] )
  //           }
  //         }
  //       }
  //     }

  //     return collision
  //   }

  //   static checkCollisionBoxBox ( box1, offset1, box2, offset2 ) {
  //     const axes = [ ...box1.normals, ...box2.normals ]

  //     axes.forEach( ( axis ) => {
  //       const projection1 = this.projectBoxOnAxis( box1, offset1, axis )
  //       const projection2 = this.projectBoxOnAxis( box2, offset2, axis )

  //       if ( projection1.max < projection2.min || projection2.max < projection1.min ) {
  //         // Separating axis found, no collision
  //         return false
  //       }
  //     } )

  //     // No separating axis found, collision detected
  //     return true
  //   }

  //   static projectBoxOnAxis ( box, offset, axis ) {
  //     let min = Infinity
  //     let max = -Infinity

  //     box.vertices.forEach( ( vertex ) => {
  //       const projection = Vector( vertex ).clone().add( offset ).dot( axis )
  //       if ( projection < min ) {
  //         min = projection
  //       }
  //       if ( projection > max ) {
  //         max = projection
  //       }
  //     } )

  //     return { min: min, max: max }
  //   }

  // /**
  //  * Based on https://stackoverflow.com/questions/21037241/how-to-determine-a-point-is-inside-or-outside-a-cube
  //  * 1. We find set 3 axes from the cube edges, one for X one for Y and one for Z. We do this by moving the origin to the point that connects the 3 others
  //  * 2. We find the projection of the point (in regards to v0) on the newly defined axes. The dot gives us the length of the projection
  //  * 3. We check if the projection is smaller than the width.
  //  */
  // static pointInBox ( point, box ) {
  //   const v0 = box.vertices.get( 'v000' )
  //   const axisX = Vector( box.vertices.get( 'v100' ) ).clone().subtract( v0 ).normalize().get()
  //   const axisY = Vector( box.vertices.get( 'v010' ) ).clone().subtract( v0 ).normalize().get()
  //   const axisZ = Vector( box.vertices.get( 'v001' ) ).clone().subtract( v0 ).normalize().get()
  //   const tp = Vector( point ).clone().subtract( v0 )
  //   const tpx = tp.dot( axisX )
  //   const tpy = tp.dot( axisY )
  //   const tpz = tp.dot( axisZ )
  //   return (
  //     ( tpx >= 0 && tpx <= box.scale.x ) &&
  //     ( tpy >= 0 && tpy <= box.scale.y ) &&
  //     ( tpz >= 0 && tpz <= box.scale.z )
  //   )
  // }

  // static checkCollisionBoxSphere ( box, offset1, sphere, offset2 ) {
  //   for ( const vertex of box.vertices.values() ) {
  //     const point = Vector( vertex ).clone()
  //       .add( box.position )
  //       .add( offset1 )
  //       .subtract( box2.position )
  //       .subtract( offset2 )
  //       .get()
  //     if ( this.pointInBox( point, box2 ) ) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  //   static checkCollisionSphereSphere ( sphere1, offset1, sphere2, offset2 ) {
  //     const distanceSq = Vector()
  //       .add( sphere1.position )
  //       .add( offset1 )
  //       .subtract( sphere2.position )
  //       .subtract( offset2 )
  //       .doubleLength()

  //     const minDistanceSq = Math.pow( sphere1.radius + sphere2.radius, 2 )

//     return ( distanceSq < minDistanceSq )
//   }
}
