import { useEffect, useState } from 'react';
import { UIEvents } from '../../../store/ui';
import scss from './index.module.scss';
import Loading from './loading/Loading';
import { Score } from './score/Score';
import { IUi } from './types';

export function UI(props: IUi) {
  const [isLoading, setIsLoading] = useState(true);

  const gameUI = () => <Score score={props.score} />;
  const loadingUI = () => <Loading />;

  useEffect(() => {
    UIEvents.onUpdateLoading.add((isLoading: boolean) => {
      setIsLoading(isLoading);
    })
  }, [])

  return (
    <div className={scss.ui}>
      {isLoading ? loadingUI() : gameUI()}
    </div>
  );
}