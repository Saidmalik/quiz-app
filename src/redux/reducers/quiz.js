import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosQuiz from '../../axios/axios-quiz';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  results: {},
  quiz: null,
};

export const fetchQuizes = createAsyncThunk(
  'quiz/fetchQuizes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosQuiz.get('/quizes.json');

      if (!response.status === 200) {
        throw new Error('Data rendering error!');
      }
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test #${index + 1}`,
        });
      });

      return quizes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  'quiz/fetchQuizById',
  async (quizId, { rejectWithValue }) => {
    try {
      const response = await axiosQuiz.get(`/quizes/${quizId}.json`);
      if (!response.status === 200) {
        throw new Error('Erorr on rendering test id!');
      }
      const quiz = response.data;

      return quiz;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const quizAnswerClick = createAsyncThunk(
  'quiz/quizAnswerClick',
  (answerId, { rejectWithValue, dispatch, getState }) => {
    const state = getState().quiz;
    try {
      if (state.answerState) {
        const key = Object.keys(state.answerState)[0];
        if (state.answerState[key] === 'success') {
          return;
        }
      }
      const question = state.quiz[state.activeQuestion];
      const results = state.results;

      if (question.rightAnswerId === answerId) {
        console.log('you are right');

        // if (!results[question.id]) {
        //   results[question.id] = 'success'; //add success on results
        // }
        dispatch(
          quizSetState({
            answerState: { [answerId]: 'success' },
            results: results,
          })
        );
        const timeout = window.setTimeout(() => {
          if (isQuizFinished(state)) {
            dispatch(finishQuiz());
          } else {
            dispatch(quizNextQuestion(state.activeQuestion + 1));
          }
          window.clearTimeout(timeout);
        }, 500);
      } else {
        // results[question.id] = 'error'; //stay undefined

        dispatch(
          quizSetState({
            answerState: { [answerId]: 'error' },
            results: results,
          })
        );
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const isQuizFinished = (state) => {
  return state.activeQuestion + 1 === state.quiz.length;
};

export const quizReducer = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    quizSetState: (state, action) => {
      state.answerState = action.payload.answerState;
      state.results = action.payload.results;
    },

    finishQuiz: (state) => {
      state.isFinished = true;
    },
    quizNextQuestion: (state, action) => {
      state.activeQuestion = action.payload;
      state.answerState = null;
    },
    retryQuiz: (state) => {
      state.activeQuestion = 0;
      state.answerState = null;
      state.isFinished = false;
      state.results = {};
    },
  },
  extraReducers: {
    [fetchQuizes.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuizes.fulfilled]: (state, action) => {
      state.loading = false;
      state.quizes = action.payload;
    },

    [fetchQuizes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [fetchQuizById.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuizById.fulfilled]: (state, action) => {
      state.loading = false;
      state.quiz = action.payload;
    },
    [fetchQuizById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [quizAnswerClick.pending]: () => console.log('quizAnswerClick pending'),
    [quizAnswerClick.fulfilled]: () => console.log('quizAnswerClick resolved'),

    [quizAnswerClick.rejected]: (state, action) => {
      // state.loading = false;
      // state.error = action.payload;
      console.log('quizAnswerClick rejected');
    },
  },
});
//чаще всего в fulfilled делают action.payload типо загрузились данные => нужно занести их в стейт state.smth = action.payload
export const {
  // fetchQuizesStart,
  // fetchQuizesSuccess,
  // fetchQuizesError,
  fetchQuizSuccess,
  quizNextQuestion,
  quizSetState,
  quizSetAnswerState,
  quizSetResultsState,
  finishQuiz,
  retryQuiz,
} = quizReducer.actions;
export default quizReducer.reducer;

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
