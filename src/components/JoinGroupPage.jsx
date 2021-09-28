import React, { Component } from "react";
import SplitBillService from "../services/SplitBillService";
import { AuthContext } from "./../contexts/auth";

class JoinGroupPage extends Component {
	static contextType = AuthContext;
	state = {
		group: null,
	};
	async componentDidMount() {
		const { groupId } = this.props.match.params;
		console.log({ groupId })
		const { data: group } = await SplitBillService.groupById(groupId)
		// check if use is allready in group 
		this.setState({ group });
	}
	onJoinGroupClicked = async () => {
		const { groupId } = this.props.match.params
		const { data } = await SplitBillService.joinGroup(groupId);
		// redirect to group page
	}
	render() {
		return (
			<div className="row h-100 bg-info">
				<div className="col text-center">
					Would you like to join {this.state?.group?.name} ?
					<button className="btn btn-success" onClick={this.onJoinGroupClicked}> Join Group </button>
				</div>
			</div>
		);
	}
}

export default JoinGroupPage;
