import React from "react";
import Navs from "./components/Navs";
import Home from "./Pages/Home";
import Starred from "./Pages/Starred";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navs />
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
    </div>
  );
}

export default App;
