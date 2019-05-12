import React, {Component} from 'react';
import {logOut, login} from '../store/auth/actions';
import {connect} from 'react-redux';
import { push } from 'connected-react-router';
import firebase from '../store/config/Fire';



class Home extends Component {
  handleLogout = (event) =>  {
    const  { logout, login, push } = this.props;
    // logout();
    // console.log(event.target.innerText);
    // console.log(event);
    // console.log(event.target.innerText);
    // console.log(typeof event.target.innerText);
    // console.log(event.target.innerText.toLowerCase());

     // if (event.target.innerText === "LogIn") {
     //   console.log('111');

    // const { user } = this.props.auth;
    const user = firebase.auth().currentUser;

      console.log(user);

       push(`/${event.target.innerText.toLowerCase()}`);
     // }

    // {[event.target.innerText.toLowerCase()]()};
    // console.log(    [event.target.innerText.toLowerCase()] );
  };


  render() {
    const { user } = this.props.auth;
    // const user = firebase.auth().currentUser;
    // if (user != null) {
    //   user.providerData.forEach(function (profile) {
    //     console.log("Sign-in provider: " + profile.providerId);
    //     console.log("  Provider-specific UID: " + profile.uid);
    //     console.log("  Name: " + profile.displayName);
    //     console.log("  Email: " + profile.email);
    //     console.log("  Photo URL: " + profile.photoURL);
    //   });
    // }


    console.log(user);
    return (
      <div>
        <button onClick={this.handleLogout}>{user ? "LogOut" : "LogIn"}</button>
        <button>Lets work with notes!</button>
      </div>
    );
  }
}

const mapStateToProps = store => {
 return {
   auth: store.auth
 }
};

// mapDispatchToProps = {
const mapDispatchToProps = dispatch =>({
  // logOut
  logout: () => dispatch(logOut()),
  login: () => dispatch(login()),
  push: page => dispatch(push(page))
});

export default connect(mapStateToProps, mapDispatchToProps) (Home);