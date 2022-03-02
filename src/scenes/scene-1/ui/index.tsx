import scss from './index.module.scss';
import { Score } from './score/Score';
import { IUi } from './types';

export function UI(props: IUi) {
  return (
    <div className={scss.ui}>
      <Score score={props.score} />
    </div>
  );
}