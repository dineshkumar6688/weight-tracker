import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./Views/signin.js";
import Home from "./Views/home.js";

function App() {
	
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Signin}></Route>
          <Route exact path="/home" component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
