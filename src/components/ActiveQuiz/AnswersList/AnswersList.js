import classes from './AnswersList.module.css';
import { AnswerItem } from './AnswerItem/AnswerItem';

export const AnswersList = ({ answers, onAnswerClick, state }) => {
  return (
    <ul className={classes.AnswersList}>
      {answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            answer={answer}
            onAnswerClick={onAnswerClick}
            state={state ? state[answer.id] : null}
          />
        );
      })}
    </ul>
  );
};
//previous code
// import classes from './AnswersList.module.css';
// import { AnswerItem } from './AnswerItem/AnswerItem';

// export const AnswersList = (props) => {
//   return (
//     <ul className={classes.AnswersList}>
//       {props.answers.map((answer, index) => {
//         return (
//           <AnswerItem
//             onAnswerClick={props.onAnswerClick}
//             answer={answer}
//             key={index}
//             state={props.state ? props.state[answer.id] : null}
//           />
//         );
//       })}
//     </ul>
//   );
// };
