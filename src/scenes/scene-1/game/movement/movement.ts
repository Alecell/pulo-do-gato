import { ActionManager, ExecuteCodeAction, Mesh, Scene, Sound, Vector3 } from 'babylonjs';
import { Player } from '../meshes/player';
import { IMove } from '../types';

export function move(scene: Scene, player: Player, opts: IMove): IMove {
  const tempOpts = { ...opts };
  const inputMap: { [key: string]: boolean } = {};
  const newScene = scene;

  const jump = new Sound("jump", "/assets/scene-1/songs/jump.mp3", scene, null, {
    volume: 0.5
  });

  newScene.actionManager = new ActionManager(scene);

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

  newScene.onBeforeRenderObservable.add(() => {
    if (inputMap[' '] && tempOpts.jumping.canJump) {
      const impulseDirection = new Vector3(0, 1, 0);
      const impulseMagnitude = 4.5;

      jump.play();

      if (player && player.mesh.physicsImpostor) {
        tempOpts.jumping.isJumping = true;
        tempOpts.jumping.canJump = false;
        // player.mesh.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
        // player.mesh.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), player.mesh.getAbsolutePosition());
      }
    }

    // player!.physicsImpostor!.setAngularVelocity(new Vector3(0, 0, 0));
  });

  return tempOpts;
}