import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { AuthContext } from "../contexts/auth";
import splitBillService from "../services/SplitBillService";
import AddExpence from "./addExpense";

class Expenses extends Component {
  static contextType = AuthContext;
  state = {
    name: "",
    expenses: null,
  };

  inviteLink() {
    return window.location.origin + "/join/" + this.props.match.params.groupId;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.match.params.groupId !== this.props.match.params.groupId) {
    //   this.loadGroup();
    // }
  }
  async componentDidMount() {
    const { groupId } = this.props.match.params;
    const { data } = await splitBillService.groupById(groupId);
    this.setState({ ...data });
    console.log(data);
    console.log(this.context.currentUser);
  }

  handleDelete = (expense) => {
    const { groupId } = this.props.match.params;
    const expenses = this.state.expenses.filter((e) => e._id !== expense._id);
    this.setState({ expenses });
    console.log("delete");
    splitBillService.deleteExpense(groupId, expense._id);
  };

  userSum = (user) => {
    const userExpenses = this.state.expenses.filter(
      (e) => e.user._id === user._id
    );
    // arggretated obj, current item
    const total = userExpenses.reduce((sum, exp) => {
      return sum + exp.sum;
    }, 0);
    return total.toFixed(2);
  };
  userOwe = (user) => {
    const expenses = this.state.expenses;
    const userNum = this.state.members.length;
    //sum of all expenses
    const total = expenses.reduce((sum, exp) => {
      return sum + exp.sum;
    }, 0);

    const perUser = total / userNum;

    const final = perUser - this.userSum(user);
    return final >= 0
      ? "Member owes the group: " + final + "$"
      : "Group owes member: " + final * -1 + "$";
  };

  onAddExpense = (expense) => {
    const expenses = [...this.state.expenses, expense];
    this.setState({ expenses });
  };

  render() {
    //if there are no expenses:
    if (this.state.expenses === null) {
      return <p>loading...</p>;
    }
    const { groupId } = this.props.match.params;
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h1 className="text-center flex-fill">{this.state.name}</h1>
            <div>
              <button
                className="btn btn-info"
                onClick={() =>
                  window.navigator.clipboard.writeText(this.inviteLink())
                }
              >
                <FontAwesomeIcon icon={faCopy} /> Copy Invite Link
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.expenses.length === 0 && (
            <div className="col-12">
              <h2 className="text-center">
                There are no expenses for this group
              </h2>
            </div>
          )}
          {this.state.expenses.map((expense) => (
            <div
              className="col-12 col-sm-6 cold-md-4 col-lg-3 my-2"
              key={expense._id}
            >
              <div className="card border-info rounded w-100">
                <div className="card-header">{expense.title}</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    {"Date: "}
                    {new Date(expense.date).toLocaleDateString()}
                  </li>
                  <li className="list-group-item">
                    {"Sum: "}
                    {expense.sum}
                  </li>
                  <li className="list-group-item">
                    {"Category: "}
                    {expense.category}
                  </li>
                  <li className="list-group-item">
                    {"User name: "}
                    {expense.user.name}
                  </li>
                  {expense.user._id === this.context.currentUser.userId && (
                    <li
                      onClick={() => this.handleDelete(expense)}
                      className="btn btn-danger btn-sm m-2"
                    >
                      Delete
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <AddExpence groupId={groupId} onAddExpense={this.onAddExpense} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2>
              <strong>Expenses summary</strong>
            </h2>
          </div>
          {this.state.members?.map((user) => (
            <div className="col-12 mb-3" key={user._id}>
              <div className="card w-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                    {"Spend " + this.userSum(user) + "$"}
                  </p>
                  <p className="card-text">{this.userOwe(user)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Expenses;
