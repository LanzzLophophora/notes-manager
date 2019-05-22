import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { auth } from './auth';
import { notes } from './notes';
import { note } from './note';
import { notesGroups } from './notesGroups';

export default history => combineReducers({
  router: connectRouter(history),
  auth,
  notes,
  note,
  notesGroups
});
