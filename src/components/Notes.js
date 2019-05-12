import React from 'react';
import PropTypes from 'prop-types';

import Note from './Note';
import {connect} from 'react-redux';

class NotesList extends React.Component {

  render() {

    const {notes} = this.props;
    return (
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
    )
  }
}


NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      deleted: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  // toggleNote: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    notes: store.notes
  }
};

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps, mapDispatchToProps) (NotesList);