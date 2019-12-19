import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Snug from "presentation/pages/snug";
import Loader from "react-loader-spinner";
import { AppChannelMatchProps } from "prop-types/match-extends-types";
import { Profile } from "core/entity/profile";
import Axios from "axios";

export const Auth: React.FC<AppChannelMatchProps> = props => {
  const { Application, match } = props;
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!match.params.snugId) return;
      const source = Axios.CancelToken.source();

      const getProfileToken = async () => {
        const profile: Profile = await Application.services.profileService.getProfile(
          Number(match.params.snugId),
          source.token
        );

        if (profile.id && profile.id > 0) {
          setAuth(true);
        } else {
          window.location.href = "/error";
        }
      };

      getProfileToken();

      return function cleanup() {
        source.cancel();
      };
    }, 1000);
  }, [match.params.snugId, Application.services.profileService]);

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
