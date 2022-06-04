import { Color3, Color4, Mesh, MeshBuilder, PhysicsImpostor, Scene, StandardMaterial, Texture, Vector3 } from 'babylonjs';
import { InfiniteBackground } from '../../../../utils/infinite-background';

export function createGround(scene: Scene) {
  const sliderGround = createSliderGround(scene);
  const invisibleGround = createInvisibleGround(scene);

  return {
    sliderGround,
    invisibleGround
  }
}

function createSliderGround(scene: Scene) {
  const sliderGround = MeshBuilder.CreateBox('slider-ground', { width: 10, height: 1 });
  const sliderGroundMaterial = new StandardMaterial('groundMaterial', scene);

  sliderGround.position.z = 3.55;
  sliderGround.position.y = -1.5;

  sliderGroundMaterial.diffuseTexture = new Texture("/assets/scene-1/textures/ground.png", scene);
  sliderGroundMaterial.diffuseTexture.hasAlpha = true;
  sliderGroundMaterial.specularColor = new Color3(0, 0, 0);
  sliderGround.material = sliderGroundMaterial;

  new InfiniteBackground(sliderGround, scene, {velocityX: -0.05, instancesQty: 5});

  return sliderGround;
}

function createInvisibleGround(scene: Scene) {
  const invisibleGround = MeshBuilder.CreateBox('invisible-ground', { size: 1 });
  const invisibleGroundMaterial = new StandardMaterial('groundMaterial', scene);

  invisibleGround.position = new Vector3(-1.5, -1.5, 3.55);

  invisibleGroundMaterial.alpha = 0;
  invisibleGround.material = invisibleGroundMaterial;

  invisibleGround.physicsImpostor = new PhysicsImpostor(invisibleGround, PhysicsImpostor.BoxImpostor, {
    mass: 0,
    restitution: 0
  });

  return invisibleGround;
}


