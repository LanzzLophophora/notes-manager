import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Icon } from 'antd/lib';
import Spin from 'antd/lib/spin';
import Swal from 'sweetalert2';

import { handleNotesListGetting } from '../store/notes/thunks';
import { handleNoteDeleting } from '../store/note/thunks';

import LinkButton from '../components/LinkButton';
import Note from '../components/Note';

class Trash extends Component {

  componentDidMount() {
    const { handleNotesListGetting, user } = this.props;
    handleNotesListGetting(user.uid);
  }

  clearTrash = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Clean trash?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your trash basket has been cleaned.',
          'success'
        ).then(() => {
          const deletedNotes = this.props.notes.filter(note => note.deleted);
          deletedNotes.map(note => this.props.handleNoteDeleting(note.id));
          this.trashEmpty();
        })
      }
    });
  };

  trashEmpty = () => {
    Swal.fire({
      title: 'Trash is empty',
      animation: false,
      customClass: {
        popup: 'animated'
      }
    }).then(() => {
      const { history } = this.props;
      history.push('/notes');
    })
  };

  render() {
    const deletedNotes = this.props.notes.filter(note => note.deleted);
    if (this.props.loading) {
      return (
        <div className="spin-wrapper">
          <Spin className="absolute-center"/>
        </div>
      )
    }

    return (
      <div className="trash-page">
        {deletedNotes.length ? <h3>It`s your trash basket</h3> : <h3>Your trash basket is empty</h3>}
        <div className="my-buttons">
          <Button
            type="primary"
            onClick={this.clearTrash}
          >
            <Icon type="delete"/>
            Clear trash
          </Button>
          <LinkButton
            type="primary"
            link="/notes"
          >
            <Icon type="left"/>
            <span>Go back</span>
          </LinkButton>
        </div>
        <div className="notes-list">
          {deletedNotes.map(note => (
            <Note
              key={note.id}
              id={note.id}
              {...note}
            />
          ))}
        </div>
      </div>
    )
  }
}

Trash.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  notes: PropTypes.array,
  handleNoteDeleting: PropTypes.func.isRequired,
  handleNotesListGetting: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  loading: store.notes.loading,
  user: store.auth.user,
  notes: store.notes.notes
});

const mapDispatchToProps = ({
  handleNoteDeleting,
  handleNotesListGetting
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
