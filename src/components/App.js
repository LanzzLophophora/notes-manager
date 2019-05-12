import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import LoginForm from './Login';
import RegistrationForm from './RegistationForm';
import Notes from './Notes';
import Home from './Home';
import Logout from './Logout';

import { subscribeAuthentication } from '../store/auth/thunks';

import './App.css';
import "antd/dist/antd.css";

class App extends React.PureComponent {
  componentDidMount() {
    const { subscribeAuthentication } = this.props;
    subscribeAuthentication();
  }

  render() {
    const { isLoading } = this.props.auth;

    if (isLoading) {
      return (
        <h3>Loading...</h3>
      )
    }

    // if (error) {
    //   return  <h3>{error}</h3>
    // }
    {/*<BrowserRouter>*/}
    {/*</BrowserRouter>*/}

    // if (!user) {
    //       return (
    //         <LoginForm/>
    //         )
    //     } else {
    //       return (
    //         <Home />
    //       )
    //     }

  return (
          <Switch>
            {/*<Route path="/" component={PrivatRoute} />*/}
            <Route exact path="/" component={Home} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/error" component={Notes} />

          </Switch>
    );
  }
}

const mapStateToProps = store => {
  return {
    auth: store.auth,
    // isLoading: store.isLoading,
    // user: store.user
  }
};

const mapDispatchToProps = {
  subscribeAuthentication
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
