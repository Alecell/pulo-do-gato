import {
  Vector3,
  HemisphericLight,
  Scene,
  SceneLoader,
  AmmoJSPlugin,
  MeshBuilder,
} from '@babylonjs/core';

import SceneComponent from '../../components/SceneComponent/SceneComponent';

import "@babylonjs/inspector";
import { createPlayer } from './meshes/player';
import { createSky } from './meshes/sky';
import { createGround } from './meshes/ground';
import { createBackground } from './meshes/background';
import { createCamera } from './camera';
import { move } from './movement/movement';
import { Obstacles } from './obstacles/obstacles';


async function onSceneMount(scene: Scene) {
  scene.enablePhysics(null, new AmmoJSPlugin(false));
  
  createCamera(scene);
  createSky(scene);
  createBackground(scene);
  const ground = createGround(scene);
  const player = await createPlayer(scene);
  const light = new HemisphericLight('light', new Vector3(0, 0, 0), scene);
  light.intensity = 10;
  const obstacles = new Obstacles(scene, player as any);
  await obstacles.init();
  await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/`, "trash.glb", scene);

  let moveOpts = {
    canJump: false,
    jumping: false,
  }

  moveOpts = move(scene, player as any, moveOpts);
  
  scene.onBeforeRenderObservable.add(() => {
    obstacles.spawnWithDelay(1000, 2000);

    if (player.intersectsMesh(ground)) {
      moveOpts.canJump = true;
      moveOpts.jumping = false;
    } else {
      moveOpts.canJump = false;
      moveOpts.jumping = true;
    }
  })

  scene.debugLayer.show();
}

function Scene1() {
  return (
    <SceneComponent 
      antialias 
      id="babylonscene"
      adaptToDeviceRatio 
      onSceneReady={onSceneMount} 
    />
  );
}

export default Scene1;