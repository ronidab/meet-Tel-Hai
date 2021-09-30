import React, { Component } from "react";
import { AuthContext } from "./../contexts/auth";

class Homse extends Component {
  static contextType = AuthContext;
  state = {};
  render() {
    console.log(this.context);
    return (
      <div className="row h-100 bg-info">
        <div className="col p-3 container">
          <h1 className="text-dark text-center">SplitBills</h1>
          <h5 className="text-center">
            {/* <pre>{JSON.stringify(this.context.currentUser, null, 2)}</pre> */}
            Create a group, call your friends, enter your expenses and we will
            do the rest for you
          </h5>
        </div>
      </div>
    );
  }
}

export default Homse;
