import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosQuiz from '../../axios/axios-quiz';

const initialState = {
  quiz: [],
};

export const finishCreateQuiz = createAsyncThunk(
  'create/finishCreateQuiz',
  async (_, { rejectWithValue, dispatch, getState }) => {
    axiosQuiz.post('/quizes.json', getState().create.quiz);
    dispatch(resetQuizCreation());
  }
);

export const createReducer = createSlice({
  name: 'create',
  initialState,
  reducers: {
    createQuizQuestion: (state, action) => {
      state.quiz = [...state.quiz, action.item];
    },
    resetQuizCreation: (state) => {
      state.quiz = [];
    },
  },
  extraReducers: {
    [finishCreateQuiz.fulfilled]: console.log('finishCreateQuiz fulfilled'),
    [finishCreateQuiz.pending]: console.log('finishCreateQuiz pending'),
    [finishCreateQuiz.rejected]: console.log('finishCreateQuiz rejected'),
  },
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
