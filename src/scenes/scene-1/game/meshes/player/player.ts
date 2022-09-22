import { PhysicsImpostor, Scene, SceneLoader, Sound, Mesh, Vector3 } from 'babylonjs';
import { APrefab  } from '../../../../../interfaces/Prefab';
import { TGenericObject } from '../../../../../utils/types';
import { dieAnimation } from './animations';
import { UIEvents } from '../../../../../store/ui';
import { Ground } from '../ground';
import { IMove } from '../../types';

export class Player extends APrefab {
  // SAVED
  // declare _mesh: Mesh;

  states = {
    died: false,
  };

  events = {
    die: this.die.bind(this)
  };

  constructor(private ground: Ground, scene: Scene, private moveOpts: IMove) {
    super(scene);
    this.initSounds();

    UIEvents.onGameOver.add((gameover: boolean) => {
      if (!gameover) {
        this.states.died = false;

        this._mesh.position = new Vector3(-1.5, 1, 3.55);
        (this._mesh as Mesh).rotation.x = -Math.PI / 2;

        this._mesh.physicsImpostor = new PhysicsImpostor(
          (this._mesh as Mesh), PhysicsImpostor.BoxImpostor, 
          { mass: 0.8, restitution: 0 }
        );

        this._mesh.rotationQuaternion = null;

        (this._mesh as Mesh).physicsImpostor!.registerOnPhysicsCollide((ground.mesh as TGenericObject<Mesh>).invisibleGround.physicsImpostor!, () => {
          moveOpts.jumping.canJump = true;
          moveOpts.jumping.isJumping = false;
        });
      }
    });
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
    UIEvents.onGameOver.notifyObservers(true);
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

    (this._mesh as Mesh).physicsImpostor!.registerOnPhysicsCollide((this.ground.mesh as TGenericObject<Mesh>).invisibleGround.physicsImpostor!, () => {
      this.moveOpts.jumping.canJump = true;
      this.moveOpts.jumping.isJumping = false;
    });
  }

  get mesh() {
    return this._mesh;
  }
}
