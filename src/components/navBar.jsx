import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./../contexts/auth";

class NavBar extends Component {
	static contextType = AuthContext;

	handleLogOut = () => {
		this.context.signout();
	};

	render() {
		return (
			<nav className="navbar navbar-expand-sm navbar-dark text-light bg-dark">
				<div className="container">
					<NavLink className="navbar-brand" to="/">
						SplitBills
					</NavLink>
					{this.context.currentUser && (
						<NavLink className="navbar-brand" to="/groups">
							My groups
						</NavLink>
					)}
					{this.context.currentUser && (
						<div className="d-flex ml-auto">
							<span className="navbar-text mx-2">
								Hello {this.context.currentUser.userName}
							</span>
							<div>
								<button
									className="btn btn-dark my-2 my-sm-0 "
									onClick={this.handleLogOut} //add redirect to home when logout
								>
									sign out
								</button>
							</div>
						</div>
					)}
				</div>
			</nav>
		);
	}
}

export default NavBar;
