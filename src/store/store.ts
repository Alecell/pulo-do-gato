import { Observable } from 'babylonjs';

const StoreSingleton = function (this: any) {
  this.score = 0;
  this.onUpdateScore = new Observable();

  this.onUpdateScore.add((score: number) => {
    this.score = score;
  })

  return this;
} as any as { new (): any; };

const Store = new StoreSingleton();
export { Store };