import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import {createBrowserHistory} from "history";
import {Home} from "./presentation/pages/home/index";
import {Snug} from "./presentation/pages/snug/index";
import {RegisterSnug} from "./presentation/pages/register-snug/index";
import {RegisterUser} from "./presentation/pages/register-user/index";
import {Application} from "./context.instance";
import {createGlobalStyle} from "styled-components";
import socketIO from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();
const GlobalStyle = createGlobalStyle`
    body{
        padding: 0;
        margin: 0;
    }
    #root{
      width:100vw;
      height:100vh;
    }
`;
const App: React.FC = () => {
  const history = createBrowserHistory();
  console.log(process.env.REACT_APP_SOCKET_SERVER_HOST!);
  const socket = socketIO(process.env.SOCKET_SERVER_HOST!);
  return (
          <BrowserRouter>
            <GlobalStyle></GlobalStyle>
            <Route
                    exact
                    path="/"
                    component={(props: any) => (
                            <Home {...props} Application={Application}/>
                    )}
            ></Route>
            <Route
                    exact
                    path="/register-snug"
                    component={(props: any) => (
                            <RegisterSnug {...props} Application={Application}/>
                    )}
            ></Route>
            <Route
                    exact
                    path="/register-user"
                    component={(props: any) => (
                            <RegisterUser {...props} Application={Application}/>
                    )}
            ></Route>
            <Route
                    exact
                    path="/snug/:channelId"
                    component={(props: any) => (
                            <Snug {...props} Application={Application} socket={socket}></Snug>
                    )}
            ></Route>
          </BrowserRouter>
  );
};
export default App;
