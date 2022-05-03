import classes from './AnswersList.module.css';
import { AnswerItem } from './AnswerItem/AnswerItem';

export const AnswersList = (props) => {
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            onAnswerClick={props.onAnswerClick}
            answer={answer}
            key={index}
            state={props.state ? props.state[answer.id] : null}
          />
        );
      })}
    </ul>
  );
};
