import React, { Component } from "react";
import SplitBillService from "../services/SplitBillService";
import { AuthContext } from "./../contexts/auth";

class JoinMatchPage extends Component {
  static contextType = AuthContext;
  state = {
    match: null,
    apiError: null,
  };
  async componentDidMount() {
    const { matchId } = this.props.match.params;
    console.log({ matchId });
    const { data: match } = await SplitBillService.matchById(matchId);
    // check if user is allready in match
    this.setState({ match });
  }
  handleJoinMatch = async () => {
    const { matchId } = this.props.match.params;
    try {
      //call server
      await SplitBillService.joinMatch(matchId);
    } catch (err) {
      this.setState({
        apiError: "somthing went wrong- try filling all the fileds",
      });
      return;
    }
    // redirect to match page
    this.props.history.push("/expenses/" + matchId);
  };
  render() {
    return (
      <div className="row h-100 bg-info">
        <div className="col text-center">
          Would you like to join {this.state?.match?.name} ?
          <button
            className="btn btn-secondary m-3"
            onClick={this.handleJoinMatch}
          >
            {" "}
            Join Match{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default JoinMatchPage;
