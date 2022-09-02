import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from 'babylonjs';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export function createSky(scene: Scene) {
  const background = MeshBuilder.CreatePlane('sky', { width: 10, height: 20 });
  const backgroundMaterial = new StandardMaterial('skyMaterial', scene);
  const parent = new Mesh("sky", scene);

  background.position.z = 5;
  background.position.y = 0.3;

  backgroundMaterial.diffuseColor = new Color3(95/255, 165/255, 245/255);
  backgroundMaterial.specularColor = new Color3(0, 0, 0);
  background.material = backgroundMaterial;

  new InfiniteBackground('sky', [background], scene, {
    velocityX: -0.01,
    parent,
    spawnPlace: {
      z: 20,
      x: 26,
      y: 0
    },
    despawnPlace: {
      z: 20,
      x: -30,
      y: 0
    }
  })

  return background;
}