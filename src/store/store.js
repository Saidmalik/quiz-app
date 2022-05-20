import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createReducer } from './createSlice';
import { quizReducer } from './quizSlice';
import { authReducer } from './authSlice';

export const rootReducer = combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer,
});
// combineReducers
const store = configureStore({ reducer: rootReducer });
//this should be done in real project redux-toolkit
