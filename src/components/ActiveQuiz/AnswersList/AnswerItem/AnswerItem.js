import { useDispatch } from "react-redux";
import classes from "./AnswerItem.module.css";

export const AnswerItem = ({ answer, onAnswerClick, state }) => {
  const dispatch = useDispatch();
  const cls = [classes.AnswerItem];

  if (state) {
    cls.push(classes[state]);
  }
  return (
    <li
      className={cls.join(' ')}
      onClick={() => dispatch(onAnswerClick(answer.id))}
    >
      {answer.text}
    </li>
  );
};

// import classes from './AnswerItem.module.css';

// export const AnswerItem = (props) => {
//     const cls = [classes.AnswerItem]
//     if (props.state) {
//         cls.push(classes[props.state])
//     }
//   return (
//     <li
//       className={cls.join(' ')}
//       onClick={() => props.onAnswerClick(props.answer.id)}
//       state={props.state}
//     >
//       {props.answer.text}
//     </li>
//   );
// };
