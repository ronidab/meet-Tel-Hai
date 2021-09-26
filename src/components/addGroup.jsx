import React, { Component } from "react";
import { AuthContext } from "./../contexts/auth";
import splitBillService from "../services/SplitBillService";

class AddGroup extends Component {
	static contextType = AuthContext;

	state = {
		groupName: "",
	};

	handleChange = (e) => {
		const groupName = { ...this.state.groupName };
		groupName[e.currentTarget.name] = e.currentTarget.value;
		this.setState(groupName);
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await splitBillService.addGroup({ name: this.state.groupName });
			// add new group to navbar at to gruops
			this.props.onAddGroup(data);
		} catch (err) {
			console.log(err);
		}
		console.log(this.state.groupName);
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
