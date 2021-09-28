import React, { Component } from "react";
import splitBillService from "../services/SplitBillService";
import AddExpence from "./addExpense";

class Expenses extends Component {
  state = {
    name: "",
    expenses: [],
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.groupId !== this.props.match.params.groupId) {
      this.loadGroup();
    }
  }
  async componentDidMount() {
    const { groupId } = this.props.match.params;
    const { data } = await splitBillService.groupById(groupId);
    this.setState({ ...data });
  }

  handleDelete = (expense) => {
    const expenses = this.state.expenses.filter((e) => e._id !== expense._id);
    this.setState({ expenses });
    console.log("delete");
    splitBillService.deleteExpense(this.props.match.params.groupId, expense);
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

    return perUser - this.userSum(user);
  };

  setStateOfExpenses = () => {
    this.componentDidMount();
  };

  render() {
    const { groupId } = this.props.match.params;
    if (this.state.expenses.length === 0) {
      return (
        <div className="container">
          <h2 className="text-center">There are no expenses for this group</h2>
          <AddExpence
            groupId={groupId}
            setStateOfExpenses={this.setStateOfExpenses}
          />
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1 className="text-center">{this.state.name}</h1>
          <div className="row">
            {this.state.expenses.map((expense) => (
              <div class="card border-info m-2" key={expense._id}>
                <div class="card-header">{expense.title}</div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    {"Date: "}
                    {new Date(expense.date).toLocaleDateString()}
                  </li>
                  <li class="list-group-item">
                    {"Sum: "}
                    {expense.sum}
                  </li>
                  <li class="list-group-item">
                    {"Category: "}
                    {expense.category}
                  </li>
                  <li class="list-group-item">
                    {"User name: "}
                    {expense.user.name}
                  </li>
                  <li
                    class="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(expense)}
                    className="btn btn-danger btn-sm m-2"
                  >
                    Delete
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <div className="row mb-3">
            <AddExpence
              groupId={groupId}
              setStateOfExpenses={this.setStateOfExpenses}
            />
          </div>
          <div className="row">
            <h2>
              <strong>Expenses summary</strong>
            </h2>
          </div>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th>User name</th>
                  <th>Sum of expenses</th>
                  <th>Owe</th>
                </tr>
              </thead>
              <tbody>
                {this.state.members?.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{this.userSum(user)}</td>
                    <td>{this.userOwe(user)}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default Expenses;