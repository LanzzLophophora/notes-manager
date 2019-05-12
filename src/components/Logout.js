import React, {Component} from 'react';
import {logOutUser} from '../store/auth/thunks';
import {connect} from 'react-redux';

class Logout extends Component {
  render() {
    this.props.logOutUser();

    return (
      <div>
        Loading.... (log out)
      </div>
    );
  }
}

const mapDispatchToProps  = {
  logOutUser
};

export default connect(null, mapDispatchToProps) (Logout);