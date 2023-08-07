import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import applicantsReducer from '../reducers/applicantsReducer';
import thunkMiddleware from 'redux-thunk';

// Combine multiple reducers here if needed
const rootReducer = combineReducers({
  applicants: applicantsReducer,
});

// Create a composeEnhancers variable to use the compose function from Redux DevTools Extension
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
