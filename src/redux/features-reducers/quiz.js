import { createSlice } from '@reduxjs/toolkit';

// import {
//   FETCH_QUIZES_START,
//   FETCH_QUIZES_ERROR,
//   FETCH_QUIZES_SUCCESS,
//   FETCH_QUIZ_SUCCESS,
//   FINISH_QUIZ,
//   QUIZ_SET_STATE,
//   QUIZ_NEXT_QUESTION,
//   RETRY_QUIZ,
// } from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  results: {},
  quiz: null, //not [] like was before, we put null to define there data
};

export const quizReducer = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    //these are actions
    fetchQuizesStart: (state) => {
      state.loading = true;
    },

    fetchQuizesSuccess: (state, action) => {
      state.loading = false;
      state.quizes = action.quizes;
    },
    fetchQuizesError: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    fetchQuizSuccess: (state, action) => {
      state.loading = false;
      state.quiz = action.quiz;
    },
    quizSetState: (state, action) => {
      state.answerState = action.answerState;
      state.results = action.results;
    },
    finishQuiz: (state) => {
      state.isFinished = true;
    },
    quizNextQuestion: (state, action) => {
      state.activeQuestion = action.questionNumber;
      state.answerState = null;
    },
    retryQuiz: (state) => {
      state.activeQuestion = 0;
      state.answerState = null;
      state.isFinished = false;
      state.results = {};
    },
  },
});

// import {
//   FETCH_QUIZES_START,
//   FETCH_QUIZES_ERROR,
//   FETCH_QUIZES_SUCCESS,
//   FETCH_QUIZ_SUCCESS,
//   FINISH_QUIZ,
//   QUIZ_SET_STATE,
//   QUIZ_NEXT_QUESTION,
//   RETRY_QUIZ,
// } from '../actions/actionTypes';

// const inititalState = {
//   quizes: [],
//   loading: false,
//   error: null,
//   activeQuestion: 0,
//   answerState: null,
//   isFinished: false,
//   results: {},
//   quiz: null, //not [] like was before, we put null to define there data
// };

// export const quizReducer = (state = inititalState, action) => {
//   switch (action.type) {
//     case FETCH_QUIZES_START:
//       return {
//         ...state,
//         loading: true,
//       };
//     case FETCH_QUIZES_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         quizes: action.quizes,
//       };
//     case FETCH_QUIZES_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.error,
//       };
//     case FETCH_QUIZ_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         quiz: action.quiz,
//       };
//     case QUIZ_SET_STATE:
//       return {
//         ...state,
//         answerState: action.answerState,
//         results: action.results,
//       };
//     case FINISH_QUIZ:
//       return {
//         ...state,
//         isFinished: true,
//       };
//     case QUIZ_NEXT_QUESTION:
//       return {
//         ...state,
//         activeQuestion: action.questionNumber,
//         answerState: null,
//       };
//     case RETRY_QUIZ:
//       return {
//         ...state,
//         activeQuestion: 0,
//         answerState: null,
//         isFinished: false,
//         results: {},
//       };
//     default:
//       return state;
//   }
// };
