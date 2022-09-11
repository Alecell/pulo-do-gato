import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from 'babylonjs';
import { APrefab } from '../../../../interfaces/Prefab';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export class Mountains extends APrefab {
  async initMesh() {
    const mountain = MeshBuilder.CreatePlane('mountain', { width: 20, height: 4 });
    const mountainMaterial = new StandardMaterial('mountainMaterial', this.scene);
    const parent = new Mesh("mountain", this.scene);

    mountain.position.z = 5;
    mountain.position.y = 0.3;

    mountainMaterial.diffuseTexture = new Texture("assets/scene-1/textures/mountains.png", this.scene);
    mountainMaterial.diffuseTexture.hasAlpha = true;
    mountainMaterial.specularColor = new Color3(0, 0, 0);
    mountain.material = mountainMaterial;

    mountainMaterial.diffuseTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
    mountainMaterial.diffuseTexture.wrapV = Texture.CLAMP_ADDRESSMODE;


    new InfiniteBackground('mountain', [mountain], this.scene, {
      velocityX: -0.01,
      parent,
      spawnPlace: { z: 17, x: 26, y: 0.1 },
      despawnPlace: { z: 17, x: -15, y: 0.1 }
    })
  }

  async initSounds() {
    throw new Error('Method not implemented.');
  }
}
