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


function onSceneMount(scene: Scene) {
  scene.enablePhysics(null, new AmmoJSPlugin(false));
  
  const player = createPlayer(scene);
  const light = new HemisphericLight('light', new Vector3(0, 0, 0), scene);
  light.intensity = 10;
  createCamera(scene);
  const obstacles = new Obstacles(scene, player);

  let moveOpts = {
    canJump: false,
    jumping: false,
  }

  createSky(scene);
  createBackground(scene);
  const ground = createGround(scene);
  SceneLoader.ImportMeshAsync("Landscape", `/assets/scene-1/meshes`, "landscape.babylon", scene);

  moveOpts = move(scene, player, moveOpts);
  
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