// src/reducers/index.ts
import { combineReducers } from 'redux';
import applicantsReducer from './applicantsReducer';

const rootReducer = combineReducers({
  applicants: applicantsReducer,
});

export default rootReducer;
