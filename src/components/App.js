import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { Spin } from 'antd';

import { subscribeAuthentication } from '../store/auth/thunks';

import LoginForm from './Login';
import RegistrationForm from './RegistationForm';
import Header from './Header';

import PrivateRoute from "./PrivateRoute";
import NotesList from '../containers/NotesList';
import Trash from '../containers/Trash';
import OneNoteItem from '../containers/NoteView';

class App extends React.PureComponent {

  componentDidMount() {
    this.props.subscribeAuthentication();
  }

  render() {
    const { isLoading, user } = this.props.auth;

    if (isLoading) {
      return (
        <div className="spin-wrapper">
          <Spin className="absolute-center"/>
        </div>
      )
    }

    return (
      <div className="app">
        {user && <Header/>}
        <Switch>
          <Route exact path="/register" component={RegistrationForm}/>
          <Route exact path="/login" component={LoginForm}/>

          <PrivateRoute exact path="/notes" component={NotesList}/>
          <PrivateRoute exact path="/trash" component={Trash}/>
          <PrivateRoute exact path="/notes/:id" component={OneNoteItem}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth,
});

const mapDispatchToProps = {
  subscribeAuthentication,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
