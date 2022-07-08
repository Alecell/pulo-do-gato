import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from 'babylonjs';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export function createMountains(scene: Scene) {
  const mountain = MeshBuilder.CreatePlane('mountain', { width: 5.06, height: 1 });
  const mountainMaterial = new StandardMaterial('mountainMaterial', scene);
  const parent = new Mesh("mountain", scene);

  mountain.position.z = 5;
  mountain.position.y = 0.3;

  mountainMaterial.diffuseTexture = new Texture("/assets/scene-1/textures/mountains.png", scene);
  mountainMaterial.diffuseTexture.hasAlpha = true;
  mountainMaterial.specularColor = new Color3(0, 0, 0);
  mountain.material = mountainMaterial;

  new InfiniteBackground('mountain', [mountain], scene, {
    velocityX: -0.01,
    parent,
    spawnPlace: {
      z: 17,
      x: 26,
      y: 0.1
    },
    despawnPlace: {
      z: 17,
      x: -15,
      y: 0.1
    }
  })

  return mountain;
}