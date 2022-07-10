import React from "react";
import Home from "./Pages/Home";
import Starred from "./Pages/Starred";
import Show from "./Pages/Show";

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
      <Route exact path="/show/:id">
        <Show />
      </Route>
      <Route>
        <div>Page Not found</div>
      </Route>
    </Switch>
  );
}

export default App;
