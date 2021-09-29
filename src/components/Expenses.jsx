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
      : "Group oues member: " + final * -1 + "$";
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
    if (this.state.expenses.length === 0) {
      return (
        <div className="container">
          <h1 className="text-center">{this.state.name}</h1>

          <h2 className="text-center">There are no expenses for this group</h2>
          <AddExpence groupId={groupId} onAddExpense={this.onAddExpense} />
          {/* invite link */}
          <div className="text-center">
            <button
              type="button"
              className="btn btn-info mt-2"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Invite friends to join the group
            </button>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Send your friends the link:
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {" "}
                  <a
                    href={window.location.origin + "/join/" + groupId}
                    class="stretched-link"
                  >
                    {window.location.origin + "/join/" + groupId}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1 className="text-center">{this.state.name}</h1>
          {/* invite link */}
          <div className="text-center">
            <button
              type="button"
              className="btn btn-info mt-2"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Invite friends to join the group
            </button>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Send your friends the link:
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {" "}
                  <a
                    href={window.location.origin + "/join/" + groupId}
                    class="stretched-link"
                  >
                    {window.location.origin + "/join/" + groupId}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {this.state.expenses.map((expense) => (
              <div className="card border-info m-2 w-20" key={expense._id}>
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
            ))}
          </div>
          <div className="row mb-3">
            <AddExpence groupId={groupId} onAddExpense={this.onAddExpense} />
          </div>
          <div className="row">
            <h2>
              <strong>Expenses summary</strong>
            </h2>
          </div>
          {this.state.members?.map((user) => (
            <div class="card w-90 m-1 border-info" key={user._id}>
              <div class="card-body">
                <h5 class="card-title">{user.name}</h5>
                <p class="card-text">{"Spend " + this.userSum(user) + "$"}</p>
                <p class="card-text">{this.userOwe(user)}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Expenses;
