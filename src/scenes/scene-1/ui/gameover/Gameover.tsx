import { Store } from '../../../../store/store';
import { UIEvents } from '../../../../store/ui';
import scss from './gameover.module.scss';
import click from '../sounds/click-sound-effect.mp3';
import hover from '../sounds/hover-sound-effect.mp3';
import { useCallback } from 'react';

const clickEffect = new Audio(click);
const hoverEffect = new Audio(hover);

function Gameover() {
  const restartGame = useCallback(() => {
    UIEvents.onGameOver.notifyObservers(false);
    Store.onUpdateScore.notifyObservers(0);
    document.getElementById('babylonscene')?.focus();
    clickEffect.play();
  }, []);

  return (
    <div className={scss.container}>
      <span className={scss.message}>SE FUDEU<br /> KKKK KA JOTA</span>

      <button className={scss.restart} onClick={restartGame} onMouseEnter={() => hoverEffect.play()}>
        restart
      </button>
    </div>
  )
}

export default Gameover;
