import classes from './MenuToggle.module.css';

export const MenuToggle = ({ isOpen, onToggle }) => {
  const cls = [classes.MenuToggle, 'fa'];
  if (isOpen) {
    cls.push('fa-times fa-lg');
    cls.push(classes.open);
  } else {
    cls.push('fa-bars');
  }
  return <i className={cls.join(' ')} onClick={onToggle}></i>;
};
