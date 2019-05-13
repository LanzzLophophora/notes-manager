import React, {Component} from 'react';
import {connect} from 'react-redux';
import { push } from 'connected-react-router';

import NotesList from './Notes';
// import { currentUser } from '../store/api/apisMethods';

class Home extends Component {

  componentDidMount() {
    // const {user} = this.props.auth;
    // console.log(user);
    // if (!user) {
    //   console.log("user is undef");
    //   this.props.push('/login');
    // }
  }


  handleLogout = (event) =>  {
    const {push} = this.props;
    push(`/${event.target.innerText.toLowerCase()}`);
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div>
          {user && `Hello, ${user.nickname}!`}
          <button onClick={this.handleLogout}>{user ? "LogOut" : "LogIn"}</button>
        </div>
        {user &&  <NotesList />}
      </div>
    );
  }
}

const mapStateToProps = store => {
 return {
   auth: store.auth
 }
};

const mapDispatchToProps = dispatch =>({
  push: page => dispatch(push(page))
});

export default connect(mapStateToProps, mapDispatchToProps) (Home);