import { Nullable } from 'babylonjs';

export interface IMove {
  jumping: {
    canJump: boolean;
    isJumping: boolean,
    jumpStartTime: number,
  },
}