import { Observable } from 'babylonjs';

const UISingleton = function (this: any) {
  this.isLoading = false;
  this.onUpdateLoading = new Observable();
  this.onGameOver = new Observable();
  this.onStartgame = new Observable();

  return this;
} as any as { new (): any; };

const UIEvents = new UISingleton();
export { UIEvents };