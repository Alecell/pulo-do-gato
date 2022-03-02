import { Mesh, MeshBuilder, Scene, SceneLoader } from '@babylonjs/core';
import { IObstacles } from './types';

export class Obstacles implements IObstacles {
  private prevTime = new Date().getTime();
  private currentTime = new Date().getTime();
  private trySpawnTime = new Date().getTime();
  private trySpawnTimeout: number = 0;
  private activeObstacles: Mesh[] = [];
  private obstacles: any[] = [];

  constructor(
    private scene: Scene, 
    private player: Mesh,
  ) {
    this.scene.onBeforeRenderObservable.add(() => {
      const animationRatio = this.scene.getAnimationRatio();

      for (let i = this.activeObstacles.length - 1; i >= 0; i--) {
        this.activeObstacles[i].position.x += -0.05 * animationRatio;

        if (this.player.intersectsMesh(this.activeObstacles[i])) {
          this.activeObstacles[i].dispose(true);
          this.activeObstacles.splice(i, 1);
        }
      }
    });
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

  private generateObstacle() {
    return this.obstacles[Math.floor(Math.random() * this.obstacles.length)].clone();
  }

  private createObstacle() {
    const obstacle = this.generateObstacle();
  
    obstacle.position.z = 3.55;
    obstacle.position.y = -1;
    obstacle.position.x = 3;
    
    this.activeObstacles.push(obstacle);
  }
  
  async init() {
    const cube = MeshBuilder.CreateBox('cube', { size: 1 }, this.scene);

    const cubeImported = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/`, "simple.glb", this.scene);

    // const trash = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/`, "trash.glb", this.scene);
    // trash.meshes[0].rotationQuaternion = null;
    // trash.meshes[0].rotation.x = Math.PI / 2;

    // const busstop = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/`, "busstop.glb", this.scene);
    // busstop.meshes[0].rotationQuaternion = null;
    // busstop.meshes[0].rotation.z = Math.PI / 2;

    // const trashcan = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/`, "trashcan.glb", this.scene);
    // trashcan.meshes[0].rotationQuaternion = null;
    // trashcan.meshes[0].rotation.x = Math.PI / 2;

    // const dog = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/`, "dog.glb", this.scene);
    // dog.meshes[0].scaling = new Vector3(0.6, 0.6, 0.6);
    // dog.meshes[0].rotationQuaternion = null;
    // dog.meshes[0].rotation.y = Math.PI / 2;

    this.obstacles = [
      // cube,
      cubeImported.meshes[0],
      // trash.meshes[0],
      // busstop.meshes[0],
      // trashcan.meshes[0],
      // dog.meshes[0],
    ];
  }

  spawnWithDelay(minDelay: number, maxDelay: number) {
    this.currentTime = new Date().getTime();
    this.trySpawnTimeout = Math.floor(minDelay / 4);

    if (this.canSpawn(minDelay, maxDelay)) {
      this.createObstacle();
    }
  }
}