import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from 'babylonjs';
import { APrefab } from '../../../../interfaces/Prefab';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export class Fence extends APrefab {
  async initMesh() {
    const fence = MeshBuilder.CreatePlane('fence', { width: 0.2, height: 1 });
    const fenceMaterial = new StandardMaterial('fenceMaterial', this.scene);
    const texture = new Texture("assets/scene-1/textures/fence.png", this.scene);
    const parent = new Mesh("fence", this.scene);

    fence.position.z = 5;
    fence.position.y = 0.3;

    fenceMaterial.diffuseTexture = texture;
    fenceMaterial.diffuseTexture.hasAlpha = true;
    fenceMaterial.specularColor = new Color3(0, 0, 0);
    fence.material = fenceMaterial;

    fenceMaterial.diffuseTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
    fenceMaterial.diffuseTexture.wrapV = Texture.CLAMP_ADDRESSMODE;

    new InfiniteBackground('fence', [fence], this.scene, {
      velocityX: -0.05,
      parent,
      spawnPlace: {
        z: 14.7,
        x: 26,
        y: -1
      },
      despawnPlace: {
        z: 14.7,
        x: -15,
        y: -1
      }
    })
  }

  async initSounds() {
    throw new Error('Method not implemented.');
  }
}
