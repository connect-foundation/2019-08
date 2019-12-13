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
      <Header />
      <ImageWrapper>
        <Thumbnail />
      </ImageWrapper>
      <Buttons toggleModal={toggleModal} />
      <StatusSection
        currentProfile={currentProfile}
        toggleModal={toggleModal}
      />
    </Wrapper>
  );
};
