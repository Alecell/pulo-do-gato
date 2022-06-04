import { Color3, MeshBuilder, Scene, StandardMaterial, Texture } from 'babylonjs';

export function createSky(scene: Scene) {
  const background = MeshBuilder.CreatePlane('sky', { width: 10, height: 4 });
  const backgroundMaterial = new StandardMaterial('skyMaterial', scene);

  background.position.z = 5;
  background.position.y = 0.3;

  backgroundMaterial.diffuseTexture = new Texture("/assets/scene-1/textures/sky.jpg", scene);
  backgroundMaterial.diffuseTexture.hasAlpha = true;
  backgroundMaterial.specularColor = new Color3(0, 0, 0);
  background.material = backgroundMaterial;

  return background;
}