import React, { Component } from "react";
import { AuthContext } from "./../contexts/auth";
import splitBillService from "../services/SplitBillService";

class AddGroup extends Component {
  static contextType = AuthContext;

  state = {
    groupName: "",
    errors: [],
    apiError: null,
  };

  handleChange = (e) => {
    const groupName = { ...this.state.groupName };
    groupName[e.currentTarget.name] = e.currentTarget.value;
    this.setState(groupName);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      const { data } = await splitBillService.addGroup({
        name: this.state.groupName,
      });
      // add new group to navbar at to gruops
    } catch (err) {
      this.setState({
        apiError: { page: "somthing went wrong- try filling all the fileds" },
      });
      console.log(err);
      return;
    }
    console.log(this.state.groupName);
    this.props.setStateOfGroups();
    this.resetFileds();
  };

  validate = () => {
    const errors = {};
    if (this.state.groupName.trim() === "") {
      errors.groupName = "Name is requierd.";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  resetFileds = () => {
    const fileds = this.state;
    fileds.groupName = "";
    this.setState({
      fileds,
    });
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
              className="form-control"
              placeholder="Group name"
              value={this.state.groupName}
              onChange={this.handleChange}
              id="groupName"
              name="groupName"
            />
            {this.state.errors.groupName && (
              <div className="alert alert-danger mt-2 p-0">
                {this.state.errors.groupName}
              </div>
            )}
          </div>
          <div className="form-group p-2 ">
            <button className="btn  btn-secondary">Create new group</button>
          </div>
        </div>
        {this.state.apiError && (
          <div class="alert alert-danger">
            <pre>
              <code>{this.state.apiError}</code>
            </pre>
          </div>
        )}
      </form>
    );
  }
}

export default AddGroup;
