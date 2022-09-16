import { ArcRotateCamera, Scene, Vector3 } from 'babylonjs';

export function createCamera(scene: Scene) {
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 0, new Vector3(0, 0, 0), scene);
  camera.radius = 0;

  camera.attachControl();
  
  return camera;
}