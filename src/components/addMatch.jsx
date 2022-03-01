import React, { Component } from "react";
import { AuthContext } from "../contexts/auth";
import splitBillService from "../services/SplitBillService";

class AddMatch extends Component {
  static contextType = AuthContext;

  state = {
    matchName: "",
    errors: [],
    apiError: null,
  };

  handleChange = (e) => {
    const matchName = { ...this.state.matchName };
    matchName[e.currentTarget.name] = e.currentTarget.value;
    this.setState(matchName);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      await splitBillService.addMatch({
        name: this.state.matchName,
      });
    } catch (err) {
      this.setState({
        apiError: "somthing went wrong- try filling all the fileds",
      });
      console.log(err);
      return;
    }
    console.log(this.state.matchName);
    this.props.setStateOfMatches();
    this.resetFileds();
  };

  validate = () => {
    const errors = {};
    if (this.state.matchName.trim() === "") {
      errors.matchName = "Name is requierd.";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  resetFileds = () => {
    const fileds = this.state;
    fileds.matchName = "";
    this.setState({
      fileds,
    });
  };

  render() {
    return (
      <form
        className="border border-dark border-rounded bg-info p-3"
        onSubmit={this.handleSubmit}
      >
        <div className="form-inline">
          <div className="form-control-md p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Match name"
              value={this.state.matchName}
              onChange={this.handleChange}
              id="matchName"
              name="matchName"
            />
            {this.state.errors.matchName && (
              <div className="alert alert-danger mt-2 p-0">
                {this.state.errors.matchName}
              </div>
            )}
          </div>
          <div className="form-match p-2 ">
            <button className="btn  btn-secondary">Create new match</button>
          </div>
        </div>
        {this.state.apiError && (
          <div className="alert alert-danger">
            <pre>
              <code>{this.state.apiError}</code>
            </pre>
          </div>
        )}
      </form>
    );
  }
}

export default AddMatch;
