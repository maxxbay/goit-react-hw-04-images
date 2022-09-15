import { MdOutlineCameraswitch } from 'react-icons/md';
import s from './Loader.module.css';

function Loader() {
  return (
    <div className={s.wrapper}>
      <MdOutlineCameraswitch className={s.loader} />
    </div>
  );
}

export default Loader;
