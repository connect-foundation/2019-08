import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Snug } from "./page/snug";
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
            <Snug {...props} Application={Application}></Snug>
          )}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
