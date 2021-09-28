import React, { Component } from "react";
import { AuthContext } from "../contexts/auth";
import splitBillService from "../services/SplitBillService";
import AddExpence from "./addExpense";

class Expenses extends Component {
	static contextType = AuthContext;
	state = {
		name: "",
		expenses: [],
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
		console.log(this.context.currentUser)
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

		return perUser - this.userSum(user);
	};

	onAddExpense = (expense) => {
		const expenses = [...this.state.expenses, expense];
		this.setState({ expenses });
	};

	render() {
		const { groupId } = this.props.match.params;
		if (this.state.expenses.length === 0) {
			return (
				<div className="container">
					<h1 className="text-center">{this.state.name}</h1>
					<p className="  text-center">
						<button
							className="btn btn-info"
							type="button"
							data-toggle="collapse"
							data-target="#collapseExample"
							aria-expanded="false"
							aria-controls="collapseExample"
						>
							Invite friends to join the group
						</button>
					</p>
					<div class="collapse" id="collapseExample">
						<div class="card card-body">
							Send your friends the link:
							<a
								href={window.location.origin + "/join/" + groupId}
								class="stretched-link"
							>
								{window.location.origin + "/join/" + groupId}
							</a>
						</div>
					</div>
					<h2 className="text-center">There are no expenses for this group</h2>
					<AddExpence groupId={groupId} onAddExpense={this.onAddExpense} />
				</div>
			);
		} else {
			return (
				<div className="container">
					<h1 className="text-center">{this.state.name}</h1>
					<p className="  text-center">
						<button
							className="btn btn-info"
							type="button"
							data-toggle="collapse"
							data-target="#collapseExample"
							aria-expanded="false"
							aria-controls="collapseExample"
						>
							Invite friends to join the group
						</button>
					</p>
					<div class="collapse" id="collapseExample">
						<div class="card card-body">
							Send your friends the link:
							<a
								href={window.location.origin + "/join/" + groupId}
								class="stretched-link"
							>
								{window.location.origin + "/join/" + groupId}
							</a>
						</div>
					</div>
					<div className="row">
						{this.state.expenses.map((expense) => (
							<div className="card border-info m-2" key={expense._id}>
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
