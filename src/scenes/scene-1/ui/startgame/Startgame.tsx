import { UIEvents } from '../../../../store/ui';
import scss from './startgame.module.scss';
import click from '../sounds/click-sound-effect.mp3';
import hover from '../sounds/hover-sound-effect.mp3';
import { useCallback } from 'react';

const clickEffect = new Audio(click);
const hoverEffect = new Audio(hover);

function Startgame() {
  const startGame = useCallback(() => {
    UIEvents.onStartgame.notifyObservers(false);
    document.getElementById('babylonscene')?.focus();
    clickEffect.play();
  }, []);

  return (
    <div className={scss.container}>
      <span className={scss.message}>PULO DO GATO</span>
      <span className={scss.tip}>APERTA BARRA DE ESPAÇO PARA PULAR</span>
      <button 
        className={scss.init} 
        onClick={startGame} 
        onMouseEnter={() => hoverEffect.play()}
      >
        INICIAR
      </button>
    </div>
  )
}

export default Startgame;
