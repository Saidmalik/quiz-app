import classes from './Quiz.module.css';
import { useEffect } from 'react';
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
import { FinishedQuiz } from '../../components/FinishedQuiz/FinishedQuiz';
import { Loader } from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../redux/actions/quiz';
// import { useParams } from 'react-router-dom';

const Quiz = (props) => {
  // const params = useParams();
  
  useEffect(() => {

    // props.fetchQuizById(props.params.id);
    props.fetchQuizById(props.match.params.id);
    props.retryQuiz();
  }, []);

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>
        {props.loading || !props.quiz ? (
          <Loader />
        ) : props.isFinished ? (
          <FinishedQuiz
            results={props.results}
            quiz={props.quiz}
            onRetry={props.retryQuiz}
          />
        ) : (
          <ActiveQuiz
            question={props.quiz[props.activeQuestion].question}
            answers={props.quiz[props.activeQuestion].answers}
            onAnswerClick={props.quizAnswerClick}
            quizLength={props.quiz.length}
            answerNumber={props.activeQuestion + 1}
            state={props.answerState}
          />
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)), //these 3 methods called actionCreators
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
