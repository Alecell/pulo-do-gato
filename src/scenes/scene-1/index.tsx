import scss from './index.module.scss';

import Game from './game';
import { UI } from './ui';
import { useEffect, useState } from 'react';

import { Store } from '../../store/store';

function Scene1() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    Store.onUpdateScore.add((score: number) => {
      setScore(score);
    })
  }, []);

  return (
    <div className={scss.canvaContainer}>
      <Game />
      <UI score={score} />
    </div>
  );
}

export default Scene1;
