import scss from './index.module.scss';

import Game from './game';
import { UI } from './ui';
import { useState } from 'react';

function Scene1() {
  const [score, setScore] = useState(0);

  return (
    <div className={scss.canvaContainer}>
      <Game 
        onChangeScore={setScore}
      />
      <UI score={score} />
    </div>
  );
}

export default Scene1;