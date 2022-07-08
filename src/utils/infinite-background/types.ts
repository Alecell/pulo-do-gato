import { Coordinate, Mesh } from 'babylonjs';

export type TInstance = Mesh;

export type TVelocities = {
  velocityX?: number;
  velocityY: number;
} | {
  velocityX: number;
  velocityY?: number;
}

export type TCoordinates = {
  x: number;
  y: number;
  z: number;
}

export type TOptions = TVelocities & {
  instancesQty?: number;
  parent?: Mesh;
  spawnPlace: TCoordinates;
  despawnPlace: TCoordinates;
};

export interface IInfiniteBackground {
  instances: TInstance[];
  mesh: Mesh;
  threshold: number;
  spawnPlace: number;
}