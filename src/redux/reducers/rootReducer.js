import { combineReducers } from '@redux/toolkit';
import { quizReducer } from './quiz';
import { createReducer } from './create';
import { authReducer } from './auth';


export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer,
});
