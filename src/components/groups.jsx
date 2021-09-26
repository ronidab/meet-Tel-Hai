import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { getGroups } from "./../services/fakeGroups";
import { getCurrUser } from "./../services/fakeUsers";
import AddGroup from "./addGroup";
import axios from "axios";

class Groups extends Component {
  static contextType = AuthContext;
  state = {
    groups: [],
  };
  async componentDidMount() {
    console.log("groups mounted");
    if (this.context) {
      const { data } = await axios.get("/groups");
      this.setState({ groups: data });
    }
  }
  onAddGroup() {}
  render() {
    return (
      <div className="container">
        <h>My groups:</h>
        {this.state.groups.map((group) => (
          <div className="card-group">
            <div className="card p-2 m-2">
              <Link
                to={`expenses/${group._id}`}
                className="btn btn-outline-info"
              >
                {group.name}
              </Link>
            </div>
          </div>
        ))}
        <AddGroup />
      </div>
    );
  }
}

export default Groups;
