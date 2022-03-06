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
      console.log("here at matches component ")
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
      return <p>loading...</p>;
    }
    if (this.state.match.length === 0) {
      return (
        <div className="container">
          <h2 className="text-center">
            {" "}
            You are not apart of any match, creat a new match or ask you'r
            friends to send you a link{" "}
          </h2>
          <AddMatch setStateOfMatches={this.setStateOfMatches} />;
        </div>
      );
    } else {
      return (
        <div className="container">
          <h4 className="text-center">Choose a match or creat a new one:</h4>
          {this.state.match.map((match, i) => (
            <div className="card p-2 m-2 border-light border-rounded">
              <Link
                to={`expenses/${match._id}`}
                className="btn btn-outline-info"
              >
                {match.name}
              </Link>
              <pre></pre>
            </div>
          ))}
          <AddMatch setStateOfMatches={this.setStateOfMatches} />
        </div>
      );
    }
  }
}

export default Matches;
