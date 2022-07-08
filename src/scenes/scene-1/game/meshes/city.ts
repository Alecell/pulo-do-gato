import { Mesh, Scene, SceneLoader } from 'babylonjs';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export async function createBackground(scene: Scene) {
  const test = await SceneLoader.ImportMeshAsync("", `assets/scene-1/meshes/background/casas/`, "test.babylon", scene);
  const parent = new Mesh("background", scene);

  test.meshes.forEach(mesh => {
    parent.addChild(mesh);
  })

  new InfiniteBackground(
    'background',
    test.meshes as Mesh[],
    scene, {
    velocityX: -0.05,
    parent,
    spawnPlace: {
      z: 13,
      x: 26,
      y: -2
    },
    despawnPlace: {
      z: 13,
      x: -15,
      y: -1.5
    }
  });
}
