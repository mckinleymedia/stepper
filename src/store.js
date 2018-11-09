import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

// import root epics/reducer
import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import queryString from 'query-string';

import stepperSaga from './components/stepper/duck/sagas';

// export `history` to use in index.js, we using `createBrowserHistory`
export const history = createHistory();

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {
    queryString,
  },
});

// Build the middleware for intercepting and dispatching navigation actions
const appRouterMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, sagaMiddleware),
    applyMiddleware(epicMiddleware),
    applyMiddleware(appRouterMiddleware),
  ),
);

sagaMiddleware.run(stepperSaga);

export default store;
