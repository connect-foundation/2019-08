import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Snug } from "./presentation/pages/snug";
import { Application } from "./context.instance";
const App: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={(props: any) => (
            <Snug {...props} Application={Application}></Snug>
          )}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
