# geometry3d
A 3D geometry library. Useful for computing 3d shapes and collisions, on both client side and server side.

## Manuals
- [Getting Started](manual/getting-started.md)

### Entities
- Point - DONE
- Vector - DONE
- Quaternion - DONE

- Plane
- Box
- Sphere
- Cylinder
- Polyhedron
- Group (Concave Polyhedron)

- Ray
- Map (broad phase collision)
- Collision (narrow phase)

### TODO
- Describe why we chose Quaternions vs Euler or Matrix. Basically faster for CPU and lower data.
- Describe why we chose Map vs QuadTree. No size restrictions and arguably faster.
- Describe how to use every entity in detail. How to use each method and when.
- Describe why certain shapes are ommited (not effective to test collision - better off combining shapes to form a group)
- Describe how to create a server-controlled game.
- Describe the differences in a perfect shpere and a rendered one
- Performance tests
- Visual tests

- Update documentation output with manual and a playground. Have the playground build out of querystring params, so you can console.visualize([ box, plane, etc])
- Rename the project ?