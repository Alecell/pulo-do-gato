import { ActionManager, ExecuteCodeAction, Mesh, Scene, Sound, Vector3 } from 'babylonjs';
import { Player } from '../meshes/player/player';
import { IMove } from '../types';
import { isMobile } from 'react-device-detect';
import { UIEvents } from '../../../../store/ui';

function playerJump(player: Player, scene: Scene, tempOpts: IMove) {
  const impulseDirection = new Vector3(0, 1, 0);
  const impulseMagnitude = 5.5;

  if (player && player.mesh.physicsImpostor) {
    tempOpts.jumping.isJumping = true;
    tempOpts.jumping.canJump = false;

    (player.mesh as Mesh).physicsImpostor!.setLinearVelocity(new Vector3(0, 0, 0));
    player.mesh.physicsImpostor.applyImpulse(
      impulseDirection.scale(impulseMagnitude), 
      (player.mesh as Mesh).getAbsolutePosition()
    );
  }
}

export function move(scene: Scene, player: Player, opts: IMove): IMove {
  const tempOpts = { ...opts };
  const inputMap: { [key: string]: boolean } = {};
  const newScene = scene;

  const jump = new Sound("jump", "assets/scene-1/songs/jump.mp3", scene, null, {
    volume: 0.3,
  });

  newScene.actionManager = new ActionManager(scene);

  UIEvents.onGameOver.add((gameover: boolean) => {
    if (!gameover) {
      opts.jumping.canJump = true;
      opts.jumping.isJumping = false;
    }
  });

  newScene.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function handleKeyDown(evt) {
      inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
    })
  );

  newScene.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function handleKeyUp(evt) {
      inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
    })
  );

  newScene.onPointerObservable.add((pointerInfo) => {
    if (tempOpts.jumping.canJump && isMobile) {
      playerJump(player, scene, tempOpts);
    }
  });

  newScene.onBeforeRenderObservable.add(() => {
    if (inputMap[' '] && tempOpts.jumping.canJump) {
      jump.play();
      playerJump(player, scene, tempOpts);
    }
  });

  return tempOpts;
}