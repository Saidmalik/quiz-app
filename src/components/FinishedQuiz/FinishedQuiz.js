import { Button } from '../UI/Button/Button';
import classes from './FinishedQuiz.module.css';
import { Link } from 'react-router-dom';

export const FinishedQuiz = ({ results, quiz, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[results[quizItem.id]],
          ];

          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <i className={cls.join(' ')}></i>
            </li>
          );
        })}
      </ul>
      <p>
        Right answers {successCount} of {quiz.length}
      </p>
      <div>
        <Button onClick={onRetry} type='primary'>
          Retry
        </Button>
        {/* <Link to={'/'}> */}
        <Button type='success'>Go to Tests</Button>
        {/* </Link> */}
      </div>
    </div>
  );
};

// import { Button } from '../UI/Button/Button';
// import classes from './FinishedQuiz.module.css';
// import { Link } from 'react-router-dom';
// export const FinishedQuiz = ({ results, quiz, onRetry }) => {
//   const cros = {
//     color: 'rgb(235, 65, 53)',
//     marginLeft: '10px',
//   };
//   const tick = {
//     color: 'rgb(8, 170, 108)',
//     marginLeft: '10px',
//   };
//   const successCount = Object.keys(results).reduce((total, key) => {
//     if (results[key] === 'success') {
//       total++;
//     }
//     return total;
//   }, 0);
//   //   const disabledHandler = () => {};
//   return (
//     <div className={classes.FinishedQuiz}>
//       <ul>
//         {quiz.map((quizItem, index) => {
//           const cls = [
//             'fa',
//             results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
//           ];

//           return (
//             <li key={index}>
//               <strong>{index + 1}. </strong>
//               {quizItem.question}
//               {<i className={cls.join(' ')} />}
//             </li>
//           );
//         })}
//       </ul>
//       <p>
//         Правильные ответы {successCount} из {quiz.length}
//       </p>
//       <div>
//         <Button onClick={onRetry} type='primary'>
//           Повторить
//         </Button>
//         <Link to={'/'}>
//           <Button type='success'>Перейти в список тестов</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };
