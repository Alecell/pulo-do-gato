import { PhysicsImpostor, Scene, SceneLoader, Sound, Animation, Mesh, Vector3 } from 'babylonjs';
import { APrefab  } from '../../../../interfaces/Prefab';


class Player extends APrefab {
  died = false;

  constructor(private scene: Scene) {
    super();
    this.initSounds();
  }

  initSounds() {
    const fall = 'asd'
    
    this.sounds = {
      ...this.sounds,
      fall
    }
  }

  // dieAnimation() {
  //   const frameRate = 1;

  //   const ySlide = new Animation(
  //     "ySlide", 
  //     "position.y",
  //     frameRate, 
  //     Animation.ANIMATIONTYPE_FLOAT,
  //     Animation.ANIMATIONLOOPMODE_CONSTANT
  //   );
  
  //   const keyFrames = [];
  
  //   keyFrames.push({
  //     frame: 0 * frameRate,
  //     value: -0.56,
  //   });
    
  //   keyFrames.push({
  //     frame: 1 * frameRate,
  //     value: 1,
  //   });
  
  //   keyFrames.push({
  //     frame: 2 * frameRate,
  //     value: -3,
  //   });
  
  //   ySlide.setKeys(keyFrames);
  
  //   return ySlide;
  // }

  // createMesh() {
  //   const mesh = await SceneLoader.ImportMeshAsync("", `assets/scene-1/meshes/cat/`, "cat.babylon", scene);

  //   const player = mesh.meshes[0];

  //   player.name = "player"
  
  //   player.parent = null;
  //   player.position = new Vector3(3.55, 1, -1);
  
  //   player.rotationQuaternion = null;
  //   player.rotation.y += -Math.PI / 2;
  
  //   player.physicsImpostor = new PhysicsImpostor(
  //     player, PhysicsImpostor.BoxImpostor, 
  //     { mass: 0.8, restitution: 0 }
  //   );
  
  //   player.animations.push(this.dieAnimation());
  
  //   return player as Mesh;
  // }

  // die() {
  //   this.died = true;
  //   this.sounds.fall.play();
  //   this.mesh?.physicsImpostor?.dispose();
  //   scene.beginAnimation(this.mesh, 0, 20, true);
  // }

  // this.mesh = await createMesh();
}
