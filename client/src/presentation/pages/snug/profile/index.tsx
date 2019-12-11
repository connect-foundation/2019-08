import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Header } from "./header";
import { Thumbnail } from "./thumbnail";
import { Buttons } from "./buttons";
import { StatusSection } from "./status";
import { Modal } from "./modal";
import { Profile } from "core/entity/profile";
import { globalApplication } from "contexts/application-context";

const Wrapper = styled.section`
  color: white;
  background-color: white;
  width: 700px;
  height: 100%;
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
`;

const ImageWrapper = styled.section`
  height: 40%;
`;

export const ProfileSection: React.FC = () => {
  const application = useContext(globalApplication);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile>({} as Profile);

  useEffect(() => {
    const requestProfile = async () => {
      const profile = await application.services.profileService.getProfile();
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
    <Wrapper>
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
      <StatusSection currentProfile={currentProfile} />
    </Wrapper>
  );
};
