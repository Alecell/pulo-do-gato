import { Mesh, MeshBuilder, Scene, SceneLoader, StandardMaterial, Vector3 } from 'babylonjs';
import { Store } from '../../../../store/store';
import { IObstacles } from './types';

export class Obstacles implements IObstacles {
  private prevTime = new Date().getTime();
  private currentTime = new Date().getTime();
  private trySpawnTime = new Date().getTime();
  private obstacleLimit: Mesh | undefined;
  private trySpawnTimeout: number = 0;
  private activeElement: Mesh[] = [];
  private obstacles: Mesh[] = [];

  constructor(
    private scene: Scene, 
    private player: Mesh,
  ) {
    this.createObstaclesLimit();

    this.scene.onBeforeRenderObservable.add(() => {
      const animationRatio = this.scene.getAnimationRatio();

      for (let i = this.activeElement.length - 1; i >= 0; i--) {
        this.activeElement[i].position.x += -0.05 * animationRatio;

        if (this.jumpedObstacle(this.activeElement[i])) {
          Store.onUpdateScore.notifyObservers(++Store.score);
        }

        if (this.shouldDestroyObstacle(this.activeElement[i])) {
          this.activeElement[i].dispose();
          this.activeElement.splice(i, 1);
        }
      }
    });
  }

  private shouldDestroyObstacle(obstacle: Mesh) {
    return this.player.intersectsMesh(obstacle) || this.obstacleLimit?.intersectsMesh(obstacle);
  }

  private jumpedObstacle(obstacle: Mesh) {
    const pointPlane = obstacle.getChildMeshes()[0];
    const intersected = pointPlane ? pointPlane.intersectsMesh(this.player) : false;

    if (intersected) {
      pointPlane.dispose();
    }

    return intersected;
  }

  private canSpawn(minDelay: number, maxDelay: number) {
    const isMaxDelay = this.currentTime - this.prevTime > maxDelay;
    const isMinDelay = this.currentTime - this.prevTime > minDelay;
    const canTry = this.currentTime - this.trySpawnTime > this.trySpawnTimeout;
    let shouldSpawn = false;

    if (canTry) {
      this.trySpawnTime = this.currentTime;

      if (isMinDelay) {
        shouldSpawn = Math.random() > 0.5;
        
        if (isMaxDelay) shouldSpawn = true;
      }
    }

    if (shouldSpawn) this.prevTime = this.currentTime;

    return shouldSpawn;
  }

  private generateElement() {
    let kind = this.obstacles;
    
    const index = Math.floor(Math.random() * kind.length);

    return kind[index].clone();
  }

  private spawnObstacle() {
    const obstacle = this.generateElement();
    const pointPlane = MeshBuilder.CreatePlane('pointPlane', { width: 1, height: 5 }, this.scene);
    const planeMaterial = new StandardMaterial('planeMateral', this.scene);
    pointPlane.rotation.y = Math.PI / 2;

    planeMaterial.alpha = 0;
    pointPlane.material = planeMaterial;

    obstacle.addChild(pointPlane);
  
    obstacle.position.z = 3.55;
    obstacle.position.y = -1;
    obstacle.position.x = 3;
    
    this.activeElement.push(obstacle);
  }

  private async createObstacles() {
    const trash = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/`, "trash.babylon", this.scene);
    trash.meshes[0].rotationQuaternion = null;
    trash.meshes[0].rotation.x = -Math.PI / 2;

    const busstop = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/`, "busstop.babylon", this.scene);
    busstop.meshes[0].rotationQuaternion = null;
    busstop.meshes[0].rotation.z = Math.PI / 2;

    const dog = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/`, "dog.babylon", this.scene);
    dog.meshes[0].scaling = new Vector3(0.01, 0.01, 0.01);
    dog.meshes[0].rotationQuaternion = null;
    dog.meshes[0].rotation.y = -Math.PI / 2;
    dog.meshes[0].rotation.x = -Math.PI / 2;

    this.obstacles = [
      trash.meshes[0],
      busstop.meshes[0],
      dog.meshes[0],
    ] as Mesh[];
  }

  private createObstaclesLimit() {
    this.obstacleLimit = MeshBuilder.CreatePlane("plane", { width: 10, height: 10 }, this.scene);
    this.obstacleLimit.position = new Vector3(-10, 0, 3.5);
    this.obstacleLimit.rotationQuaternion = null;
    this.obstacleLimit.rotation.y = -Math.PI / 2;
  }
  
  init() {
    this.createObstacles();
  }

  spawnWithDelay(minDelay: number, maxDelay: number) {
    this.currentTime = new Date().getTime();
    this.trySpawnTimeout = Math.floor(minDelay / 4);

    if (this.canSpawn(minDelay, maxDelay)) {
      this.spawnObstacle();
    }
  }
}