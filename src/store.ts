import { combineReducers } from 'redux';
import applicantsReducer from './reducers/applicantsReducer';

const rootReducer = combineReducers({
  applicants: applicantsReducer,
});

export default rootReducer;