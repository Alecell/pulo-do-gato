import { Mesh, Scene, Vector3 } from 'babylonjs';
import { ChainedList, ListNode } from '../chained-list/chained-list';
import { IInfiniteBackground, TCoordinates, TInstance, TOptions } from './types';

/**
 * TODO:
 * Adicionar validação de limiter por raio permitindo o threshold ser para qualquer direção
 * Colocar tudo como filho de um mesh especifico para facilitar o debug. Talvez um mesh do infinite scrolling ou o proprio baseMesh
 * Não posso partir do pressuposto que a imagem está no centro, nem que a camera está no centro, preciso, ou de parametros para isso, ou definir isso programaticamente
 * Fazer o calculo de spawnPlace e despawnPlace pra quando o spawn for a esquerda do despawn 
 */
export class InfiniteBackground {
  name: string;
  container: Mesh;
  parent?: Mesh;
  meshes: Mesh[];
  instances: ChainedList<Mesh>;
  instancesQty = 0;

  constructor(
    name: string,
    meshes: IInfiniteBackground['mesh'][],
    scene: Scene, {
      velocityX = 0, 
      velocityY = 0, 
      instancesQty = 2,
      ...opts
    }: TOptions
  ) {
    this.parent = opts.parent;
    this.container = new Mesh(`${name}-infinity-container`, scene);
    this.name = name;
    this.meshes = meshes;
    this.instances = new ChainedList<Mesh>();

    this.initializeMeshes(opts.despawnPlace);

    this.fillSpawnSpace(opts.spawnPlace, opts.despawnPlace);

    scene.onBeforeRenderObservable.add(() => {
      const animationRatio = scene.getAnimationRatio();
      let instance = this.instances.head;

      while (instance) {
        instance.mesh!.position.x += velocityX * animationRatio;
        instance.mesh!.position.y += velocityY * animationRatio;

        instance = instance.next;

        if (this.instances.last!.mesh!.position.x < opts.spawnPlace.x) this.addInstance();
        if (instance && instance.mesh!.position.x < opts.despawnPlace.x) this.removeInstance();
      }
    })
  }

  removeInstance() {
    this.instances.head!.mesh!.dispose();
    this.instances.removeFirstItem();
  }

  initializeMeshes(spawnPlace: TCoordinates) {
    this.parent?.addChild(this.container);

    this.meshes.forEach(mesh => {
      mesh.setEnabled(false);
    });
  }

  positionLastMesh(mesh: Mesh) {
    const lastMeshSize = this.instances.last!.mesh!.getBoundingInfo().boundingBox.extendSizeWorld;
    const lastMeshPosition = this.instances.last!.mesh!.position;
    const currentMeshSize = mesh.getBoundingInfo().boundingBox.extendSizeWorld;
    const positionX = lastMeshPosition.x + lastMeshSize.x + currentMeshSize.x;
    const positionY = lastMeshPosition.y;
    const positionZ = lastMeshPosition.z;

    mesh.position = new Vector3(positionX, positionY, positionZ);
  }

  fillSpawnSpace(spawnPlace: TCoordinates, despawnPlace: TCoordinates) {
    this.instances.addItem(new ListNode(this.getMesh()));
    let hasEnougth = false;
    
    this.instances.last!.mesh!.position = new Vector3(despawnPlace.x, despawnPlace.y, despawnPlace.z);
    
    while(!hasEnougth) {
      const mesh = this.getMesh();

      this.positionLastMesh(mesh);
      this.instances.addItem(new ListNode(mesh));

      if (this.instances.last!.mesh!.position.x > spawnPlace.x) {
        hasEnougth = true;
      }
    }
  }

  addInstance() {
    const instance = this.getMesh();

    this.positionLastMesh(instance);

    this.instances.addItem(new ListNode(instance));
  }

  getMesh(): Mesh {
    const index = Math.floor(Math.random() * this.meshes.length);
    const clone = this.meshes[index].clone();
    
    clone.setEnabled(true);
    this.container?.addChild(clone);
    
    clone.name = `${this.instancesQty}-${this.name}`;
    this.instancesQty++;

    return clone;
  }
}
