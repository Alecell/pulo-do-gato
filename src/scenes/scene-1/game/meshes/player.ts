import { Color3, PhysicsImpostor, Scene, SceneLoader, StandardMaterial } from 'babylonjs';

export async function createPlayer(scene: Scene) {
  const player = await SceneLoader.ImportMeshAsync("", `assets/scene-1/meshes/`, "cat.babylon", scene);
  const material = new StandardMaterial('playerMaterial', scene);
  
  player.meshes[0].normalizeToUnitCube();
  player.meshes[0].parent = null;
  player.meshes[0].position.z = 3.55;
  player.meshes[0].position.y = 1;
  player.meshes[0].position.x = -1.5;

  player.meshes[0].rotationQuaternion = null;
  player.meshes[0].rotation.y += -Math.PI / 2;
  
  player.meshes[0].physicsImpostor = new PhysicsImpostor(player.meshes[0], PhysicsImpostor.BoxImpostor, {
    mass: 1,
    restitution: 0
  });

  material.specularColor = new Color3(1, 1, 1);
  player.meshes[0].material = material;

  return player.meshes[0];
}