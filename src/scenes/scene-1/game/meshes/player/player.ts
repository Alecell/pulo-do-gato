import { PhysicsImpostor, Scene, SceneLoader, Sound, Mesh, Vector3 } from 'babylonjs';
import { APrefab  } from '../../../../../interfaces/Prefab';
import { TGenericObject } from '../../../../../utils/types';
import { dieAnimation } from './animations';

export class Player extends APrefab {
  states = {
    died: false,
  };

  events = {
    die: this.die.bind(this)
  };

  constructor(scene: Scene) {
    super(scene);
    this.initSounds();
  }

  async initSounds() {
    const fall = new Sound("fall", "assets/scene-1/songs/fall.mp3", this.scene, null, {
      volume: 0.5
    })

    this._sounds = {
      fall,
    }
  }

  die() {
    this.states.died = true;
    this._sounds.fall.play();
    this.mesh?.physicsImpostor?.dispose();
    this.scene.beginDirectAnimation(this.mesh, dieAnimation(), 0, 5, false);
  }

  async initMesh() {
    const mesh = await SceneLoader.ImportMeshAsync("", `assets/scene-1/meshes/cat/`, "cat.babylon", this.scene);
    const player = <Mesh> mesh.meshes[0];

    player.name = "player"
    player.parent = null;
    player.position = new Vector3(-1.5, 1, 3.55);
    player.rotation.y += -Math.PI / 2;
  
    player.physicsImpostor = new PhysicsImpostor(
      player, PhysicsImpostor.BoxImpostor, 
      { mass: 0.8, restitution: 0 }
    );

    player.rotationQuaternion = null;
    this._mesh = player;
  }

  get mesh() {
    return this._mesh;
  }
}
