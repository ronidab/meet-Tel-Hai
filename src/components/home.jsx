import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../contexts/auth";

class Homse extends Component {
  static contextType = AuthContext;
  state = {};
  render() {
    console.log(this.context);
    return (
      <div className="bg-info ">
        <div className="row justify-content-md-center overflow-auto">
          <div className="col-6-lg-3">
            <div className="text-center">
              <h1 className="text-dark">SplitBills</h1>
              <p>
                {/* <pre>{JSON.stringify(this.context.currentUser, null, 2)}</pre> */}
                Create a group, call your friends, enter your expenses and we
                will do the rest for you
              </p>
            </div>
          </div>
        </div>
        {!this.context.currentUser && (
          <div className="row justify-content-md-center">
            <div className="col-6-lg-2 p-2">
              <Link to="/signup" className="btn btn-secondary">
                Register
              </Link>
            </div>
            <div className="col-6-lg-2 p-2">
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Homse;
