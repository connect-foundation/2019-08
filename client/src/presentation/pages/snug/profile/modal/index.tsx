import React from "react";
import styled from "styled-components";
import { ModalHeader } from "./modal-header";
import { ModalBody } from "./modal-body";
import { Profile } from "core/entity/profile";

const BlackBackground = styled.div`
  position: fixed;
  z-index: 7;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ theme }) => theme.snugBackGround};
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  height: auto;
  background-color: ${({ theme }) => theme.snug};
  margin: 10% auto;
  border: 1px solid black;
  border-radius: 1rem;
  width: 40%;
  box-sizing: border-box;
`;

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
