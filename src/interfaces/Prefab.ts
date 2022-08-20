import { Mesh, Nullable, Sound, Texture } from 'babylonjs';
import { TGenericObject } from '../utils/types';

export interface IPrefab {
  events: Nullable<TGenericObject>;
  states: Nullable<TGenericObject>;
}

export abstract class APrefab implements IPrefab {
  protected mesh: Nullable<Mesh> = null;
  protected parent: Nullable<Mesh> = null;
  protected texture: Nullable<Texture> = null;
  protected sounds: Nullable<TGenericObject<Sound>> = null;

  readonly events = {};
  readonly states = {};

  abstract initSounds(): void;
  abstract initMesh(): void;
}
