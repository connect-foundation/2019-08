import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Snug } from "./presentation/pages/snug/index";
import { Application } from "./context.instance";
import { createGlobalStyle } from "styled-components";
import socketIO from "socket.io";
import dotenv from "dotenv";
dotenv.config();

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
      <Route
        exact
        path="/"
        component={(props: any) => (
          <Snug {...props} Application={Application}></Snug>
        )}
      ></Route>
      <Route
        exact
        path="/:channelId"
        component={(props: any) => (
          <Snug {...props} Application={Application}></Snug>
        )}
      ></Route>
    </BrowserRouter>
  );
};

export default App;
