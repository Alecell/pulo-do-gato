import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from 'babylonjs';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export function createBackgroundCity(scene: Scene) {
  const city = MeshBuilder.CreatePlane('city', { width: 2, height: 1 });
  const cityMaterial = new StandardMaterial('cityMaterial', scene);
  const parent = new Mesh("city", scene);

  city.position.z = 5;
  city.position.y = 0.3;

  cityMaterial.diffuseTexture = new Texture("/assets/scene-1/textures/predios-bg.png", scene);
  cityMaterial.diffuseTexture.hasAlpha = true;
  cityMaterial.specularColor = new Color3(0, 0, 0);
  city.material = cityMaterial;

  new InfiniteBackground('city', [city], scene, {
    velocityX: -0.01,
    parent,
    spawnPlace: {
      z: 15,
      x: 26,
      y: -0.2
    },
    despawnPlace: {
      z: 15,
      x: -15,
      y: -0.2
    }
  })

  return city;
}