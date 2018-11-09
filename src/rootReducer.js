import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { stepperReducer } from './components/stepper/duck/reducers';

// import your Module reducers here and combine them
import home from './home/reducers';

const rootReducer = combineReducers({
  home,
  router: routerReducer,
  stepper: stepperReducer,
});

export default rootReducer;
