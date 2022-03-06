import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import AddMatch from "./addMatch";
import meetTelHaiService from "../services/meetTelHaiService";

class Matches extends Component {
  static contextType = AuthContext;
  state = {
    match: null,
  };
  async componentDidMount() {
    try {
      console.log("start here?")
      const { data } = await meetTelHaiService.allMatches();
      this.setState({ match: data });
    } catch (err) {
      console.error(err);
    }
  }

  setStateOfMatches = () => {
    console.log("remounting");
    this.componentDidMount();
  };

  render() {
    if (this.state.match === null) {
      console.log("first if")
      return <p>loading...</p>;
    }
    console.log(this.state.match.length)

    if (this.state.match.length === 0) {
      console.log("second if")
      return (
        <div className="container bg-danger">
          <h2 className="text-center">
            {" "}
            You are not apart of any match, creat a new match or ask you'r
            friends to send you a link{" "}
          </h2>
          <AddMatch setStateOfMatches={this.setStateOfMatches} />;
        </div>
      );
    } else {
      console.log("else")
      return (
        <div className="row h-100 bg-danger">
        <div className="container">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h4 className="text-center">You still don't have any match
          <br></br>
           Click on "Meet" to make some</h4>
          {/* {this.state.match.map((match, i) => (
            <div className="card p-2 m-2 border-light border-rounded">
              <Link
                to={`msgs/${match._id}`}
                className="btn btn-outline-info"
              >
                {match.name}
              </Link>
              <pre></pre>
            </div>
          ))} */}
          {/* <AddMatch setStateOfMatches={this.setStateOfMatches} /> */}
        </div>
        </div>
      );
    }
  }
}

export default Matches;
