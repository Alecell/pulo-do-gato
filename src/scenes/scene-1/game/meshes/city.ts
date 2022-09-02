import { Mesh, Scene, SceneLoader } from 'babylonjs';
import { APrefab } from '../../../../interfaces/Prefab';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export class City extends APrefab {
  async initMesh() {
    const test = await SceneLoader.ImportMeshAsync("", `assets/scene-1/meshes/background/casas/`, "test.babylon", this.scene);
    const parent = new Mesh("background", this.scene);

    test.meshes.forEach(mesh => {
      parent.addChild(mesh);
    })

    new InfiniteBackground(
      'background',
      test.meshes as Mesh[],
      this.scene, {
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

  async initSounds() {
    throw new Error('Method not implemented.');
  }
  
}
