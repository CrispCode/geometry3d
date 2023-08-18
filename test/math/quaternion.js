// /* globals describe, it */

// import assert from 'assert'
// import approx from './../../src/utils/approx.js'
// import { Quaternion, isValidQuaternion } from './../../src/math/quaternion.js'
// import { Vector } from './../../src/math/vector.js'

// describe( 'math.isValidQuaternion', () => {
//   it( 'should return true if an object with x,y,z,w numeric properties is given', ( next ) => {
//     assert.ok( isValidQuaternion( { x: 1, y: -1, z: 0.5, w: 3 } ) )
//     next()
//   } )

//   it( 'should return false if an object with wrong properties is given', ( next ) => {
//     assert.ok( !isValidQuaternion( { x: 1, y: null, z: 'wrong', w: true } ) )
//     next()
//   } )

//   it( 'should return false the value passed is not an object', ( next ) => {
//     assert.ok( !isValidQuaternion( 'wrong' ) )
//     next()
//   } )
// } )

// describe( 'math.Quaternion', () => {
//   describe( 'Quaternion()', () => {
//     it( 'should create a (0,0,0,1) _QuaternionObject if no arguments specified', ( next ) => {
//       const quaternion = Quaternion().toObject()
//       assert.ok( ( quaternion.x === 0 ) && ( quaternion.y === 0 ) && ( quaternion.z === 0 ) && ( quaternion.w === 1 ) )
//       next()
//     } )

//     it( 'should create a (1,2,-3,1) _QuaternionObject if 1,2,-3,1 are given as arguments', ( next ) => {
//       const quaternion = Quaternion( 1, 2, -3, 1 ).toObject()
//       assert.ok( ( quaternion.x === 1 ) && ( quaternion.y === 2 ) && ( quaternion.z === -3 ) && ( quaternion.w === 1 ) )
//       next()
//     } )

//     it( 'should keep the original _QuaternionObject given', ( next ) => {
//       const quaternion1 = Quaternion( 1, 2, 3, 2 ).toObject()
//       const quaternion2 = Quaternion( quaternion1 ).toObject()
//       assert.ok( quaternion1 === quaternion2 )
//       next()
//     } )

//     it( 'should create a (0,0,-3,0.1) _QuaternionObject if undefined,undefined,-3,0.1 are given as arguments', ( next ) => {
//       const quaternion = Quaternion( undefined, undefined, -3, 0.1 ).toObject()
//       assert.ok( ( quaternion.x === 0 ) && ( quaternion.y === 0 ) && ( quaternion.z === -3 ) && ( quaternion.w === 0.1 ) )
//       next()
//     } )

//     it( 'should throw an error if invalid arguments are given', ( next ) => {
//       try {
//         Quaternion( {}, null, 'wrong' ).toObject()
//       } catch ( err ) {
//         assert.ok( true )
//       }
//       next()
//     } )
//   } )

//   describe( 'Quaternion.toObject', () => {
//     it( 'should return the original _QuaternionObject for a newly created one', ( next ) => {
//       const quaternion = Quaternion( 1, 2, 3, 4 ).toObject()
//       assert.ok( ( quaternion.x === 1 ) && ( quaternion.y === 2 ) && ( quaternion.z === 3 ) && ( quaternion.w === 4 ) )
//       next()
//     } )

//     it( 'should return the original _QuaternionObject for a provided _QuaternionObject', ( next ) => {
//       const quaternion = Quaternion( 1, 2, 3, 4 ).toObject()
//       const sameQuaternion = Quaternion( quaternion ).toObject()
//       assert.ok( sameQuaternion === quaternion )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.clone', () => {
//     it( 'should create a new identical _QuaternionObject but with a different reference', ( next ) => {
//       const quaternion = Quaternion( 1, 2, 3, 4 ).toObject()
//       const clonedQuaternion = Quaternion( quaternion ).clone().toObject()
//       assert.ok( ( quaternion.x === clonedQuaternion.x ) && ( quaternion.y === clonedQuaternion.y ) && ( quaternion.z === clonedQuaternion.z ) && ( quaternion.w === clonedQuaternion.w ) && ( quaternion !== clonedQuaternion ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.copy', () => {
//     it( 'should copy the values of the _QuaternionObject into the original', ( next ) => {
//       const quaternion1 = Quaternion( 4, 5, 6, 7 ).toObject()
//       const quaternion2 = Quaternion( 1, 2, 3, 8 ).toObject()
//       const quaternion = Quaternion( quaternion1 ).copy( quaternion2 ).toObject()
//       assert.ok( ( quaternion.x === 1 ) && ( quaternion.y === 2 ) && ( quaternion.z === 3 ) && ( quaternion.w === 8 ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.isEqual', () => {
//     it( 'should return true if the given quaternion is equal to original', ( next ) => {
//       const quaternion = Quaternion( 1, 2, 3, 4 ).toObject()
//       assert.ok( Quaternion( 1, 2, 3, 4 ).isEqual( quaternion ) )
//       next()
//     } )

