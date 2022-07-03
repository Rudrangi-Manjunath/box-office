import React from "react";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route exact={true} path="/">
        This is home page
      </Route>
      <Route exact path="/starred">
        This is starred page
      </Route>
      <Route>404 page not found</Route>
    </Switch>
  );
}

export default App;
