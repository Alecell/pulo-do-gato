import { useEffect, useState } from 'react';
import { UIEvents } from '../../../store/ui';
import scss from './index.module.scss';
import Loading from './loading/Loading';
import Score from './score/Score';
import Gameover from './gameover/Gameover';
import { IUi } from './types';
import Startgame from './startgame/Startgame';

export function UI(props: IUi) {
  const [isLoading, setIsLoading] = useState(true);
  const [gameover, setGameOver] = useState(false);
  const [startgame, setStartGame] = useState(true);

  useEffect(() => {
    UIEvents.onUpdateLoading.add((isLoading: boolean) => {
      setIsLoading(isLoading);
    });

    UIEvents.onGameOver.add((gameover: boolean) => {
      setGameOver(gameover);
    });

    UIEvents.onStartgame.add((startgame: boolean) => {
      if (!startgame) {
        setStartGame(false);
      }
    });
  }, [])

  return (
    <div className={scss.ui}>
      {!isLoading && startgame && <Startgame />}
      {isLoading ? <Loading /> : <Score score={props.score} />}
      {gameover && <Gameover />}
    </div>
  );
}