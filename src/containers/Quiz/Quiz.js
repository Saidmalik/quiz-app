import classes from './Quiz.module.css';
import { useState } from 'react';
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
import { FinishedQuiz } from '../../components/FinishedQuiz/FinishedQuiz';

const Quiz = () => {
  const [quiz, setQuiz] = useState([
    {
      question: 'What is your fav color?',
      rightAnswerId: 2,
      id: 1,
      answers: [
        { text: 'White', id: 1 },
        { text: 'Blue', id: 2 },
        { text: 'Orange 3', id: 3 },
        { text: 'Black', id: 4 },
      ],
    },
    {
      question: 'What is your fav car?',
      rightAnswerId: 1,
      id: 2,
      answers: [
        { text: 'BMW', id: 1 },
        { text: 'Porsche', id: 2 },
        { text: 'Mercedes', id: 3 },
        { text: 'Audi', id: 4 },
      ],
    },
  ]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState({});

  const onAnswerHandler = (answerId) => {
    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === 'success') {
        return;
      }
    }

    const question = quiz[activeQuestion];
    const resultsOfAnswers = results;

    if (question.rightAnswerId === answerId) {
      if (!resultsOfAnswers[question.id]) {
        resultsOfAnswers[question.id] = 'success';
      }
      setAnswerState({ [answerId]: 'success' });
      setAnswerState(null);
      setResults(resultsOfAnswers);

      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          setIsFinished(true);
        } else {
          setActiveQuestion(activeQuestion + 1);
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      resultsOfAnswers[question.id] = 'error';
      setAnswerState({ [answerId]: 'error' });
      setResults(resultsOfAnswers);
    }
  };

  const isQuizFinished = () => {
    return activeQuestion + 1 === quiz.length;
  };
  const retryHandler = () => {
    setActiveQuestion(0);
    setAnswerState(null);
    setIsFinished(false);
    setResults({});
  };
  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Answer the questions</h1>
        {isFinished ? (
          <FinishedQuiz results={results} quiz={quiz} onRetry={retryHandler} />
        ) : (
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={onAnswerHandler}
            quizLength={quiz.length}
            answerNumber={activeQuestion + 1}
            state={answerState}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;

//Previous code
// import classes from './Quiz.module.css';
// import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
// import { useEffect } from 'react';
// import { FinishedQuiz } from '../../components/FinishedQuiz/FinishedQuiz';
// import { Loader } from '../../components/UI/Loader/Loader';
// import { connect } from 'react-redux';
// import {
//   fetchQuizById,
//   quizAnswerClick,
//   retryQuiz,
// } from '../../redux/actions/quiz';
// // import { useParams } from 'react-router-dom';

// const Quiz = (props) => {
//   // const params = useParams();

//   useEffect(() => {

//     // props.fetchQuizById(props.params.id);
//     props.fetchQuizById(props.match.params.id);
//     props.retryQuiz();
//   }, []);

//   return (
//     <div className={classes.Quiz}>
//       <div className={classes.QuizWrapper}>
//         <h1>Ответьте на все вопросы</h1>
//         {props.loading || !props.quiz ? (
//           <Loader />
//         ) : props.isFinished ? (
//           <FinishedQuiz
//             results={props.results}
//             quiz={props.quiz}
//             onRetry={props.retryQuiz}
//           />
//         ) : (
//           <ActiveQuiz
//             question={props.quiz[props.activeQuestion].question}
//             answers={props.quiz[props.activeQuestion].answers}
//             onAnswerClick={props.quizAnswerClick}
//             quizLength={props.quiz.length}
//             answerNumber={props.activeQuestion + 1}
//             state={props.answerState}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
// const mapStateToProps = (state) => {
//   return {
//     activeQuestion: state.quiz.activeQuestion,
//     answerState: state.quiz.answerState,
//     isFinished: state.quiz.isFinished,
//     results: state.quiz.results,
//     quiz: state.quiz.quiz,
//     loading: state.quiz.loading,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchQuizById: (id) => dispatch(fetchQuizById(id)), //these 3 methods called actionCreators
//     quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
//     retryQuiz: () => dispatch(retryQuiz()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
