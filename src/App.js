import { Route, Switch } from "react-router-dom";
import "./App.css";
import Expenses from "./components/Expenses";
import Matches from "./components/matches";
import NavBar from "./components/navBar";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import ProtectedRoute from "./components/ProtectedRoute";
import JoinMatchPage from "./components/JoinMatchPage";

function App() {
	return (
		<main className="d-flex h-100 flex-column">
			<NavBar />
			<div className="col">
				<Switch>
					<Route exact path="/" component={Home} />
					<ProtectedRoute path="/matches" component={Matches} />
					<ProtectedRoute path="/expenses/:matchId" component={Expenses} />
					<ProtectedRoute path="/join/:matchId" component={JoinMatchPage} />
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Login} />
				</Switch>
			</div>
		</main>
	);
}

export default App;
