import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  quiz: [],
};
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
