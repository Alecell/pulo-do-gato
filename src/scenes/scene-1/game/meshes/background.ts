import { Color3, Mesh, MeshBuilder, Scene, SceneLoader, StandardMaterial, Texture } from 'babylonjs';
import { InfiniteBackground } from '../../../../utils/infinite-background';

export async function createBackground(scene: Scene) {
  const background = await SceneLoader.ImportMeshAsync("", `assets/scene-1/meshes/`, "city.babylon", scene);

  background.meshes[0].position.z = 7;
  background.meshes[0].position.y = -1.68;

  // new InfiniteBackground(background.meshes[0] as Mesh, scene, {velocityX: -0.005});

  return background.meshes[0];
}
