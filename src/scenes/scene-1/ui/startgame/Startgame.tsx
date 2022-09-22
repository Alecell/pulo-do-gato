import { UIEvents } from '../../../../store/ui';
import scss from './startgame.module.scss';

function Startgame() {

  const startGame = () => {
    UIEvents.onStartgame.notifyObservers(false);
    document.getElementById('babylonscene')?.focus();
  };

  return (
    <div className={scss.container}>
      <span className={scss.message}>PULO DO GATO</span>
      <span className={scss.tip}>APERTA BARRA DE ESPAÇO PARA PULAR</span>
      <button className={scss.init} onClick={startGame}>
        INICIAR
      </button>
    </div>
  )
}

export default Startgame;
