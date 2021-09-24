import React, { Component } from "react";
import Expenses from "./expenses";
import { getGroups, groups } from "./../services/fakeGroups";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./../contexts/auth";

class NavBar extends Component {
	static contextType = AuthContext;
	state = {
		groups: getGroups(),
	};
	render() {
		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
				<a className="navbar-brand" href="#">
					SplitBills
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarTogglerDemo02"
					aria-controls="navbarTogglerDemo02"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" to="/" activeClassName="active">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								to="/signin"
								activeClassName="active"
							>
								username/signin
							</NavLink>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Groups
							</a>
							<div
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								{this.state.groups.map((group) => (
									<Link
										key={group._id}
										className="dropdown-item"
										to={`/expenses/${group._id}`}
									>
										{group.name}
									</Link>
								))}
								<Link className="dropdown-item" to="groups">
									All groups
								</Link>
							</div>
						</li>
						{this.context.currentUser && (
							<>
								<li>
									<span className="navbar-text mx-2">
										{" "}
										Hello {this.context.currentUser.userName}
									</span>
								</li>

								<li>
									<div>
										<button
											className="btn btn-dark my-2 my-sm-0 "
											onClick={() => this.context.signout()}
										>
											sign out
										</button>
									</div>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

export default NavBar;
