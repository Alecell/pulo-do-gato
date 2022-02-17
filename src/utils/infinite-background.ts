import { Mesh, Scene } from '@babylonjs/core';

export type TInstance = Mesh;

export type TVelocities = {
  velocityX?: number;
  velocityY: number;
} | {
  velocityX: number;
  velocityY?: number;
}

export type TOptions = TVelocities & {
  instancesQty?: number;
};

export interface IInfiniteBackground {
  instances: TInstance[];
  mesh: Mesh;
  threshold: number;
  spawnPlace: number;
}

/**
 * TODO:
 * Aceitar array de meshes para caso tenha várias variações de meshes em sequencia
 * Adicionar validação de limiter por raio permitindo o threshold ser para qualquer direção
 * Ajustar para que, quando houver mais imagens, elas se posicionem uma ao lado da outra. Atualmente fica tudo na mesma layer
 * Colocar tudo como filho de um mesh especifico para facilitar o debug. Talvez um mesh do infinite scrolling ou o proprio baseMesh
 * Não posso partir do pressuposto que a imagem está no centro, nem que a camera está no centro, preciso, ou de parametros para isso, ou definir isso programaticamente
 */
export class InfiniteBackground {
  instances: IInfiniteBackground['instances'] = [];
  baseMesh: IInfiniteBackground['mesh'];
  threshold: IInfiniteBackground['threshold'];
  spawnPlace: IInfiniteBackground['spawnPlace'];

  constructor(
    mesh: IInfiniteBackground['mesh'],
    scene: Scene, {
      velocityX = 0, 
      velocityY = 0, 
      instancesQty = 2,
      ...opts
    }: TOptions
  ) {
    this.baseMesh = mesh;
    this.makeInstances(instancesQty);

    this.spawnPlace = this.baseMesh.position.x + this.baseMesh.getBoundingInfo().boundingBox.extendSize.x * 2;
    this.threshold = this.baseMesh.position.x - this.baseMesh.getBoundingInfo().boundingBox.extendSize.x;

    this.instances[1].position.x = this.spawnPlace;

    this.baseMesh.setEnabled(false);

    scene.onBeforeRenderObservable.add(() => {
      const animationRatio = scene.getAnimationRatio();

      for (let i = 0; i < this.instances.length; i++) {
        this.instances[i].position.x += velocityX * animationRatio;
        this.instances[i].position.y += velocityY * animationRatio;
        const rightEdge = this.getRightEdge(this.instances[i]);

        if (rightEdge <= this.threshold) this.resetInstance(this.instances[i]);
      }
    })
  }

  makeInstances(qty: number) {
    for (let i = 0; i < qty; i++) {
      this.instances[i] = this.baseMesh.clone(`instance-${i}`);
    }
  } 

  getRightEdge(instance: TInstance) {
    return instance.position.x + this.baseMesh.getBoundingInfo().boundingBox.extendSize.x;
  }

  resetInstance(instance: TInstance) {
    instance.position.x += this.baseMesh.getBoundingInfo().boundingBox.extendSize.x * 4;
  }
}
