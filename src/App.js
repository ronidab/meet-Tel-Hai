import { Route, Switch } from "react-router-dom";
import "./App.css";
import Expenses from "./components/Expenses";
import Groups from "./components/groups";
import NavBar from "./components/navBar";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import ProtectedRoute from "./components/ProtectedRoute";
import JoinGroupPage from "./components/JoinGroupPage";

function App() {
	return (
		<main className="d-flex h-100 flex-column">
			<NavBar />
			<div className="col">
				<Switch>
					<Route exact path="/" component={Home} />
					<ProtectedRoute path="/groups" component={Groups} />
					<ProtectedRoute path="/expenses/:groupId" component={Expenses} />
					<ProtectedRoute path="/join/:groupId" component={JoinGroupPage} />
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Login} />
				</Switch>
			</div>
		</main>
	);
}

export default App;
