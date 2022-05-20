import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { Loader } from '../../components/UI/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizes } from '../../redux/reducers/quiz';

const QuizList = () => {
  const dispatch = useDispatch();

  const { quizes, loading } = useSelector((state) => state.quiz);

  const renderQuizes = () => {
    return quizes?.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  useEffect(() => {
    dispatch(fetchQuizes());
  }, [dispatch]);

  return (
    <div className={classes.QuizList}>
      <h1>Test list</h1>
      {loading && quizes.length !== 0 ? <Loader /> : <ul>{renderQuizes()}</ul>}
    </div>
  );
};

export default QuizList;

// import classes from './QuizList.module.css';
// import { NavLink } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { Loader } from '../../components/UI/Loader/Loader';
// import { connect } from 'react-redux';
// import { fetchQuizes } from '../../redux/actions/quiz';
// import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';

// const QuizList = (props) => {
//   const renderQuizes = () => {
//     return props.quizes.map((quiz) => {
//       return (
//         <li key={quiz.id}>
//           <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
//         </li>
//       );
//     });
//   };

//   useEffect(() => {
//     props.fetchQuizes();
//   }, []);

//   return (
//     <div className={classes.QuizList}>
//       <h1>Список тестов</h1>
//       {props.loading && props.quizes.length !== 0 ? (
//         <Loader />
//       ) : (
//         <ul>{renderQuizes()}</ul>
//       )}
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     quizes: state.quiz.quizes,
//     loading: state.quiz.loading,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchQuizes: () => dispatch(fetchQuizes()),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
