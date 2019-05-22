import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Icon } from 'antd';

import { handleDeleteNotesGroup, handleNotesGroupsGetting } from '../store/notesGroups/thunks'

class GroupControl extends Component {

  onSuccessDeleteGroup = () => {
    const { handleNotesGroupsGetting, user } = this.props;
    handleNotesGroupsGetting(user.uid);
  };

  deleteGroup = e => {
    this.props.handleDeleteNotesGroup(e.target.id, this.onSuccessDeleteGroup)
  };

  componentDidMount() {
    this.onSuccessDeleteGroup()
  }

  render() {
    const { allNotesGroups } = this.props;
    return (
      <div className="groups-list">
        {allNotesGroups.map(group =>
          <div
            key={group.id}
          >
            <h5>{group.label}</h5>
            <Button
              id={group.id}
              onClick={this.deleteGroup}
            >
              <Icon type="delete"/>
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
  allNotesGroups: store.notesGroups.allNotesGroups,
});

const mapDispatchToProps = {
  handleDeleteNotesGroup,
  handleNotesGroupsGetting
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupControl);
