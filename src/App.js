import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Results from "./pages/Results";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import "./pages/styles/reset.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/results" exact component={Results} />
          <Route path="*" exact component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
