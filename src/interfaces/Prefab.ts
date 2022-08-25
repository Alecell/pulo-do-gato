import { Mesh, Nullable, Sound, Texture } from 'babylonjs';
import { TGenericObject } from '../utils/types';

export interface IPrefab {
  events: Nullable<TGenericObject>;
  states: Nullable<TGenericObject>;
}

export abstract class APrefab implements IPrefab {
  protected _mesh!: Mesh;
  protected _parent!: Mesh;
  protected _texture!: Texture;
  protected _sounds!: TGenericObject<Sound>;

  events = {};
  states = {};

  abstract initMesh(): void;
  abstract initSounds(): void;
}
