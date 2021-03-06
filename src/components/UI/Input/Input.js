import classes from './Input.module.css';

const isInvalid = ({ valid, touched, shouldValidate }) => {
  return !valid && shouldValidate && touched;
};
export const Input = (props) => {
  const inputType = props.type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        autoComplete='on' //in some variations
      />
      {isInvalid(props)
        ? <span>{props.errorMessage}</span> || 'Please enter a valid value'
        : null}
    </div>
  );
};
