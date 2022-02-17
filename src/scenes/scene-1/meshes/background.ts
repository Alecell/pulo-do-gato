import { Color3, MeshBuilder, Scene, StandardMaterial, Texture } from '@babylonjs/core';
import { InfiniteBackground } from '../../../utils/infinite-background';

export function createBackground(scene: Scene) {
  const background = MeshBuilder.CreatePlane('background', { width: 7, height: 3 });
  const backgroundMaterial = new StandardMaterial('backgroundMaterial', scene);

  background.position.z = 4;

  backgroundMaterial.diffuseTexture = new Texture("/assets/scene-1/textures/background.png", scene);
  backgroundMaterial.diffuseTexture.hasAlpha = true;
  backgroundMaterial.specularColor = new Color3(0, 0, 0);
  background.material = backgroundMaterial;

  new InfiniteBackground(background, scene, {velocityX: -0.005});

  return background;
}
