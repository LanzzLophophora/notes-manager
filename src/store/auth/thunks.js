import firebase from '../config/Fire';
import { authenticateRequest, authenticateSuccess, authenticateError, logOut } from './actions';
import { push } from 'connected-react-router';

const makeUser = (user, nickname) => ({
  uid: user.uid,
  email: user.email,
  nickname
});

export const logOutUser = () => dispatch => {
  // const firebaseAuth = firebase.getInstance();
  // firebaseAuth.logOut();
  firebase.auth().signOut()
    .then(() => {
      console.log('out before dispatch');
        dispatch(logOut());
        console.log('out after dispatch');

      }
    )
    .then( () => {
      const user = firebase.auth().getCurrentUser();
      console.log(user);
        dispatch(push('/'));

      }
    )
};

export const authenticate = (email, password) => dispatch => {
  dispatch(authenticateRequest());

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      // console.log(user);
      dispatch(authenticateSuccess(makeUser(user)));
    })
    .catch(({ message }) => {
      dispatch(authenticateError(message));
    })
};

export const registration = (email, password, nickname) => dispatch => {
  dispatch(authenticateRequest());

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      // console.log(user);

      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: nickname,
      }).then(()=>{console.log('ok')})


      // dispatch(authenticateSuccess());
      // dispatch(push('/login'));

    })
    .then( () => {
      // const user = firebase.auth().currentUser;
      // user.updateProfile({
      //   displayName: "Jane Q. User",
      //   photoURL: "https://example.com/jane-q-user/profile.jpg"


        dispatch(authenticateSuccess());

      // })
      //   .then(function() {
      //   // Update successful.
      // }).catch(function(error) {
      //   // An error happened.
      // });
    })
//     .then( () =>
//       {
//         firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//         .then(function() {
//           // Existing and future Auth states are now persisted in the current
//           // session only. Closing the window would clear any existing state even
//           // if a user forgets to sign out.
//           // ...
//           // New sign-in will be persisted with session persistence.
//           return firebase.auth().signInWithEmailAndPassword(email, password);
//         })
//         .catch(function(error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//         });}
//
//
//
// )
    .catch(function ({ message }) {
      dispatch(authenticateError(message));
    });
};

export const subscribeAuthentication = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // set user object to state
      // user -> User
      dispatch(authenticateSuccess(makeUser(user)));
      dispatch(push('/'));

    } else {
      // remove user object from state
      // user -> undefined
      dispatch(logOut());
      // const { noReg } =
      console.log("No users");
      // if (!noReg) {
      //   dispatch(push('/login'));
      // } else {
      //   dispatch(push('/register'));
      // }

    }
  })
};