//     it( 'should return false if the given quaternion is not equal to original', ( next ) => {
//       const quaternion = Quaternion( 4, 5, 6, 7 ).toObject()
//       assert.ok( !Quaternion( 1, 2, 3, 8 ).isEqual( quaternion ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.round', () => {
//     it( 'should round the values of the _QuaternionObject to the specified number of decimals', ( next ) => {
//       const quaternion = Quaternion( 1.12, 2.345, 3.6789, 3.6389 ).round( 1 ).toObject()
//       assert.ok( ( quaternion.x === 1.1 ) && ( quaternion.y === 2.3 ) && ( quaternion.z === 3.7 ) && ( quaternion.w === 3.6 ) )
//       next()
//     } )

//     it( 'should round out to integers if the second parameter is not specified', ( next ) => {
//       const quaternion = Quaternion( 1.12, 2.345, 3.6789, 3.6389 ).round().toObject()
//       assert.ok( ( quaternion.x === 1 ) && ( quaternion.y === 2 ) && ( quaternion.z === 4 ) && ( quaternion.w === 4 ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.difference', () => {
//     it( 'should return the difference between 2 quaternions', ( next ) => {
//       const quaternion1 = Quaternion().fromUnitVectors( Vector( 1, 0, 0 ).toObject(), Vector( 0, 1, 0 ).toObject() ).toObject()
//       const quaternion2 = Quaternion().fromUnitVectors( Vector( 1, 0, 0 ).toObject(), Vector( -0.5, 0.5, 0 ).normalize().toObject() ).toObject()
//       const diff = Quaternion( quaternion2 ).difference( quaternion1 ).toObject()
//       assert.ok( Quaternion( 0, 0, 0.3826834323650896, 0.9238795325112867 ).isEqual( diff ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.multiply', () => {
//     it( 'should multiply 2 quaternions', ( next ) => {
//       const quaternion1 = Quaternion().fromUnitVectors( Vector( 1, 0, 0 ).toObject(), Vector( 0, 1, 0 ).toObject() ).toObject()
//       const quaternion2 = Quaternion().fromUnitVectors( Vector( 0, 1, 0 ).toObject(), Vector( 0, 0.5, 0.5 ).normalize().toObject() ).toObject()
//       const mult = Quaternion( quaternion2 ).clone().multiply( quaternion1 ).toObject()
//       assert.ok( Quaternion( 0.27059805007309845, -0.27059805007309845, 0.6532814824381882, 0.6532814824381882 ).isEqual( mult ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.premultiply', () => {
//     it( 'should multiply 2 quaternions, but in reverse order', ( next ) => {
//       const quaternion1 = Quaternion().fromUnitVectors( Vector( 1, 0, 0 ).toObject(), Vector( 0, 1, 0 ).toObject() ).toObject()
//       const quaternion2 = Quaternion().fromUnitVectors( Vector( 0, 1, 0 ).toObject(), Vector( 0, 0.5, 0.5 ).normalize().toObject() ).toObject()
//       const mult = Quaternion( quaternion2 ).clone().multiply( quaternion1 ).toObject()
//       const premult = Quaternion( quaternion1 ).clone().premultiply( quaternion2 ).toObject()
//       assert.ok( Quaternion( premult ).isEqual( mult ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.inverse', () => {
//     it( 'should inverse a quaternion', ( next ) => {
//       const quaternion = Quaternion().fromUnitVectors( Vector( 1, 0, 0 ).toObject(), Vector( 0, 1, 0 ).toObject() ).toObject()
//       const inverse = Quaternion( quaternion ).clone().inverse().toObject()
//       assert.ok( Quaternion( inverse ).isEqual( Quaternion( -quaternion.x, -quaternion.y, -quaternion.z, quaternion.w ).toObject() ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.normalize', () => {
//     it( 'should be able to normalize a quaternion with a length greater than 1', ( next ) => {
//       const quaternion = Quaternion( 1, 2, 3, 2 ).normalize().toObject()
//       assert.ok( ( quaternion.x === 1 / Quaternion( 1, 2, 3, 2 ).length() && quaternion.y === 2 / Quaternion( 1, 2, 3, 2 ).length() && quaternion.z === 3 / Quaternion( 1, 2, 3, 2 ).length() && quaternion.w === 2 / Quaternion( 1, 2, 3, 2 ).length() ) )
//       next()
//     } )

