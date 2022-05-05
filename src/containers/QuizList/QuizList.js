import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/UI/Loader/Loader';
// import { connect } from 'react-redux';
// import { fetchQuizes } from '../../redux/actions/quiz';
// import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
const QuizList = (props) => {
  const renderQuizes = () => {
    //remove props from here
    return props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          'https://react-quiz-f6e79-default-rtdb.firebaseio.com/quizes.json'
        );
        //here should be an object.keys
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  return (
    <div className={classes.QuizList}>
      <h1>Test list</h1>
      {props.loading && props.quizes.length !== 0 ? (
        <Loader />
      ) : (
        <ul>{renderQuizes()}</ul>
      )}
    </div>
  );
};

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
