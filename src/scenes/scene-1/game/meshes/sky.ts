import { Color3, Mesh, MeshBuilder, StandardMaterial } from 'babylonjs';
import { APrefab } from '../../../../interfaces/Prefab';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export class Sky extends APrefab {
  async initMesh() {
    const background = MeshBuilder.CreatePlane('sky', { width: 10, height: 20 });
    const backgroundMaterial = new StandardMaterial('skyMaterial', this.scene);
    const parent = new Mesh("sky", this.scene);

    background.position.z = 5;
    background.position.y = 0.3;

    backgroundMaterial.diffuseColor = new Color3(95/255, 165/255, 245/255);
    backgroundMaterial.specularColor = new Color3(0, 0, 0);
    background.material = backgroundMaterial;

    new InfiniteBackground('sky', [background], this.scene, {
      velocityX: -0.01,
      parent,
      spawnPlace: {
        z: 20,
        x: 26,
        y: 0
      },
      despawnPlace: {
        z: 20,
        x: -30,
        y: 0
      }
    })
  }

  async initSounds() {
    throw new Error('Method not implemented.');
  }
}
