import { useEffect, useState } from 'react';
import { UIEvents } from '../../../store/ui';
import scss from './index.module.scss';
import Loading from './loading/Loading';
import Score from './score/Score';
import Gameover from './gameover/Gameover';
import { IUi } from './types';

export function UI(props: IUi) {
  const [isLoading, setIsLoading] = useState(true);
  const [gameover, setGameOver] = useState(false);

  useEffect(() => {
    UIEvents.onUpdateLoading.add((isLoading: boolean) => {
      setIsLoading(isLoading);
    });

    UIEvents.onGameOver.add((gameover: boolean) => {
      setGameOver(gameover);
    });
  }, [])

  return (
    <div className={scss.ui}>
      {isLoading ? <Loading /> : <Score score={props.score} />}
      {gameover && <Gameover />}
    </div>
  );
}