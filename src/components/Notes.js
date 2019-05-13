import React from 'react';
import PropTypes from 'prop-types';

import Note from './Note';
import {connect} from 'react-redux';

import { getNotes } from '../store/notes/thunks'
import AddNote from '../containers/AddNote';


class NotesList extends React.Component {

  componentDidMount() {
    console.log("i try to get notes");
    this.props.getNotes(this.props.user.uid)
  }

  render() {

    // const { user } = this.props;
    // if (!user) {
    //   return null
    // }
    const notes = this.props.notes;
    console.log("notes => ", notes);

    return (
      <div className={"notes-list"}>
        <AddNote/>
        <ul>

          {notes.map(note => (
            <Note
              key={note.id}
              id={note.id}
              // completed={note.completed}
              {...note}
              // onClick={() => toggleTodo(note.id)}
            />
          ))}
        </ul>
      </div>
    )
  }
}


NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      // completed: PropTypes.bool.isRequired,
      // deleted: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  // toggleNote: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    user: store.auth.user,
    notes: store.notes.notes
  }
};

const mapDispatchToProps  = {
  // createNote
  getNotes,
};

export default connect(mapStateToProps, mapDispatchToProps) (NotesList);