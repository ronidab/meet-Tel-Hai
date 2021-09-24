import React from "react";

export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
  state = {
    currentUser: null,
    //loading: false,
  };

  signup(name, email, password) {
    // return createUserWithEmailAndPassword(auth, email, password).then((auth) =>
    //   updateProfile(auth.user, { displayName: name })
    // );
  }
  signin(email, password) {
    // return signInWithEmailAndPassword(auth, email, password);
  }
  signout() {
    // return signOut(auth);
  }
  componentDidMount() {
    // auth.onAuthStateChanged((user) => {
    //   this.setState({ currentUser: user });
    // });
  }
  render() {
    const value = {
      currentUser: this.state.currentUser,
      signup: this.signup,
      signin: this.signin,
      signout: this.signout,
    };
    return (
      <AuthContext.Provider value={value}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
