import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import AddGroup from "./addGroup";
import splitBillService from "../services/SplitBillService";

class Groups extends Component {
  static contextType = AuthContext;
  state = {
    groups: [],
  };
  async componentDidMount() {
    try {
      const { data } = await splitBillService.allGroups();
      this.setState({ groups: data });
    } catch (err) {
      console.error(err);
    }
  }

  setStateOfGroups = () => {
    console.log("remounting");
    this.componentDidMount();
  };

  render() {
    if (this.state.groups.length === 0) {
      return (
        <div className="container">
          <h2 className="text-center">
            {" "}
            You are not apart of any group, creat a new group or ask you'r
            friends to send you a link{" "}
          </h2>
          <AddGroup setStateOfGroups={this.setStateOfGroups} />;
        </div>
      );
    } else {
      return (
        <div className="container">
          <h3>My groups:</h3>
          {this.state.groups.map((group, i) => (
            <div className="card-group" key={i}>
              <div className="card p-2 m-2">
                <Link
                  to={`expenses/${group._id}`}
                  className="btn btn-outline-info"
                >
                  {group.name}
                </Link>
                <pre>
                  <code>{JSON.stringify(group, null, 2)}</code>
                </pre>
              </div>
            </div>
          ))}
          <AddGroup setStateOfGroups={this.setStateOfGroups} />
        </div>
      );
    }
  }
}

export default Groups;
