import { MeshBuilder, PhysicsImpostor, Scene } from '@babylonjs/core';

export function createPlayer(scene: Scene) {
  const player = MeshBuilder.CreateCapsule('player', {
    subdivisions: 2,
    tessellation: 16,
    height: 1,
    radius: 0.25,
    capSubdivisions: 6
  });

  player.position.z = 3.55;
  player.position.y = 1;
  player.position.x = -1.5;

  player.physicsImpostor = new PhysicsImpostor(player, PhysicsImpostor.BoxImpostor, {
    mass: 1,
    restitution: 0,
    friction: 0
  });

  return player;
}