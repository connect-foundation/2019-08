import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Home } from "./presentation/pages/home/index";
import { Auth } from "./presentation/pages/snug/auth";
import { RegisterSnug } from "./presentation/pages/register-snug";
import { RegisterUser } from "./presentation/pages/register-user/index";
import { InviteUsers } from "presentation/pages/invite-users";
import { ErrorPage } from "presentation/pages/error";
import { Application } from "./context.instance";
import { createGlobalStyle } from "styled-components";
import dotenv from "dotenv";
import { PathParameterContextProvider } from "contexts/path-parameter-context";
import { ApplicationContextProvider } from "contexts/application-context";
import { SocketContextProvider } from "contexts/socket-context";

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
      max-width: 100vw;
      max-height: 100vh;
      min-width: 1200px;
    }
    a {color: #fff; text-decoration: none; outline: none}

    a:hover, a:active {text-decoration: none; color:#fff;}

    pre {
      font-family : initial;
      white-space: pre;
    }
`;

const App: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <SocketContextProvider>
        <BrowserRouter>
          <PathParameterContextProvider>
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
                path="/register-user"
                component={(props: any) => (
                  <RegisterUser {...props} Application={Application} />
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
                path="/invite-users/:snugId"
                component={(props: any) => (
                  <InviteUsers {...props} Application={Application} />
                )}
              ></Route>
              <Route
                exact
                path="/snug/:snugId/channel/:channelId"
                component={(props: any) => (
                  <Auth {...props} Application={Application}></Auth>
                )}
              ></Route>
              <Route
                component={(props: any) => (
                  <ErrorPage {...props} Application={Application}></ErrorPage>
                )}
              ></Route>
            </Switch>
          </PathParameterContextProvider>
        </BrowserRouter>
      </SocketContextProvider>
    </ApplicationContextProvider>
  );
};

export default App;
