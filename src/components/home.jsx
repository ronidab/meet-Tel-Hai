import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../contexts/auth";

class Homse extends Component {
	static contextType = AuthContext;
	state = {};
	render() {
		console.log(this.context);
		return (
			<div className="row h-100 bg-info">
				<div className="col p-3 container">
					<h1 className="text-dark text-center">SplitBills</h1>
					<h5 className="text-center">
						{/* <pre>{JSON.stringify(this.context.currentUser, null, 2)}</pre> */}
						Create a group, call your friends, enter your expenses and we will
						do the rest for you
					</h5>
					{!this.context.currentUser && (
						<div className="d-flex flex-column align-items-center w-100">
							<Link to="/login" className="btn col-3 btn-secondary my-2">
								Login
							</Link>
							<Link to="/signup" className="btn col-3 btn-secondary my-2">
								Register
							</Link>
						</div>
					)}
				</div>

				<svg className="align-self-end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#273036"
						fillOpacity="1"
						d="M0,0L12.6,37.3C25.3,75,51,149,76,192C101.1,235,126,245,152,224C176.8,203,202,149,227,112C252.6,75,278,53,303,37.3C328.4,21,354,11,379,58.7C404.2,107,429,213,455,224C480,235,505,149,531,112C555.8,75,581,85,606,101.3C631.6,117,657,139,682,160C707.4,181,733,203,758,213.3C783.2,224,808,224,834,192C858.9,160,884,96,909,90.7C934.7,85,960,139,985,154.7C1010.5,171,1036,149,1061,138.7C1086.3,128,1112,128,1137,122.7C1162.1,117,1187,107,1213,128C1237.9,149,1263,203,1288,213.3C1313.7,224,1339,192,1364,192C1389.5,192,1415,224,1427,240L1440,256L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"
					></path>
				</svg>



			</div>
		);
	}
}

export default Homse;
