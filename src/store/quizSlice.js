import { createSlice } from '@reduxjs/toolkit'

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

export const quizReducer = createSlice({
    name: 'quiz',
    initialState, 
    reducers: {
    
    },
    extraReducers: {
        []: (state, action) => {}
    }
})