import { AmmoJSPlugin, HemisphericLight, Scene, Sound, Vector3 } from 'babylonjs';

import SceneComponent from '../../../components/SceneComponent/SceneComponent';

import { memo } from 'react';
import { Player } from './meshes/player/player';
import { Sky } from './meshes/sky';
import { Ground } from './meshes/ground';
import { City } from './meshes/city';
import { createCamera } from './camera';
import { move } from './movement/movement';
import { Obstacles } from './obstacles/obstacles';
import { Mountains } from './meshes/mountains';
import { Street } from './meshes/street';
import { Fence } from './meshes/fence';
import { IMove } from './types';
import { loader } from '../../../utils/loader/loader';

async function onSceneMount(scene: Scene) {
  scene.enablePhysics(null, new AmmoJSPlugin(false));
  createCamera(scene);

  let moveOpts: IMove = {
    jumping: {
      canJump: false,
      isJumping: false,
      jumpStartTime: 0,
    },
  }

  const street = new Street(scene);
  const fence = new Fence(scene);
  const sky = new Sky(scene);
  const mountains = new Mountains(scene);
  const city = new City(scene);
  const ground = new Ground(scene);
  const player = new Player(ground, scene, moveOpts);

  await loader([
    player.initMesh(),
    street.initMesh(),
    fence.initMesh(),
    sky.initMesh(),
    mountains.initMesh(),
    city.initMesh(),
    ground.initMesh()
  ])

  const light = new HemisphericLight('light', new Vector3(0, 0, 0), scene);
  light.intensity = 2;
  new Obstacles(scene, player);
  
  // new Sound("BgMusic", "assets/scene-1/songs/bg-music.mp3", scene, null, {
  //   loop: true,
  //   autoplay: true,
  //   volume: 0.2,
  // });

  moveOpts = move(scene, player, moveOpts);

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
