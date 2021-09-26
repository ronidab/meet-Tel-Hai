import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
  state = {
    currentUser: null,
    //loading: false,
  };

  register = async (name, email, password) => {
    const { data } = await axios.post("/register", { name, email, password });
    localStorage.setItem("jwt-token", data.token);
    const user = jwt.decode(data.token);
    this.setState({ currentUser: user });
    return user;
  };
  login = async (email, password) => {
    const { data } = await axios.post("/login", { email, password });
    localStorage.setItem("jwt-token", data.token);
    const user = jwt.decode(data.token);
    this.setState({ currentUser: user });
    return user;
  };
  signout() {
    localStorage.removeItem("jwt-token");
    this.setState({ currentUser: null });
  }

  addGroup = async (groupName, groupsMemers, Expenses) => {
    //move to different file?
    const { data } = await axios.post("/addGroup", {
      groupName,
      groupsMemers,
      Expenses,
    });
    localStorage.setItem(data.token);
    const group = data.token;
    return group;
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt-token");
    if (!token) {
      return;
    }
    const user = jwt.decode(token);
    this.setState({ currentUser: user });
  }
  render() {
    const value = {
      currentUser: this.state.currentUser,
      register: this.register,
      login: this.login,
      signout: this.signout,
    };
    return (
      <AuthContext.Provider value={value}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
