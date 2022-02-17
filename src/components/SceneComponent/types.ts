import { EngineOptions, Scene, SceneOptions } from '@babylonjs/core';

export interface ISceneComponent {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  onSceneReady: (scene: Scene) => void;
  onRender?: (scene: Scene) => void;
  id: string;
  children?: React.ReactNode;
}
