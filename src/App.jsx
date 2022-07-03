import React from "react";
import Home from "./Pages/Home";
import Starred from "./Pages/Starred";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Home />
      </Route>
      <Route exact path="/starred">
        <Starred />
      </Route>
      <Route>
        <div>Page Not found</div>
      </Route>
    </Switch>
  );
}

export default App;
