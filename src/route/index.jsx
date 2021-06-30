import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "../pages/dashBoard";

// import Farm from "../pages/farm";
import SignIn from "../pages/SignIn";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Farm} /> */}
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/" component={SignIn} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
