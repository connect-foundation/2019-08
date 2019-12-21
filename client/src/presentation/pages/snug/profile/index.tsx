import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { Header } from "./header";
import { Thumbnail } from "./thumbnail";
import { Buttons } from "./buttons";
import { StatusSection } from "./status";
import { Modal } from "./modal";
import { Profile } from "core/entity/profile";
import { globalApplication } from "contexts/application-context";
import { ChannelRouteComponentType } from "prop-types/channel-match-type";
import Axios from "axios";

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.snug};
  box-sizing: border-box;
  border-left: 0.5px ${({ theme }) => theme.snugBorderColor} solid;
  height: 100%;
  width: 0px;
  min-width: 0px;
  overflow-y: scroll;

  &::-webkit-scrollbar-thumb {
    background: #1d8fc0;
    opacity: 0.4;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
  }
  transition: 400ms;
  ${(props: WrapperPropTypes) => {
    if (props.toggleProfile)
      return css`
        width: 400px;
        min-width: 400px;
        max-width: 400px;
        &::-webkit-scrollbar {
          width: 4px;
        }
      `;
    return css`
      width: 0px;
      &::-webkit-scrollbar {
        width: 0px;
      }
    `;
  }};
`;

const ImageWrapper = styled.section`
  min-width: 400px;
  max-width: 400px;
  max-height: 40%;
  text-align: center;
`;

interface WrapperPropTypes {
  toggleProfile: boolean;
}

interface PropTypes extends ChannelRouteComponentType {
  toggleProfile?: boolean;
}

export const ProfileSection: React.FC<PropTypes> = props => {
  const application = useContext(globalApplication);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile>({} as Profile);
  const { snugId } = props.match.params;

  useEffect(() => {
    if (!snugId) return;
    const source = Axios.CancelToken.source();

    const requestProfile = async () => {
      const profile = await application.services.profileService.getProfile(
        parseInt(snugId),
        source.token
      );
      if (!profile) return profile;
      setCurrentProfile(profile);
    };

    requestProfile();

    return function cleanup() {
      source.cancel();
    };
  }, [application.services.profileService, snugId]);

  const toggleModal = () => {
    setModalDisplay(!modalDisplay);
  };

  const updateProfile = (profile: Profile) => {
    setCurrentProfile(profile);
  };

  return (
    <Wrapper toggleProfile={props.toggleProfile!}>
      {modalDisplay && (
        <Modal
          toggleModal={toggleModal}
          updateProfile={updateProfile}
          currentProfile={currentProfile}
        />
      )}
      <Header />
      <ImageWrapper>
        <Thumbnail thumbnail={currentProfile.thumbnail} />
      </ImageWrapper>
      <Buttons toggleModal={toggleModal} />
      <StatusSection
        currentProfile={currentProfile}
        toggleModal={toggleModal}
      />
    </Wrapper>
  );
};
