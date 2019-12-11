import React from "react";
import styled from "styled-components";
import { ModalHeader } from "./modal-header";
import { ModalBody } from "./modal-body";
import { Profile } from "core/entity/profile";

const BlackBackground = styled.section`
  position: fixed;
  z-index: 1;
  background-color: #ffffff;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: 0.9;
`;

const Wrapper = styled.section`
  position: fixed;
  z-index: 2;
  background-color: ${({ theme }) => theme.snugMenuColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 45%;
  height: 90%;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  padding: 10px;
`;

interface PropTypes {
  toggleModal(parameter: any | void): any | void;
  updateProfile(profile: Profile): void;
}

export const Modal: React.FC<PropTypes> = ({ toggleModal, updateProfile }) => {
  return (
    <BlackBackground>
      <Wrapper>
        <ModalHeader onClick={toggleModal} />
        <ModalBody toggleModal={toggleModal} updateProfile={updateProfile} />
      </Wrapper>
    </BlackBackground>
  );
};
