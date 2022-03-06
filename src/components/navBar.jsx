import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./../contexts/auth";

class NavBar extends Component {
  static contextType = AuthContext;

  handleLogOut = () => {
    this.context.signout();
  };

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark text-light bg-dark -sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            MeetTelHai
          </NavLink>
          {/*rander next code only of there is a current user*/}
          {this.context.currentUser && (
            <NavLink className="navbar-brand" to="/matches">
              My Matches
            </NavLink>
          )}
          {this.context.currentUser && (
            <NavLink className="navbar-brand" to="/meet">
              Meet
            </NavLink>
          )}
          {this.context.currentUser && (
            <NavLink className="navbar-brand" to="/myProfile">
              My Profile
            </NavLink>
          )}
          {this.context.currentUser && (
            <div className="d-flex ml-auto">
              <span className="navbar-text mx-2">
                Hello {this.context.currentUser.userName}
              </span>
              <div>
                <button
                  className="btn btn-dark my-2 my-sm-0 "
                  onClick={this.handleLogOut} //add redirect to home when logout
                >
                  sign out
                </button>
              </div>
            </div>
          )}
          {/*rander next code only of there isn't a current user*/}
          {!this.context.currentUser && (
            <NavLink className="navbar-brand" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
