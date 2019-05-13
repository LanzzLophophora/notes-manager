import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import { deleteTodo } from '../store/todoList';
import { deleteNote, toggleCompletedNote } from '../store/notes/actions'

const Note = ({ completed, deleted, id, title, body, deleteTodoItem }) => {
  const className = classnames({
    "todo-item-completed": completed
  });

  const handleDelete = id => () => {
    deleteTodoItem(id);
  };

  const handleToggleCompleted = id => () => {
    this.props.toggleCompletedNote(id)
  }

  return (
    <li className={className}>
      <span onClick={handleToggleCompleted}>{title}</span>
      <p>{body}</p>
      { completed && <button onClick={handleDelete(id)}>{deleted ? "Restore" : "Delete"}</button>}
    </li>
  )
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  deleted: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  deleteNote: id => dispatch(deleteNote(id)),
  toggleCompletedNote: id => dispatch(toggleCompletedNote(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Note);
