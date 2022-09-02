import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from 'babylonjs';
import { APrefab } from '../../../../interfaces/Prefab';
import { InfiniteBackground } from '../../../../utils/infinite-background/infinite-background';

export class Street extends APrefab {
  async initSounds() {
    throw new Error('method is not implemented yet');
  }

  async initMesh() {
    const street = MeshBuilder.CreatePlane('street', { width: 10, height: 10 });
    const streetMaterial = new StandardMaterial('streetMaterial', this.scene);
    const texture = new Texture("assets/scene-1/textures/street.png", this.scene);
    const parent = new Mesh("street", this.scene);
    
    texture.wAng = -Math.PI / 2;
  
    street.position.z = 5;
    street.position.y = 0.3;
    street.rotation.x = Math.PI / 2;
  
    streetMaterial.diffuseTexture = texture;
    streetMaterial.specularColor = new Color3(0, 0, 0);
    street.material = streetMaterial;
  
    new InfiniteBackground('street', [street], this.scene, {
      velocityX: -0.05,
      parent,
      spawnPlace: {
        z: 10.5,
        x: 26,
        y: -1.4
      },
      despawnPlace: {
        z: 10.5,
        x: -15,
        y: -1.4
      }
    })
  }
}