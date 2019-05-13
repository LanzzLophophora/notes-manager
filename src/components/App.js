import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Home from './Home';
import LoginForm from './Login';
import RegistrationForm from './RegistationForm';
import Notes from './Notes';
import Logout from './Logout';

import { subscribeAuthentication } from '../store/auth/thunks';

import './App.css';
import "antd/dist/antd.css";
import {push} from "connected-react-router";

class App extends React.PureComponent {
  componentDidMount() {
    const { subscribeAuthentication } = this.props;
    subscribeAuthentication();

    // const {user} = this.props.auth;
    // console.log(user);
    // if (!user) {
    //   console.log("user is undef");
    //   push('/login');
    // }

  }

  render() {
    const { isLoading } = this.props.auth;

    if (isLoading) {
      return (
        <h3>Loading...</h3>
      )
    }

  return (
         <div className="app">
           <Switch>
             {/*<Route path="/" component={PrivatRoute} />*/}
             <Route exact path="/" component={Home} />
             <Route exact path="/register" component={RegistrationForm} />
             <Route exact path="/login" component={LoginForm} />
             <Route exact path="/logout" component={Logout} />
             <Route  path="/error" component={Notes} />

           </Switch>
         </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    auth: store.auth,
  }
};

const mapDispatchToProps = {
  subscribeAuthentication
};
//
// const mapDispatchToProps = dispatch => {(
//   subscribeAuthentication: subscribeAuthentication(),
//   push: page => dispatch(push(page))
// });

export default connect(mapStateToProps, mapDispatchToProps)(App);
