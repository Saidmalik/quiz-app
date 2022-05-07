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
  quiz: null, //not [] like was before, we put null to define there data
};

export const fetchQuizes = createAsyncThunk(
  'quiz/fetchQuizes',
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axiosQuiz.get('/quizes.json');

      const quizesCopy = [];
      Object.keys(response.data).forEach((key, index) => {
        quizesCopy.push({
          id: key,
          name: `Test #${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizesCopy));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  'quiz/fetchQuizById',
  async (quizId, { rejectWithValue, dispatch }) => {
    // return (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axiosQuiz.get(`/quizes/${quizId}.json`);
      const quizCopy = response.data;

      dispatch(fetchQuizSuccess(quizCopy));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
    // };
  }
);

export const quizAnswerClick = createAsyncThunk(
  'quiz/quizAnswerClick',
  (answerId, { rejectWithValue, dispatch, getState }) => {
    // return (dispatch) => {
    const state = getState().quiz.quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }
    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      dispatch(quizSetState({ [answerId]: 'success' }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 500);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));
      //may be here i should do another independent action
    }
    // };
  }
);
//re-create
const isQuizFinished = (state) => {
  //local function  needs to quizAnswerClick
  return state.activeQuestion + 1 === state.quiz.length;
};

export const quizReducer = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    fetchQuizesStart: (state) => {
      state.loading = true;
    },
    fetchQuizesSuccess: (state, action) => {
      state.loading = false;
      //action.payload should be (but i think there is no diff in any cases)
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
    //may be you should create another action to do quizSetstate

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
  extraReducers: {
    [fetchQuizes.fulfilled]: () => console.log('fetchQuizes fulfilled'),
    [fetchQuizes.pending]: () => console.log('fetchQuizes pending'),
    [fetchQuizes.rejected]: () => console.log('fetchQuizes rejected'),
    [fetchQuizById.fulfilled]: () => console.log('fetchQuizById fulfilled'),
    [fetchQuizById.pending]: () => console.log('fetchQuizById pending'),
    [fetchQuizById.rejected]: () => console.log('fetchQuizById rejected'),
    [quizAnswerClick.fulfilled]: () => console.log('quizAnswerClick fulfilled'),
    [quizAnswerClick.pending]: () => console.log('quizAnswerClick pending'),
    [quizAnswerClick.rejected]: () => console.log('quizAnswerClick rejected'),
  },
});

export const {
  fetchQuizesStart,
  fetchQuizesSuccess,
  fetchQuizesError,
  fetchQuizSuccess,
  quizNextQuestion,
  quizSetState,
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
