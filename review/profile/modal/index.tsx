import React from "react";
import styled from "styled-components";
import { ModalHeader } from "./modal-header";
import { ModalBody } from "./modal-body";
import { Profile } from "core/entity/profile";

interface PropTypes {
  toggleModal(): any | void;
  updateProfile(profile: Profile): void;
  currentProfile: Profile;
}

export const Modal: React.FC<PropTypes> = ({
  toggleModal,
  updateProfile,
  currentProfile
}) => {
  return (
    <BlackBackground>
      <Wrapper>
        <ModalHeader onClick={toggleModal} />
        <ModalBody
          toggleModal={toggleModal}
          updateProfile={updateProfile}
          currentProfile={currentProfile}
        />
      </Wrapper>
    </BlackBackground>
  );
};
