import React from 'react';
import { Route, Redirect } from 'react-router';
import {connect} from 'react-redux';

class PrivateRoute  extends React.Component {
 render() {
   // check whether user is authorised - `userAuthorised`
   const { user } = this.props;
   if (!user) {
     // if (!userAuthorised) {
     return <Redirect to="/login" />;
   }

   // return <Route {...props} />;
   return <Redirect to="/" />;
 }
};

const mapStateToProps = store => {
  return {
    user: store.auth.user
  }
};

export default connect(mapStateToProps, null) (PrivateRoute);