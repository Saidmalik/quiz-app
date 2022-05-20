import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosQuiz from '../../axios/axios-quiz';

const initialState = {
  quiz: [],
};

export const finishCreateQuiz = createAsyncThunk(
  'create/finishCreateQuiz',
  async (_, { dispatch, getState }) => {
    await axiosQuiz.post('/quizes.json', getState().create.quiz);
    // console.log(getState().create.quiz, 'its getstate');

    dispatch(resetQuizCreation());
  }
);
//создается 2 теста + не работает кнопка клика
export const createReducer = createSlice({
  name: 'create',
  initialState,
  reducers: {
    createQuizQuestion: (state, action) => {
      state.quiz = [...state.quiz, action.payload];
    },
    resetQuizCreation: (state) => {
      state.quiz = [];
    },
  },
  // extraReducers: {
  //   [finishCreateQuiz.pending]: (state) => {},
  //   [finishCreateQuiz.fulfilled]: (state, action) => {},
  //   [finishCreateQuiz.rejected]: (state, action) => {},
  // },
});

export const { createQuizQuestion, resetQuizCreation } = createReducer.actions;
export default createReducer.reducer;

// import {
//   CREATE_QUIZ_QUESTION,
//   RESET_QUIZ_CREATION,
// } from '../actions/actionTypes';

// const initialState = {
//   quiz: [],
// };
// export const createReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CREATE_QUIZ_QUESTION:
//       return {
//         ...state,
//         quiz: [...state.quiz, action.item],
//       };
//     case RESET_QUIZ_CREATION:
//       return {
//         ...state,
//         quiz: [],
//       };
//     default:
//       return state;
//   }
// };
