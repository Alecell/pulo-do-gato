import { useEffect, useRef } from 'react';

import { Engine, Scene } from 'babylonjs';

import { ISceneComponent } from './types';

function SceneComponent(props: ISceneComponent) {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      const scene = new Scene(engine, sceneOptions);
      if (scene.isReady()) {
        props.onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((currentScene) => props.onSceneReady(currentScene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') {
          onRender(scene);
        }
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener('resize', resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener('resize', resize);
        }
      };
    }

    return undefined;
  }, [adaptToDeviceRatio, antialias, engineOptions, onRender, props, reactCanvas, sceneOptions]);

  return <canvas ref={reactCanvas} {...rest} style={{width: '100%', height: '100%'}} />;
}

export default SceneComponent;
