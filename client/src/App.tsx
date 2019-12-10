import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Home } from "./presentation/pages/home/index";
import { Snug } from "./presentation/pages/snug/index";
import { RegisterSnug } from "./presentation/pages/register-snug";
import { RegisterUser } from "./presentation/pages/register-user/index";
import { InviteUsers } from "presentation/pages/invite-users";
import { Application } from "./context.instance";
import { createGlobalStyle } from "styled-components";
import socketIO from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

const GlobalStyle = createGlobalStyle`
    @import url(https://fonts.googleapis.com/css?family=Nanum+Gothic:regular,700,800);
    body{
        padding: 0;
        margin: 0;
        font-family: "Nanum Gothic",sans-serif;
    }
    #root{
      width:100vw;
      height:100vh;
    }
    a {
      text-decoration: none;
    }
`;

const App: React.FC = () => {
  const socket = socketIO(process.env.REACT_APP_SOCKET_SERVER_HOST!);
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
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
        path="/register-user"
        component={(props: any) => (
          <RegisterUser {...props} Application={Application} />
        )}
      ></Route>
      <Route
        exact
        path="/snug"
        component={(props: any) => (
          <Snug {...props} Application={Application} socket={socket}></Snug>
        )}
      />
      <Route
        exact
        path="/snug/:channelId"
        component={(props: any) => (
          <Snug {...props} Application={Application} socket={socket}></Snug>
        )}
      ></Route>
      <Route
        exact
        path="/invite-users/:snugId"
        component={(props: any) => (
          <InviteUsers {...props} Application={Application} />
        )}
      ></Route>
    </BrowserRouter>
  );
};

export default App;
