import { Color3, Color4, Mesh, MeshBuilder, PhysicsImpostor, Scene, StandardMaterial, Texture, Vector3 } from 'babylonjs';
import { APrefab } from '../../../../interfaces/Prefab';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

function createSliderGround(scene: Scene, container: Mesh) {
  const sliderGround = MeshBuilder.CreatePlane('slider-ground', { width: 10, height: 2 });
  const sliderGroundMaterial = new StandardMaterial('groundMaterial', scene);

  sliderGroundMaterial.diffuseTexture = new Texture("assets/scene-1/textures/calcada.png", scene);
  sliderGroundMaterial.specularColor = new Color3(0, 0, 0);
  sliderGround.material = sliderGroundMaterial;
  sliderGround.rotationQuaternion = null;
  sliderGround.rotation.x = Math.PI / 2;
  sliderGround.position.y = -1.02;
  sliderGround.position.z = 3.36;

  new InfiniteBackground('slider-ground', [sliderGround], scene, {
    velocityX: -0.05, 
    parent: container, 
    spawnPlace: {
      x: 8,
      z: 3.36,
      y: -1.02
    },
    despawnPlace: {
      x: -8,
      z: 3.36,
      y: -1.02
    },
  });

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

export class Ground extends APrefab {
  async initMesh() {
    const container = new Mesh("ground", this.scene);

    const sliderGround = createSliderGround(this.scene, container);
    const invisibleGround = createInvisibleGround(this.scene);
  
    container.addChild(sliderGround);
    container.addChild(invisibleGround);

    this._mesh = {
      invisibleGround,
      sliderGround
    }
  }

  async initSounds() {
    throw new Error('Method not implemented.');
  }
  
  get mesh() {
    return this._mesh;
  }
}
