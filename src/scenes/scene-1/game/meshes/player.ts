import { PhysicsImpostor, Scene, SceneLoader, StandardMaterial, Vector3 } from '@babylonjs/core';

export async function createPlayer(scene: Scene) {
  const player = await SceneLoader.ImportMeshAsync("", `assets/scene-1/meshes/`, "untitled.glb", scene);

  player.meshes[0].position.z = 3.55;
  player.meshes[0].position.y = 1;
  player.meshes[0].position.x = -1.5;

  player.meshes[0].scaling = new Vector3(0.01, 0.01, 0.01);
  player.meshes[0].rotationQuaternion = null;
  player.meshes[0].rotation.y += Math.PI / 2;

  player.meshes[0].physicsImpostor = new PhysicsImpostor(player.meshes[0], PhysicsImpostor.BoxImpostor, {
    mass: 1,
    restitution: 0,
    friction: 0
  });

  return player.meshes[0];
}