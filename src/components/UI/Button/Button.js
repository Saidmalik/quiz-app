import classes from './Button.module.css';

export const Button = ({ children, disabled, onClick, type }) => {
  const cls = [classes.Button, classes[type]];
  return (
    <button onClick={onClick} className={cls.join(' ')} disabled={disabled}>
      {children}
    </button>
  );
};
