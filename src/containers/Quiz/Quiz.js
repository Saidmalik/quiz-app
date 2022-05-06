import classes from './Quiz.module.css';
import { useState, useEffect } from 'react';
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
import { FinishedQuiz } from '../../components/FinishedQuiz/FinishedQuiz';
import axiosQuiz from '../../axios/axios-quiz';
import { Loader } from '../../components/UI/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../redux/reducers/quiz';
import { useParams } from 'react-router-dom';

const Quiz = (props) => {
  // const [quiz, setQuiz] = useState([]);
  // const [activeQuestion, setActiveQuestion] = useState(0);
  // const [answerState, setAnswerState] = useState(null);
  // const [isFinished, setIsFinished] = useState(false);
  // const [results, setResults] = useState({});
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { id } = useParams();
  const quiz = useSelector((state) => state.quiz.quiz);
  const activeQuestion = useSelector((state) => state.quiz.activeQuestion);
  const answerState = useSelector((state) => state.quiz.answerState);
  const isFinished = useSelector((state) => state.quiz.isFinished);
  const results = useSelector((state) => state.quiz.results);
  const loading = useSelector((state) => state.quiz.loading);

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
  //works not appropriate => go to react-router-dom
  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = axiosQuiz.get(`/quizes/${id}.json`);
        const quiz = resp.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Answer the questions</h1>
        {loading ? (
          <Loader />
        ) : isFinished ? (
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
