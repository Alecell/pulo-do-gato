import scss from './loading.module.scss';
import img from './loading-screen.png';

function Loading() {
  return (
    <div className={scss.container}>
      <img className={scss.img} src={img} />
    </div>
  )
}

export default Loading;
