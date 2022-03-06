import { Route, Switch } from "react-router-dom";
import "./App.css";
import Msgs from "./components/Msgs";
import Matches from "./components/matches";
import NavBar from "./components/navBar";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import ProtectedRoute from "./components/ProtectedRoute";
import JoinMatchPage from "./components/JoinMatchPage";
import Meet from "./components/meet";

function App() {
	return (
		<main className="d-flex h-100 flex-column">
			<NavBar />
			<div className="col">
				<Switch>
					<Route exact path="/" component={Home} />
					<ProtectedRoute path="/meet" component={Meet} />
					<ProtectedRoute path="/matches" component={Matches} />
					<ProtectedRoute path="/msgs/:matchId" component={Msgs} />
					<ProtectedRoute path="/join/:matchId" component={JoinMatchPage} />
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Login} />
				</Switch>
			</div>
		</main>
	);
}

export default App;
