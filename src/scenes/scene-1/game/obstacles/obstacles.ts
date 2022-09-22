import { Mesh, MeshBuilder, Scene, SceneLoader, Sound, StandardMaterial, Vector3 } from 'babylonjs';
import { start } from 'repl';
import { Store } from '../../../../store/store';
import { UIEvents } from '../../../../store/ui';
import { Player } from '../meshes/player/player';
import { IObstacles } from './types';

export class Obstacles implements IObstacles {
  private prevTime = new Date().getTime();
  private currentTime = new Date().getTime();
  private trySpawnTime = new Date().getTime();
  private obstacleLimit: Mesh | undefined;
  private trySpawnTimeout: number = 0;
  private activeElement: Mesh[] = [];
  private obstacles: Mesh[] = [];
  private container: Mesh;
  private obstacleCounter = 0;

  constructor(
    private scene: Scene, 
    private player: Player,
  ) {
    this.createObstacles();
    this.container = new Mesh("obstacles-container");
    this.createObstaclesLimit();

    UIEvents.onGameOver.add((gameover: boolean) => {
      if (!gameover) {
        this.activeElement.forEach(obstacle => {
          obstacle.dispose();
        });

        this.activeElement = [];
      }
    });

    UIEvents.onStartgame.add((startgame: boolean) => {
      if (!startgame) {
        scene.onBeforeRenderObservable.add(() => {
          this.spawnWithDelay(1000, 2000);
        });
      }
    });

    this.scene.onBeforeRenderObservable.add(() => {
      const animationRatio = this.scene.getAnimationRatio();

      for (let i = this.activeElement.length - 1; i >= 0; i--) {
        this.activeElement[i].position.x += -0.05 * animationRatio;

        if (this.jumpedObstacle(this.activeElement[i]) && !this.player.states.died) {
          Store.onUpdateScore.notifyObservers(++Store.score);
        }

        this.checkObstacleHit(this.activeElement[i]);
        this.checkObstacleHitsLimit(this.activeElement[i], i);
      }
    });
  }

  private checkObstacleHit(obstacle: Mesh) {
    if ((this.player.mesh as Mesh)?.intersectsMesh(obstacle) && !this.player.states.died) {
      this.player.events.die();
    }
  }

  private checkObstacleHitsLimit(obstacle: Mesh, i: number) {
    if (this.obstacleLimit?.intersectsMesh(obstacle)) {
      this.activeElement[i].dispose();
      this.activeElement.splice(i, 1);
    }
  }

  private jumpedObstacle(obstacle: Mesh) {
    const pointPlane = obstacle.getChildMeshes()[0];
    const intersected = pointPlane ? pointPlane.intersectsMesh(this.player.mesh! as Mesh) : false;

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
    const obstacle = this.obstacleCounter;
    let kind = this.obstacles;
    
    const index = Math.floor(Math.random() * kind.length);

    this.obstacleCounter++;

    return kind[index].clone(`obstacle-${obstacle}`);
  }

  private spawnObstacle() {
    const obstacle = this.generateElement();
    const pointPlane = MeshBuilder.CreatePlane('pointPlane', { width: 1, height: 5 }, this.scene);
    const planeMaterial = new StandardMaterial('planeMateral', this.scene);
    
    obstacle.position.z = 3.55;
    obstacle.position.y = -1;
    obstacle.position.x = 3;
    
    planeMaterial.alpha = 0;
    pointPlane.rotation.y = Math.PI / 2;
    pointPlane.material = planeMaterial;
    pointPlane.position = new Vector3(3, -1, 3.55);

    obstacle.addChild(pointPlane);
    this.container.addChild(obstacle);    
    this.activeElement.push(obstacle);
  }

  private async createObstacles() {
    const trash = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/obstacles/trash/`, "trash.babylon", this.scene);
    trash.meshes[0].rotationQuaternion = null;
    trash.meshes[0].rotation.y = Math.PI;
    trash.meshes[0].rotation.x = -Math.PI / 2;
    trash.meshes[0].position.z = -100;
    trash.meshes[0].name = "trash";
    this.container.addChild(trash.meshes[0]);

    const dog = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/obstacles/dog/`, "dog.babylon", this.scene);
    dog.meshes[0].scaling = new Vector3(0.5, 0.5, 0.5);
    dog.meshes[0].rotationQuaternion = null;
    dog.meshes[0].rotation.y = Math.PI / 2;
    dog.meshes[0].position.z = -100;
    dog.meshes[0].name = "dog";
    this.container.addChild(dog.meshes[0]);

    const cone = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/obstacles/cone/`, "cone.babylon", this.scene);
    cone.meshes[0].scaling = new Vector3(0.5, 0.5, 0.5); 
    cone.meshes[0].rotationQuaternion = null;
    cone.meshes[0].rotation.y = Math.PI / 2;
    cone.meshes[0].position.z = -100;
    cone.meshes[0].name = "cone";
    this.container.addChild(cone.meshes[0]);

    const bucket = await SceneLoader.ImportMeshAsync(null, `assets/scene-1/meshes/obstacles/bucket/`, "bucket.babylon", this.scene);
    bucket.meshes[0].scaling = new Vector3(0.005, 0.005, 0.005); 
    bucket.meshes[0].rotationQuaternion = null;
    bucket.meshes[0].rotation.y = Math.PI / 2;
    bucket.meshes[0].position.z = -100;
    bucket.meshes[0].name = "bucket";
    this.container.addChild(bucket.meshes[0]);

    this.obstacles = [
      trash.meshes[0],
      cone.meshes[0],
      dog.meshes[0],
      bucket.meshes[0],
    ] as Mesh[];
  }

  private createObstaclesLimit() {
    this.obstacleLimit = MeshBuilder.CreatePlane("plane", { width: 10, height: 10 }, this.scene);
    this.obstacleLimit.position = new Vector3(-10, 0, 3.5);
    this.obstacleLimit.rotationQuaternion = null;
    this.obstacleLimit.rotation.y = -Math.PI / 2;
  }

  spawnWithDelay(minDelay: number, maxDelay: number) {
    this.currentTime = new Date().getTime();
    this.trySpawnTimeout = Math.floor(minDelay / 4);

    if (this.canSpawn(minDelay, maxDelay)) {
      this.spawnObstacle();
    }
  }
}