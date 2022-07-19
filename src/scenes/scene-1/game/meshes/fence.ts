import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from 'babylonjs';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export function createFence(scene: Scene) {
  const fence = MeshBuilder.CreatePlane('fence', { width: 0.2, height: 1 });
  const fenceMaterial = new StandardMaterial('fenceMaterial', scene);
  const texture = new Texture("/assets/scene-1/textures/fence.png", scene);
  const parent = new Mesh("fence", scene);

  fence.position.z = 5;
  fence.position.y = 0.3;

  fenceMaterial.diffuseTexture = texture;
  fenceMaterial.diffuseTexture.hasAlpha = true;
  fenceMaterial.specularColor = new Color3(0, 0, 0);
  fence.material = fenceMaterial;

  new InfiniteBackground('fence', [fence], scene, {
    velocityX: -0.05,
    parent,
    spawnPlace: {
      z: 14.7,
      x: 26,
      y: -1
    },
    despawnPlace: {
      z: 14.7,
      x: -15,
      y: -1
    }
  })

  return fence;
}