import { ActionManager, ExecuteCodeAction, Mesh, Scene, Vector3 } from 'babylonjs';
import { IMoveOpts } from './types';

export function move(scene: Scene, box: Mesh, opts: IMoveOpts): IMoveOpts {
  const tempOpts = { ...opts };
  const inputMap: { [key: string]: boolean } = {};
  const newScene = scene;
  const player = box;

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
    if (inputMap.w) {
      player.position.z += 0.1;
    }
    if (inputMap.a) {
      player.position.x -= 0.1;
    }
    if (inputMap.s) {
      player.position.z -= 0.1;
    }
    if (inputMap.d) {
      player.position.x += 0.1;
    }
    if (inputMap[' '] && tempOpts.canJump) {
      var impulseDirection = new Vector3(0, 1, 0);
      var impulseMagnitude = 4.5;

      if (player && player.physicsImpostor) {
        tempOpts.jumping = true;
        tempOpts.canJump = false;
        player.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
        player.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), player.getAbsolutePosition());
      }
    }

    player!.physicsImpostor!.setAngularVelocity(new Vector3(0, 0, 0));
  });

  return tempOpts;
}