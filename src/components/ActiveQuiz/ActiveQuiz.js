import classes from './ActiveQuiz.module.css';
import { AnswersList } from './AnswersList/AnswersList';

export const ActiveQuiz = ({
  answers,
  question,
  onAnswerClick,
  quizLength,
  answerNumber,
  state,
}) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}</strong>&nbsp;
          {question}
        </span>
        <small>
          {answerNumber} of {quizLength}
        </small>
      </p>
      <AnswersList
        state={state}
        answers={answers}
        onAnswerClick={onAnswerClick}
      />
    </div>
  );
};
// import classes from './ActiveQuiz.module.css';
// import { AnswersList } from './AnswersList/AnswersList';

// export const ActiveQuiz = (props) => {
//   return (
//     <div className={classes.ActiveQuiz}>
//       <p className={classes.Question}>
//         <span>
//           <strong>{props.answerNumber}. </strong>
//           {props.question}
//         </span>
//         <small>
//           {props.answerNumber} из {props.quizLength}
//         </small>
//       </p>
//       <AnswersList
//         onAnswerClick={props.onAnswerClick}
//         answers={props.answers}
//         state={props.state}
//       />
//     </div>
//   );
// };
