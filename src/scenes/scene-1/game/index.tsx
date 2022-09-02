import {
  Vector3,
  HemisphericLight,
  Scene,
  AmmoJSPlugin,
  PhysicsImpostor,
  MeshBuilder,
  SceneLoader,
  Color4,
  Sound,
} from 'babylonjs';

import SceneComponent from '../../../components/SceneComponent/SceneComponent';

import { memo } from 'react';
import { Player } from './meshes/player/player';
import { Sky } from './meshes/sky';
import { createGround } from './meshes/ground';
import { City } from './meshes/city';
import { createCamera } from './camera';
import { move } from './movement/movement';
import { Obstacles } from './obstacles/obstacles';
import { Mountains } from './meshes/mountains';
import { Street } from './meshes/street';
import { Fence } from './meshes/fence';
import { IMove } from './types';

async function onSceneMount(scene: Scene) {
  scene.enablePhysics(null, new AmmoJSPlugin(false));
  
  createCamera(scene);
  const street = new Street(scene);
  const fence = new Fence(scene);
  const sky = new Sky(scene);
  const mountains = new Mountains(scene);
  const city = new City(scene);
  const { invisibleGround } = createGround(scene);
  const player = new Player(scene);

  await player.initMesh();
  await street.initMesh();
  await fence.initMesh();
  await sky.initMesh();
  await mountains.initMesh();
  await city.initMesh();

  const light = new HemisphericLight('light', new Vector3(0, 0, 0), scene);
  light.intensity = 2;
  const obstacles = new Obstacles(scene, player);
  await obstacles.init();

  let moveOpts: IMove = {
    jumping: {
      canJump: false,
      isJumping: false,
      jumpStartTime: 0,
    },
  }
  
  new Sound("BgMusic", "assets/scene-1/songs/bg-music.mp3", scene, null, {
    loop: true,
    autoplay: true,
    volume: 0.2,
  });

  moveOpts = move(scene, player, moveOpts);

  player.mesh!.physicsImpostor!.registerOnPhysicsCollide(invisibleGround.physicsImpostor!, () => {
    moveOpts.jumping.canJump = true;
    moveOpts.jumping.isJumping = false;
  });
  
  scene.onBeforeRenderObservable.add(() => {
    obstacles.spawnWithDelay(1000, 2000);
  });

  // scene.debugLayer.show();
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
