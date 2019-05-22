import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleNoteFetching, handleNoteSaving, handleNoteDeleting } from '../store/note/thunks';
import {
  handleNotesGroupCreation,
  handleNotesGroupsGetting,
  handleNotesGroupsManaging
} from '../store/notesGroups/thunks';

import { Button, Input, Icon } from 'antd/lib';
import Swal from 'sweetalert2';

import CreatableSelect from 'react-select/lib/Creatable';
import LinkButton from '../components/LinkButton';

const { TextArea } = Input;
const ButtonGroup = Button.Group;

class NoteView extends Component {

  state = {
    body: "",
    completed: false,
    deleted: false,
    allNotesGroups: [],
    oneNoteGroups: [],
    currentGroups: [],
    groupForSelect: [],
  };

  onSuccessNoteFetching = noteItem => {
    this.setState({
      ...noteItem
    });
  };

  onSuccessNotesGroupsFetching = allNotesGroups => {
    this.setState({
      allNotesGroups
    });
  };

  componentDidMount() {
    const { handleNoteFetching, handleNotesGroupsGetting, user, match: { params: { id } } } = this.props;
    handleNoteFetching(id, this.onSuccessNoteFetching);
    handleNotesGroupsGetting(user.uid, this.onSuccessNotesGroupsFetching);
  }

  handleSubmit = () => {
    const { oneNoteGroups, body } = this.state;
    const { noteItem, handleNoteSaving } = this.props;

    handleNoteSaving({
      ...noteItem,
      body,
      oneNoteGroups,
    });
  };

  handleChangeBody = event => {
    this.setState({
      body: event.target.value
    })
  };

  handleDelete = () => {
    if (!this.props.noteItem.deleted) {
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
          Swal.fire(
            'Deleted!',
            'Your file has been moved to trash.',
            'success'
          ).then(() => {
            const { handleNoteSaving, noteItem } = this.props;
            handleNoteSaving({
              ...noteItem,
              deleted: !noteItem.deleted,
            });
          })
        }
      });
    } else {
      const { handleNoteSaving, noteItem } = this.props;
      handleNoteSaving({
        ...noteItem,
        deleted: noteItem.deleted,
      });
    }
  };

  handleComplete = () => {
    const { handleNoteSaving, noteItem } = this.props;
    handleNoteSaving({
      ...noteItem,
      completed: !noteItem.completed
    });
  };

  onSuccessCreatGroup = group => {
    this.setState({
      allNotesGroups: [
        ...this.state.allNotesGroups,
        group
      ],
      oneNoteGroups: [
        ...this.state.oneNoteGroups,
        group.id
      ]
    });
  };

  handleChangeSelector = (newValue, actionMeta) => {
    if (actionMeta.action === "remove-value") {
      this.setState({
        oneNoteGroups: this.state.oneNoteGroups.filter(groupId => groupId !== actionMeta.removedValue.id)
      });
      return
    }

    if ((newValue.filter(value => value.__isNew__)).length > 0) {
      this.props.handleNotesGroupsManaging(newValue.filter(value => value.__isNew__), this.onSuccessCreatGroup);
    } else {
      this.setState({
        oneNoteGroups: [
          ...this.state.oneNoteGroups,
          newValue[newValue.length - 1].id
        ]
      })
    }
  };

  render() {
    if (this.props.loadingNote || this.props.loadingNotes) {
      return <h3 className="absolute-center">Loading...</h3>
    }
    const { deleted, completed } = this.props.noteItem;
    const { allNotesGroups, oneNoteGroups, body } = this.state;

    const groupForSelect = allNotesGroups.filter(allNotesGroup => !oneNoteGroups.includes(allNotesGroup.id));
    const currentGroups = allNotesGroups.filter(allNotesGroup => oneNoteGroups.includes(allNotesGroup.id));

    return (
      <div className="note-view">
        <LinkButton
          type="primary"
          link="/notes"
        >
          <Icon type="left"/>
          <span>Go back</span>
        </LinkButton>
        <TextArea
          rows={5}
          onChange={this.handleChangeBody}
          value={body}
        />
        <div className="my-buttons">
          <ButtonGroup className="m-auto">
            <Button onClick={this.handleSubmit}>
              <Icon type="save"/>
              Save
            </Button>
            <Button onClick={this.handleComplete}>
              {completed ?
                <span>UnDone!</span> :
                <span>Done!</span>
              }
            </Button>
            <Button onClick={this.handleDelete}><Icon type="delete"/>{deleted ? "Restore" : "Delete"}</Button>
          </ButtonGroup>
          <CreatableSelect
            isMulti
            value={currentGroups}
            onChange={this.handleChangeSelector}
            options={groupForSelect}
            isLoading={this.props.loadingNotesGroups}
          />
        </div>

      </div>
    );
  }
}

NoteView.propTypes = {
  body: PropTypes.string,
  completed: PropTypes.bool,
  deleted: PropTypes.bool,
  allNotesGroups: PropTypes.array,
  oneNoteGroups: PropTypes.array,
  currentGroups: PropTypes.array,
  groupForSelect: PropTypes.array,
};

const mapStateToProps = store => ({
  user: store.auth.user,
  loadingNote: store.note.loading,
  loadingNotes: store.notes.loading,
  loadingNotesGroups: store.notesGroups.loading,
  noteItem: store.note.noteItem,
  allNotesGroups: store.notesGroups.allNotesGroups,
});

const mapDispatchToProps = {
  handleNoteFetching,
  handleNoteSaving,
  handleNoteDeleting,
  handleNotesGroupsGetting,
  handleNotesGroupCreation,
  handleNotesGroupsManaging
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteView);
