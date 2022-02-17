import { Mesh, MeshBuilder, Scene } from '@babylonjs/core';
import { IObstacles } from './types';

export class Obstacles implements IObstacles {
  private prevTime = new Date().getTime();
  private currentTime = new Date().getTime();
  private trySpawnTime = new Date().getTime();
  private trySpawnTimeout: number = 0;

  constructor(
    private scene: Scene, 
    private player: Mesh,
  ) {}

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
    return MeshBuilder.CreateBox('obstacle', { width: 0.1, height: Math.random(), depth: 1 })
  }

  private createObstacle() {
    const obstacle = this.generateObstacle();
  
    obstacle.position.z = 3.55;
    obstacle.position.y = -0.75;
    obstacle.position.x = 1.5;

    const observer = this.scene.onBeforeRenderObservable.add(() => {
      const animationRatio = this.scene.getAnimationRatio();
      obstacle.position.x += -0.05 * animationRatio;

      if (this.player.intersectsMesh(obstacle)) {
        obstacle.dispose(true);
        this.scene.onBeforeRenderObservable.remove(observer);
      }
    });
  }

  spawnWithDelay(minDelay: number, maxDelay: number) {
    this.currentTime = new Date().getTime();
    this.trySpawnTimeout = Math.floor(minDelay / 4);

    if (this.canSpawn(minDelay, maxDelay)) {
      this.createObstacle();
    }
  }
}
