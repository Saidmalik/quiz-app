import { useDispatch } from 'react-redux';
import classes from './Button.module.css';

export const Button = ({ children, disabled, onClick, type }) => {
  const cls = [classes.Button, classes[type]];
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(onClick())}
      className={cls.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
