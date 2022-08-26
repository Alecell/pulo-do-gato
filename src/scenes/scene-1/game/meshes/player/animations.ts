import {Animation } from 'babylonjs';

export const dieAnimation = () => {
  const frameRate = 0.2;
  const positionFrames = [];
  const rotationFrames = [];

  const position = new Animation(
    "ySlide",
    "position.y",
    frameRate,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  const rotation = new Animation(
    "Rotation", 
    "rotation.x", 
    frameRate, 
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  positionFrames.push({ frame: 0 * frameRate, value: -0.56 });
  positionFrames.push({ frame: 0.8 * frameRate, value: 1 });
  positionFrames.push({ frame: 2.3 * frameRate, value: -6 });
  position.setKeys(positionFrames);

 
  rotationFrames.push({ frame: 0 * frameRate, value: -Math.PI/2 });
  rotationFrames.push({ frame: 0.8 * frameRate, value: Math.PI/2 });
  rotation.setKeys(rotationFrames);

  return [position, rotation];
}