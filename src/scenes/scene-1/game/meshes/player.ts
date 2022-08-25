import { PhysicsImpostor, Scene, SceneLoader, Sound, Animation, Mesh, Vector3 } from 'babylonjs';
import { APrefab  } from '../../../../interfaces/Prefab';

export class Player extends APrefab {
  states = {
    died: false,
  };

  events = {
    die: this.die.bind(this)
  };

  constructor(private scene: Scene) {
    super();

    this.initSounds();
  }

  initSounds() {
    const fall = new Sound("fall", "/assets/scene-1/songs/fall.mp3", this.scene, null, {
      volume: 0.5
    })

    this._sounds = {
      fall,
    }
  }

  dieAnimation() {
    const frameRate = 1;
    const positionFrames = [];


    const ySlide = new Animation(
      "ySlide",
      "position.y",
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    positionFrames.push({ frame: 0 * frameRate, value: -0.56 });
    positionFrames.push({ frame: 0.5 * frameRate, value: 1 });
    positionFrames.push({ frame: 1 * frameRate, value: -3 });
    ySlide.setKeys(positionFrames);


  
    return ySlide;
  }

  async initMesh() {
    const mesh = await SceneLoader.ImportMeshAsync("", `assets/scene-1/meshes/cat/`, "cat.babylon", this.scene);

    const player = <Mesh> mesh.meshes[0];

    player.name = "player"
  
    player.parent = null;
    player.position = new Vector3(-1.5, 1, 3.55);
  
    player.rotationQuaternion = null;
    player.rotation.y += -Math.PI / 2;
  
    player.physicsImpostor = new PhysicsImpostor(
      player, PhysicsImpostor.BoxImpostor, 
      { mass: 0.8, restitution: 0 }
    );

    const rotationFrames = [];

    const Rotate = new Animation(
      "ySlide", 
      "rotation.y",
      1, 
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    rotationFrames.push({ frame: 0.5 * 1, value: Math.PI });
    Rotate.setKeys(rotationFrames);
  
    player.animations.push(this.dieAnimation());
    player.animations.push(Rotate);

    this._mesh = player;
  }

  get mesh() {
    return this._mesh;
  }

  die() {
    console.log('asuygdasyudsygau')
    // this.states.died = true;
    // this._sounds.fall.play();
    // this.mesh?.physicsImpostor?.dispose();
    this.mesh.rotation.y = Math.PI;

    // this.scene.beginAnimation(this.mesh, 0, 20, true);
  }
}