//     it( 'should be able to normalize a quaternion with 0,0,0,1', ( next ) => {
//       const quaternion = Quaternion( 0, 0, 0, 1 ).normalize().toObject()
//       assert.ok( ( quaternion.x === 0 && quaternion.y === 0 && quaternion.z === 0 && quaternion.w === 1 ) )
//       next()
//     } )

//     it( 'should be able to normalize a quaternion with negative values', ( next ) => {
//       const quaternion = Quaternion( 1, -2, 3, 1 ).normalize().toObject()
//       assert.ok( ( quaternion.x === 1 / Quaternion( 1, -2, 3, 1 ).length() && quaternion.y === -2 / Quaternion( 1, -2, 3, 1 ).length() && quaternion.z === 3 / Quaternion( 1, -2, 3, 1 ).length() && quaternion.w === 1 / Quaternion( 1, -2, 3, 1 ).length() ) )
//       next()
//     } )

//     it( 'should return a quaternion of 0,0,0,1 if the length is 0', ( next ) => {
//       const quaternion = Quaternion( 0, 0, 0, 0 ).normalize().toObject()
//       assert.ok( Quaternion( quaternion ).isEqual( Quaternion( 0, 0, 0, 1 ).toObject() ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.length', () => {
//     it( 'should be able to calculate the length of a quaternion', ( next ) => {
//       const length = Quaternion( 1, 2, 3, 4 ).length()
//       assert.ok( length === Math.sqrt( 1 + 4 + 9 + 16 ) )
//       next()
//     } )

//     it( 'should return 1 if the axies are 0 and w is 1', ( next ) => {
//       const length = Quaternion( 0, 0, 0, 1 ).length()
//       assert.ok( length === 1 )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.doubleLength', () => {
//     it( 'should be able to calculate the double length of a quaternion', ( next ) => {
//       const length = Quaternion( 1, 2, 3, 4 ).doubleLength()
//       assert.ok( length === 1 + 4 + 9 + 16 )
//       next()
//     } )

//     it( 'should return 1 if the axies are 0 and w is 1', ( next ) => {
//       const length = Quaternion( 0, 0, 0, 1 ).doubleLength()
//       assert.ok( length === 1 )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.dot', () => {
//     it( 'should be able to calculate the dot product of 2 quaternions', ( next ) => {
//       const dot = Quaternion( 5, -1, 0, 1 ).dot( Quaternion( 1, 0, 0, -1 ).toObject() )
//       assert.ok( dot === 4 )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.angle', () => {
//     it( 'should be able to calculate the angle between 2 quaternions (with approximation)', ( next ) => {
//       const quaternion1 = Quaternion().fromAxisAngle( Vector( 0, 0, 1 ).toObject(), Math.PI / 2 ).toObject()
//       const quaternion2 = Quaternion().fromAxisAngle( Vector( 0, 1, 0 ).toObject(), Math.PI / 2 ).toObject()
//       const angle = Quaternion( quaternion1 ).angle( quaternion2 ) * 180 / Math.PI
//       assert.ok( approx( angle ) === 120 )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.fromAxisAngle', () => {
//     it( 'should be able to create a quaternion from a normalized vector and an angle', ( next ) => {
//       const quaternion = Quaternion().fromAxisAngle( Vector( 1, 0, 0 ).toObject(), Math.PI / 2 ).toObject()
//       assert.ok( approx( quaternion.x, 3 ) === 0.707 && approx( quaternion.y, 3 ) === 0 && approx( quaternion.z, 3 ) === 0 && approx( quaternion.w, 3 ) === 0.707 )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.fromUnitVectors', () => {
//     it( 'should be able to create a quaternion from 2 normalized vectors', ( next ) => {
//       const quaternion = Quaternion().fromUnitVectors( Vector( 1, 0, 0 ).toObject(), Vector( 0, 1, 0 ).toObject() ).toObject()
//       assert.ok( approx( quaternion.x, 3 ) === 0 && approx( quaternion.y, 3 ) === 0 && approx( quaternion.z, 3 ) === 0.707 && approx( quaternion.w, 3 ) === 0.707 )
//       next()
//     } )

//     it( 'should be able to create a quaternion from 2 normalized vectors', ( next ) => {
//       const quaternion = Quaternion().fromUnitVectors( Vector( 0.1, 0.1, 0.1 ).toObject(), Vector( 0, -1, 0 ).toObject() ).toObject()
//       assert.ok( approx( quaternion.x, 3 ) === 0.110 && approx( quaternion.y, 3 ) === 0 && approx( quaternion.z, 3 ) === -0.110 && approx( quaternion.w, 3 ) === 0.988 )
//       next()
//     } )

