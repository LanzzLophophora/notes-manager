// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { routerMiddleware } from 'connected-react-router';
//
// import reducers, { history } from './reducers';
//
// export const initializeStore = () => createStore(
//   reducers,
//   compose(
//     routerMiddleware(history),
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );
//
// export { history } from './reducers';


import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

const configureStore = () => createStore(
  createRootReducer(history), // root reducer with router state
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default configureStore;
// export default initializeStore;