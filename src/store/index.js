import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

const configureStore = () => createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default configureStore;
