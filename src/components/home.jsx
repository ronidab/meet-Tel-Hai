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
					<p className="text-center">
						{/* <pre>{JSON.stringify(this.context.currentUser, null, 2)}</pre> */}
						Create a group, call your friends, enter your expenses and we
						will do the rest for you
					</p>
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

			</div>
		);
	}
}

export default Homse;
