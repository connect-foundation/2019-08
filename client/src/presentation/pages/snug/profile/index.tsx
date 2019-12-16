import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import { Header } from "./header";
import { Thumbnail } from "./thumbnail";
import { Buttons } from "./buttons";
import { StatusSection } from "./status";
import { Modal } from "./modal";
import { Profile } from "core/entity/profile";
import { globalApplication } from "contexts/application-context";
import { ChannelRouteComponentType } from "prop-types/channel-match-type";

const Wrapper = styled.section`
  color: white;
  background-color: white;
  height: 100%;
  width: 0px;
  min-width: 0px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
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
        width: 0px;
        min-width: 400px;
      `;
    return css`
      width: 0px;
    `;
  }};
`;

const ImageWrapper = styled.section`
  max-width: 400px;
  max-height: 40%;
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
    const requestProfile = async () => {
      const profile = await application.services.profileService.getProfile(
        parseInt(snugId)
      );
      if (!profile) return;
      setCurrentProfile(profile);
    };
    requestProfile();
  }, []);

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
      <FixedBox>
        <Header />
        <ImageWrapper>
          <Thumbnail />
        </ImageWrapper>
        <Buttons toggleModal={toggleModal} />
        <StatusSection currentProfile={currentProfile} />
      </FixedBox>
    </Wrapper>
  );
};

const FixedBox = styled.section`
  width: 700px;
  height: auto;
`;
