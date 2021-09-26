import React, { Component } from "react";
import { AuthContext } from "./../contexts/auth";

class AddGroup extends Component {
  static contextType = AuthContext;

  state = {
    groupName: "",
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await this.context.addGroup(this.state.groupName, this.props.value);
    } catch (err) {
      console.log(err);
    }
    // add the group to user groups. this.context.currentUser.userGroups;
  };

  render() {
    return (
      <form
        className="border border-dark bg-info p-3"
        onSubmit={this.handleSubmit}
      >
        <div className="form-inline">
          <div className="form-control-md p-2">
            <input
              type="text"
              class=" -control"
              placeholder="Group name"
              value={this.state.groupName}
              onChange={this.handleChange}
              className="form-control"
              id="groupName"
              name="groupName"
            />
          </div>
          <div className="form-group p-2 ">
            <button className="btn  btn-secondary">Create new group</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddGroup;
