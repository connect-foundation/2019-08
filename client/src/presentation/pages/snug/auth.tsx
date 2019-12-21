import React, { useState, useEffect, useContext, Fragment } from "react";
import styled from "styled-components";
import Snug from "presentation/pages/snug";
import Loader from "react-loader-spinner";
import { AppChannelMatchProps } from "prop-types/match-extends-types";
import { Profile } from "core/entity/profile";
import { globalSocket } from "contexts/socket-context";
import Axios from "axios";

export const Auth: React.FC<AppChannelMatchProps> = props => {
  const { Application, match } = props;
  const { snugSocket } = useContext(globalSocket);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (!match.params.snugId) return;
    const source = Axios.CancelToken.source();

    let profile: Profile = {};
    const getProfileToken = async () => {
      profile = await Application.services.profileService.getProfile(
        Number(match.params.snugId),
        source.token
      );

      if (profile && profile.id && profile.id > 0) {
        snugSocket.emit("enterSnug", profile.id);
        setAuth(true);
      } else {
        window.location.assign("/error");
      }
    };

    getProfileToken();

    return function cleanup() {
      snugSocket.emit("leaveSnug", profile.id!);
      source.cancel();
    };
  }, [match.params.snugId, Application.services.profileService, snugSocket]);

  return (
    <Fragment>
      {auth ? (
        <Snug {...props} Application={Application} />
      ) : (
        <Center>
          <Loader type="Watch" color="#fff" height={100} width={100} />
        </Center>
      )}
    </Fragment>
  );
};

const Center = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
