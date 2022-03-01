import React, { Component } from "react";
import { AuthContext } from "./../contexts/auth";
import splitBillService from "../services/SplitBillService";

class AddExpence extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.props);
  }
  state = {
    title: "",
    sum: "",
    category: "",
    date: 0,
    errors: [],
    apiError: null,
  };

  handleChange = (e) => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({ [key]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { matchId, onAddExpense } = this.props;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      //call server
      const { data: expense } = await splitBillService.addExpense(
        matchId,
        this.state
      );
      onAddExpense(expense);
    } catch (err) {
      this.setState({
        apiError: "somthing went wrong- try filling all the fileds",
      });
      console.log(err);
      return;
    }
    this.resetFileds();
  };

  validate = () => {
    const errors = {};
    const { title, sum, category } = this.state;
    if (title.trim() === "") {
      errors.title = "Name is requierd.";
    }
    if (sum.trim() === "") {
      errors.sum = "Sum must be a Number bigger then 0.";
    }
    if (category.trim() === "") {
      errors.category = "Category is requierd.";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  resetFileds = () => {
    const expensesFileds = { ...this.state };
    expensesFileds.title = "";
    expensesFileds.sum = "";
    expensesFileds.category = "";
    expensesFileds.date = 0;
    this.setState({
      ...expensesFileds,
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="card bg-info w-100">
        <form
          // className="border border-dark rounded bg-info w-100"
          onSubmit={this.handleSubmit}
        >
          <div className="form-inline">
            <div className="form-control-md p-2">
              <input
                type="text"
                className=" -control"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleChange}
                id="title"
                name="title"
              />
              {errors.title && (
                <div className="alert alert-danger mt-2 p-0">
                  {errors.title}
                </div>
              )}
            </div>
            <div className="form-control-md p-2">
              <input
                type="text"
                className="Sum"
                placeholder="$"
                value={this.state.sum}
                onChange={this.handleChange}
                id="sum"
                name="sum"
              />
              {errors.sum && (
                <div className="alert alert-danger mt-2 p-0">{errors.sum}</div>
              )}
            </div>
            <div className="form-control-md p-2">
              <select
                className="custom-select my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                value={this.state.category}
                onChange={this.handleChange}
                name="category"
              >
                <option>Category...</option>
                <option>Groceries</option>
                <option>Bills</option>
                <option>Others</option>
              </select>
              {errors.category && (
                <div className="alert alert-danger mt-2 p-0">
                  {errors.category}
                </div>
              )}
            </div>
            <div className="form-control-md p-2">
              <input
                type="date"
                className="form-control"
                value={this.state.date}
                onChange={this.handleChange}
                name="date"
              />
            </div>
            <div className="form-match p-2 ">
              <button className="btn  btn-secondary -sm">Add expense</button>
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
      </div>
    );
  }
}

export default AddExpence;
