import {
  Vector3,
  HemisphericLight,
  Scene,
  AmmoJSPlugin,
  PhysicsImpostor,
  MeshBuilder,
} from 'babylonjs';

import SceneComponent from '../../../components/SceneComponent/SceneComponent';

import "babylonjs";
import { createPlayer } from './meshes/player';
import { createSky } from './meshes/sky';
import { createGround } from './meshes/ground';
import { createBackground } from './meshes/background';
import { createCamera } from './camera';
import { move } from './movement/movement';
import { Obstacles } from './obstacles/obstacles';
import { memo, useState } from 'react';


async function onSceneMount(scene: Scene) {
  scene.enablePhysics(null, new AmmoJSPlugin(false));
  
  createCamera(scene);
  // createSky(scene);
  createBackground(scene);
  const { invisibleGround, sliderGround } = createGround(scene);
  const player = await createPlayer(scene);
  const light = new HemisphericLight('light', new Vector3(0, 0, 0), scene);
  light.intensity = 2;
  const obstacles = new Obstacles(scene, player as any);
  await obstacles.init();

  let moveOpts = {
    canJump: false,
    jumping: false,
  }

  moveOpts = move(scene, player as any, moveOpts);

  player!.physicsImpostor!.registerOnPhysicsCollide(invisibleGround.physicsImpostor!, () => {
    moveOpts.canJump = true;
    moveOpts.jumping = false;
  });

  scene.onBeforeRenderObservable.add(() => {
    obstacles.spawnWithDelay(1000, 2000);
  });

  scene.debugLayer.show();
}

function Game() {
  return (
    <SceneComponent 
      antialias 
      id="babylonscene"
      adaptToDeviceRatio 
      onSceneReady={onSceneMount} 
    />
  );
}

export default memo(Game)
