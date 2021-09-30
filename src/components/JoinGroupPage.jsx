import React, { Component } from "react";
import SplitBillService from "../services/SplitBillService";
import { AuthContext } from "./../contexts/auth";

class JoinGroupPage extends Component {
  static contextType = AuthContext;
  state = {
    group: null,
    apiError: null,
  };
  async componentDidMount() {
    const { groupId } = this.props.match.params;
    console.log({ groupId });
    const { data: group } = await SplitBillService.groupById(groupId);
    // check if user is allready in group
    this.setState({ group });
  }
  handleJoinGroup = async () => {
    const { groupId } = this.props.match.params;
    try {
      //call server
      await SplitBillService.joinGroup(groupId);
    } catch (err) {
      this.setState({
        apiError: "somthing went wrong- try filling all the fileds",
      });
      return;
    }
    // redirect to group page
    this.props.history.push("/expenses/" + groupId);
  };
  render() {
    return (
      <div className="row h-100 bg-info">
        <div className="col text-center">
          Would you like to join {this.state?.group?.name} ?
          <button
            className="btn btn-secondary m-3"
            onClick={this.handleJoinGroup}
          >
            {" "}
            Join Group{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default JoinGroupPage;
