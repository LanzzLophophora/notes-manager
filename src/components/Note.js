import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import Swal from "sweetalert2";

import { handleNoteSaving, handleNoteDeleting } from '../store/note/thunks';

import LinkButton from './LinkButton';

const ButtonGroup = Button.Group;

class Note extends Component {

  state = {
    note: this.props.notes.find(note => note.id === this.props.id)
  };

  handleDelete = () => {
    const { note } = this.state;
    const { handleNoteSaving } = this.props;

    if (note.deleted) {
      handleNoteSaving({
        ...note,
        deleted: !note.deleted
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Move this note to trash?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your file has been moved to trash.',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            handleNoteSaving({
              ...note,
              deleted: !note.deleted
            });
          })
        }
      });
    }
  };

  handleDeleteForEver = () => {
    const { handleNoteDeleting, id } = this.props;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Your file has been deleted. Forever... T.T',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          handleNoteDeleting(id)
        })
      }
    });
  };

  render() {
    const note = this.state.note;

    return (
      <div className="note-item-wrapper">
        <div className={"note-item"}>
          <p className={"note-item-text"}>{note.body}</p>
        </div>
        {!note.deleted && note.completed &&
        <span className="span-completed">
          Completed!
        </span>}
        <div className="note-item-buttons">
          <ButtonGroup>
            {!note.deleted && <LinkButton
              link={`/notes/${note.id}`}
            >
              <Icon type="edit" theme="twoTone"/>
              Edit note
            </LinkButton>
            }
            {note.deleted &&
            <Button onClick={this.handleDelete}>
              <Icon type="delete" theme="filled"/>
              Restore
            </Button>}
            {note.deleted ?
              <Button onClick={this.handleDeleteForEver}>
                Delete forever from trash
                <Icon type="close-circle" theme="filled"/>
              </Button> :
              <Button onClick={this.handleDelete}><Icon type="delete" theme="twoTone"/></Button>
            }
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  completed: PropTypes.bool,
  deleted: PropTypes.bool,
  handleNoteSaving: PropTypes.func,
  handleNoteDeleting: PropTypes.func,
};

const mapStateToProps = store => ({
  notes: store.notes.notes,
  noteItem: store.note.noteItem
});

const mapDispatchToProps = ({
  handleNoteSaving,
  handleNoteDeleting
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
