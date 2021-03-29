import { promiseMiddleware } from '@adobe/redux-saga-promise';
import { sagaMiddleware } from 'src/app/config/saga-middleware';
import rootReducer from 'src/app/reducers';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import saga from '../effects';
import { applyMiddleware, compose, createStore } from 'redux';

export const history = createBrowserHistory();

const middleWares = [promiseMiddleware, sagaMiddleware, routerMiddleware(history)];

const win = window;
const finalCreateStore = compose(
  applyMiddleware(...middleWares),
  win && win.__REDUX_DEVTOOLS_EXTENSION__ ? win.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 }) : f => f
);

const store = createStore(rootReducer(history), finalCreateStore);
sagaMiddleware.run(saga);
export default store;
