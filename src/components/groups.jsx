import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getGroups } from "./../services/fakeGroups";
import { getCurrUser } from "./../services/fakeUsers";
import AddGroup from "./addGroup";

class Groups extends Component {
  state = {
    groups: getGroups(),
    currentUser: getCurrUser(),
  };
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
