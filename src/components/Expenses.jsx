import React, { Component } from "react";
import splitBillService from "../services/SplitBillService";
import AddExpence from "./addExpense";



class Expenses extends Component {

	state = {
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
	// loadGroup() {
	// 	const group = getGroup(this.props.match.params.groupId);
	// 	this.setState({ group, expenses: group.expenses });
	// }
	handleDelete = (expense) => {
		const expenses = this.state.expenses.filter((e) => e._id !== expense._id);
		this.setState({ expenses });
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
	//finish the function :)
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

	render() {
		return (
			<div className="container">
				{" "}
				<div className="row">
					<table className="table">
						<thead>
							<tr>
								<th>Title</th>
								<th>Date</th>
								<th>$</th>
								<th>Category</th>
								<th>User</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{this.state.expenses.map((expense) => (
								<tr key={expense._id}>
									<td>{expense.title}</td>
									<td>{new Date(expense.date).toLocaleDateString()}</td>
									<td>{expense.sum}</td>
									<td>{expense.category.name}</td>
									<td>{expense.user.name}</td>
									<td>
										<button
											onClick={() => this.handleDelete(expense)}
											className="btn btn-danger btn-sm"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="row mb-3">
					<AddExpence />
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
									<td>{user.user}</td>
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

export default Expenses;
