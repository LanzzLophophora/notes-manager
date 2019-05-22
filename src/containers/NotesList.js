import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Icon } from 'antd/lib';
import Select from 'react-select';

import { handleNotesListGetting } from '../store/notes/thunks';
import { setFilter } from '../store/notes/actions';
import { handleNotesGroupsGetting } from '../store/notesGroups/thunks';
import { handleNoteCreation } from '../store/note/thunks';

import Note from '../components/Note';
import GroupControl from '../components/GroupControl';

const ButtonGroup = Button.Group;

class NotesList extends React.Component {

  state = {
    groupForSelect: [],
    filteredNotes: [],
    error: "",
    groupsList: []
  };

  componentDidMount() {
    const { handleNotesListGetting, handleNotesGroupsGetting, user } = this.props;
    handleNotesListGetting(user.uid);
    handleNotesGroupsGetting(user.uid);
  }

  handleCreate = () => {
    this.props.handleNoteCreation();
  };

  handleChangeSelector = (groupsList) => {
    const { notes, setFilter } = this.props;
    setFilter(groupsList);
    this.setState({
      filteredNotes: notes.filter(({ oneNoteGroups }) => groupsList.every(({ id: _id }) => oneNoteGroups.includes(_id))),
      groupsList
    })
  };

  goToTrash = () => {
    const { history } = this.props;
    history.push('/trash');
  };

  render() {
    const { allNotesGroups, notes, filterNotes = [] } = this.props;
    const { groupsList, filteredNotes } = this.state;
    const validNotes = (filteredNotes.length || groupsList.length) ?
      filteredNotes.filter(note => !note.deleted) :
      notes.filter(note => !note.deleted);
    return (
      <div className="d-flex">
        <div className="notes-list-wrapper">
          <div className="my-buttons">
            <ButtonGroup>
              <Button
                type="primary"
                onClick={this.handleCreate}
              >
                <Icon type="edit"/>
                Create note
              </Button>
              <Button
                type="primary"
                onClick={this.goToTrash}
              >
                Go to Trash
                <Icon type="delete"/>
              </Button>
            </ButtonGroup>
            <Select
              isMulti
              name="colors"
              value={filterNotes}
              options={allNotesGroups}
              onChange={this.handleChangeSelector}
              className="basic-multi-select"
            />
          </div>
          <div className="notes-list">
            {validNotes.map(note => (
              <Note
                key={note.id}
                id={note.id}
                {...note}
              />
            ))}
          </div>
        </div>
        <GroupControl/>
      </div>
    )
  }
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      body: PropTypes.string,
    }).isRequired
  ).isRequired,
  user: PropTypes.object.isRequired,
  allNotesGroups: PropTypes.array,
  filterNotes: PropTypes.array,
  handleNotesListGetting: PropTypes.func,
  handleNoteCreation: PropTypes.func,
  handleNotesGroupsGetting: PropTypes.func,
  setFilter: PropTypes.func
};

const mapStateToProps = store => ({
  user: store.auth.user,
  notes: store.notes.notes,
  allNotesGroups: store.notesGroups.allNotesGroups,
  filterNotes: store.notes.filterNotes
});

const mapDispatchToProps = {
  handleNotesListGetting,
  handleNoteCreation,
  handleNotesGroupsGetting,
  setFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesList);
