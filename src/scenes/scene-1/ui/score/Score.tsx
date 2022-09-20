import scss from './Score.module.scss';

import { IScore } from './types';

function Score(props: IScore) {
  return (
    <span className={scss.score}>
      {props.score}
    </span>
  )
}

export default Score;
