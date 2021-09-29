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
		console.log({ groupId });
		const { data: group } = await SplitBillService.groupById(groupId);
		// check if use is allready in group
		this.setState({ group });
	}
	handleJoinGroup = async () => {
		const { groupId } = this.props.match.params;
		const { data } = await SplitBillService.joinGroup(groupId);
		// redirect to group page

	};
	render() {
		return (
			<div className="row h-100 bg-info">
				<div className="col text-center">
					Would you like to join {this.state?.group?.name} ?
					<button
						className="btn btn-secondary m-3"
						onClick={this.handleJoinGroup}
					>
						{" "}
						Join Group{" "}
					</button>
				</div>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#273036"
						fill-opacity="1"
						d="M0,32L12.6,42.7C25.3,53,51,75,76,112C101.1,149,126,203,152,234.7C176.8,267,202,277,227,261.3C252.6,245,278,203,303,197.3C328.4,192,354,224,379,213.3C404.2,203,429,149,455,144C480,139,505,181,531,202.7C555.8,224,581,224,606,208C631.6,192,657,160,682,170.7C707.4,181,733,235,758,261.3C783.2,288,808,288,834,282.7C858.9,277,884,267,909,266.7C934.7,267,960,277,985,240C1010.5,203,1036,117,1061,117.3C1086.3,117,1112,203,1137,218.7C1162.1,235,1187,181,1213,144C1237.9,107,1263,85,1288,80C1313.7,75,1339,85,1364,96C1389.5,107,1415,117,1427,122.7L1440,128L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"
					></path>
				</svg>
			</div>
		);
	}
}

export default JoinGroupPage;
