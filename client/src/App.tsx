import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Home } from "./presentation/pages/home/index";
import { Snug } from "./presentation/pages/snug/index";
import { RegisterSnug } from "./presentation/pages/register-snug/index";
import { Application } from "./context.instance";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
        padding: 0;
        margin: 0;
        background:yellow;
    }
    #root{
      width:100vw;
      height:100vh;
    }
`;

const App: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Switch>
        <Route
          exact
          path="/"
          component={(props: any) => (
            <Home {...props} Application={Application} />
          )}
        ></Route>
        <Route
          exact
          path="/register-snug"
          component={(props: any) => (
            <RegisterSnug {...props} Application={Application} />
          )}
        ></Route>
        <Route
          exact
          path="/app"
          component={(props: any) => (
            <Snug {...props} Application={Application} />
          )}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
