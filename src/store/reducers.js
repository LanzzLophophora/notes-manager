// import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
//
// import { authReducer } from './auth';
// import { notesReducer } from './notes';
//
// export const history = createBrowserHistory();
//
// const reducers = combineReducers({
//   router: connectRouter(history),
//   auth: authReducer,
//   notes: notesReducer
//   // ... // rest of your reducers
// });
//
// export default reducers;
//
//
// // const reducers = combineReducers({
// //   auth: authReducer,
// //   notes: notesReducer
// // });
// //
// // export default reducers;







import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { authReducer } from './auth';
import { notesReducer } from './notes';

export default history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  notes: notesReducer
})