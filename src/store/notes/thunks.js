import { getNotesCollections } from '../api/notes';
import { getNotesListRequest, getNotesListSuccess, getNotesListError } from './actions';

export const handleNotesListGetting = uid => dispatch => {
  dispatch(getNotesListRequest());
  getNotesCollections(uid)
    .then(notes => dispatch(getNotesListSuccess(notes)))
    .catch(({ message }) => dispatch(getNotesListError(message)))
};
