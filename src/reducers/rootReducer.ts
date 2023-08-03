import { combineReducers } from 'redux';
import applicantsReducer, { ApplicantsState } from './applicantsReducer';

// Define the root state interface
export interface RootState {
  applicants: ApplicantsState;
}

const rootReducer = combineReducers<RootState>({
  applicants: applicantsReducer,
});

export default rootReducer;
