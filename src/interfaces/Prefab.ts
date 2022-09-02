import { Mesh, Nullable, Scene, Sound, Texture } from 'babylonjs';
import { TGenericObject } from '../utils/types';

export interface IPrefab {
  events: Nullable<TGenericObject>;
  states: Nullable<TGenericObject>;
}

export abstract class APrefab implements IPrefab {
  protected _mesh!: Mesh | TGenericObject<Mesh>;
  protected _parent!: Mesh;
  protected _texture!: Texture;
  protected _sounds!: TGenericObject<Sound>;

  events = {};
  states = {};

  constructor(protected scene: Scene) {}

  abstract initMesh(): Promise<void>;
  abstract initSounds(): Promise<void>;
}
