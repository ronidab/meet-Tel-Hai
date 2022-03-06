import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

class ProtectedRoute extends React.Component {
	static contextType = AuthContext;
	render() {
		const { component: Component, ...restOfProps } = this.props;
		return (
			<Route
				{...restOfProps}
				render={(props) =>
					this.context.currentUser ? <Component {...props} /> : <Redirect to="/" />
				}
			/>
		);
	}
}

export default ProtectedRoute;