//     it( 'should be able to create a quaternion from 2 normalized vectors pointing in oppsite directions on X axis', ( next ) => {
//       const quaternion = Quaternion().fromUnitVectors( Vector( 1, 0, 0 ).toObject(), Vector( -1, 0, 0 ).toObject() ).toObject()
//       assert.ok( Quaternion( quaternion ).isEqual( Quaternion( 0, 1, 0, 0 ).toObject() ) )
//       next()
//     } )

//     it( 'should be able to create a quaternion from 2 normalized vectors pointing in oppsite directions on Z axis', ( next ) => {
//       const quaternion = Quaternion().fromUnitVectors( Vector( 0, 0, 1 ).toObject(), Vector( 0, 0, -1 ).toObject() ).toObject()
//       assert.ok( Quaternion( quaternion ).isEqual( Quaternion( 0, -1, 0, 0 ).toObject() ) )
//       next()
//     } )

//     it( 'should be able to create a quaternion from 2 normalized vectors pointing in the same directions', ( next ) => {
//       const quaternion = Quaternion().fromUnitVectors( Vector( 1, 0, 0 ).toObject(), Vector( 0.5, 0, 0 ).toObject() ).toObject()
//       assert.ok( Quaternion( quaternion ).isEqual( Quaternion( 0, 0, 0, 1 ).toObject() ) )
//       next()
//     } )
//   } )

//   describe( 'Quaternion.slerp', () => {
//     it( 'should return the first quaternion values if time is 0', ( next ) => {
//       const quaternion1 = Quaternion().fromAxisAngle( Vector( 0, 0, 1 ).toObject(), Math.PI / 2 ).toObject()
//       const quaternion2 = Quaternion().fromAxisAngle( Vector( 0, 1, 0 ).toObject(), Math.PI / 2 ).toObject()
//       const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 0 ).toObject()
//       assert.ok( Quaternion( quaternion ).isEqual( quaternion1 ) )
//       next()
//     } )

//     it( 'should return the second quaternion values if time is 1', ( next ) => {
//       const quaternion1 = Quaternion().fromAxisAngle( Vector( 0, 0, 1 ).toObject(), Math.PI / 2 ).toObject()
//       const quaternion2 = Quaternion().fromAxisAngle( Vector( 0, 1, 0 ).toObject(), Math.PI / 2 ).toObject()
//       const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 1 ).toObject()
//       assert.ok( Quaternion( quaternion ).isEqual( quaternion2 ) )
//       next()
//     } )

//     it( 'should return a quaternion in the middle if time is 0.5', ( next ) => {
//       const quaternion1 = Quaternion().fromAxisAngle( Vector( 0, 0, 1 ).toObject(), Math.PI / 2 ).toObject()
//       const quaternion2 = Quaternion().fromAxisAngle( Vector( 0, 1, 0 ).toObject(), Math.PI / 2 ).toObject()
//       const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 0.5 ).toObject()
//       assert.ok( quaternion.x === 0 && quaternion.y === 0.40824829046386296 && quaternion.z === 0.40824829046386296 && quaternion.w === 0.816496580927726 )
//       next()
//     } )

//     it( 'should return a quaternion in the middle if time is 0.5 and quaternions have a dot product lower than 0', ( next ) => {
//       const quaternion1 = Quaternion().fromAxisAngle( Vector( 1, 0, -1 ).toObject(), Math.PI / 2 ).toObject()
//       const quaternion2 = Quaternion().fromAxisAngle( Vector( -5, 0, 0 ).toObject(), Math.PI / 2 ).toObject()
//       const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 0.5 ).toObject()
//       assert.ok( quaternion.x === 0.7071067811865475 && quaternion.y === 0 && quaternion.z === -0.7071067811865475 && quaternion.w === 0.7071067811865476 )
//       next()
//     } )

//     it( 'should return a quaternion in the middle if time is 0.5 and quaternions have a dot product very very close to 1 but still below (mathematical errors)', ( next ) => {
//       const quaternion1 = Quaternion( 0, 0, 1, 1 ).toObject()
//       const quaternion2 = Quaternion( 0, 0, 0.9999999999999999, 0 ).toObject()
//       const quaternion = Quaternion( quaternion1 ).clone().slerp( quaternion2, 0.5 ).toObject()
//       assert.ok( quaternion.x === 0 && quaternion.y === 0 && quaternion.z === 0.8944271909999159 && quaternion.w === 0.4472135954999579 )
//       next()
//     } )
//   } )
// } )
