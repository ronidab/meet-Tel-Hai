import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import Expenses from "./components/expenses";
import Groups from "./components/groups";
import NavBar from "./components/navBar";
import Signin from "./components/signin";
import Login from "./components/login";
import Home from "./components/home";

function App() {
  return (
    <main className="container">
      <NavBar />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/groups" component={Groups} />
          <Route path="/expenses/:groupId" component={Expenses} />
          <Route path="/signin" component={Signin} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
