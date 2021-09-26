import { Route, Switch } from "react-router-dom";
import "./App.css";
import Expenses from "./components/expenses";
import Groups from "./components/groups";
import NavBar from "./components/navBar";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";

function App() {
  return (
    <main className="d-flex h-100 flex-column">
      <NavBar />
      <div className="col">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/groups" component={Groups} />
          <Route path="/expenses/:groupId" component={Expenses} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
