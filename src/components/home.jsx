import React, { Component } from "react";
import { AuthContext } from "./../contexts/auth";

class Homse extends Component {
  static contextType = AuthContext;
  state = {};
  render() {
    console.log(this.context);
    return (
      <div className="row h-100 bg-danger">
        <div className="col p-3 container">
          <h1 className="text-dark text-center">MeetTelHai</h1>
          <h5 className="text-center">
            {/* <pre>{JSON.stringify(this.context.currentUser, null, 2)}</pre> */}
            Find your match, Create relationships in Tel-Hai community 
            <nl></nl>log in and we will do the rest for you
            <img src="/homepagepic.jpg" class="img-fluid" alt="Responsive image"></img>
          </h5>
        </div>
      </div>
    );
  }
}

export default Homse;
