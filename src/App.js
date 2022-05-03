import React from 'react';
import Quiz from './containers/Quiz/Quiz';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <Layout>
      <Quiz></Quiz>
    </Layout>
  );
}
export default App;

// import React, { useEffect } from 'react';
// import Quiz from './containers/Quiz/Quiz';
// import Layout from './hoc/Layout/Layout';
// import { Route, Navigate, Routes } from 'react-router-dom';
// import QuizCreator from './containers/QuizCreator/QuizCreator';
// import QuizList from './containers/QuizList/QuizList';
// import Auth from './containers/Auth/Auth';
// import { connect } from 'react-redux';
// import Logout from './components/Logout/Logout';
// import { autoLogin } from './redux/actions/auth';

// function App(props) {
//   useEffect(() => {
//     props.autoLogin();
//   }, []);

//   let routes = (
//     <Routes>
//       <Route path={'/auth'} element={<Auth />} />
//       <Route path={'/quiz/:id'} element={<Quiz />} />
//       <Route path={'/'} exact element={<QuizList />} />
//       <Navigate replace to={'/'}></Navigate>
//       {/* <Redirect to={'/'}></Redirect> */}
//     </Routes>
//   );
//   if (props.isAuthenticated) {
//     routes = (
//       <Routes>
//         <Route path={'/quiz-creator'} element={<QuizCreator />} />
//         <Route path={'/quiz/:id'} element={<Quiz />} />
//         <Route path={'/logout'} element={<Logout />} />
//         <Route
//           path={'/'}
//           // exact
//           element={<QuizList />}
//         />
//         {/* <Redirect to={'/'}></Redirect> */}
//         <Navigate replace to={'/'}></Navigate>
//       </Routes>
//     );
//   }
//   return <Layout>{routes}</Layout>;
// }

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: !!state.auth.token,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     autoLogin: () => dispatch(autoLogin()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
