import { Color3, MeshBuilder, PhysicsImpostor, Scene, StandardMaterial, Texture } from '@babylonjs/core';
import { InfiniteBackground } from '../../../utils/infinite-background';

export function createGround(scene: Scene) {
  const ground = MeshBuilder.CreateBox('ground', { width: 10, height: 1 });
  const groundMaterial = new StandardMaterial('groundMaterial', scene);

  ground.position.z = 3.55;
  ground.position.y = -1.5;

  groundMaterial.diffuseTexture = new Texture("/assets/scene-1/textures/ground.png", scene);
  groundMaterial.diffuseTexture.hasAlpha = true;
  groundMaterial.specularColor = new Color3(0, 0, 0);
  ground.material = groundMaterial;

  ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, {
    mass: 0,
    restitution: 0,
    friction: 10
  });

  new InfiniteBackground(ground, scene, {velocityX: -0.05, instancesQty: 5});

  return ground;
}