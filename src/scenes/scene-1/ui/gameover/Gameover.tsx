import { UIEvents } from '../../../../store/ui';
import scss from './gameover.module.scss';

function Gameover() {

  const restartGame = () => {
    UIEvents.onGameOver.notifyObservers(false);
  };

  return (
    <div className={scss.container}>
      <span className={scss.message}>SE FUDEU<br /> KKKK KA JOTA</span>

      <button className={scss.restart} onClick={restartGame}>
        restart
      </button>
    </div>
  )
}

export default Gameover;
