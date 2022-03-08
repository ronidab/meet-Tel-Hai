import React, { Component } from "react";
import "./home.css"
import { AuthContext } from "./../contexts/auth";
import HomeImage from './homepagepic.jpg';
class Homse extends Component {
  static contextType = AuthContext;
  state = {};
  render() {
    console.log("render!!")
    console.log(this.context);
    return (
      <div className="row h-100 bg-danger">
        <div className="col p-3 container">
          <h1 className="text-dark text-center">MeetTelHai</h1>
          <h3 className="text-center">
            {/* <pre>{JSON.stringify(this.context.currentUser, null, 2)}</pre> */}
            Find your match,<br></br>
            Create relationships in Tel-Hai community <br></br>
          </h3>
            
          <h5 className="text-center">
            swipe right or left, maybe your love is there<br></br>
          </h5>
          <div className="image-container">
            <img src={HomeImage} alt="" className="center"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Homse;
