import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "./header";
import { Thumbnail } from "./thumbnail";
import { Buttons } from "./buttons";
import { StatusSection } from "./status";
import { Modal } from "./modal";

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

export const Profile: React.FC = () => {
  const [modalDisplay, setModalDisplay] = useState(false);

  const toggleModal = () => {
    setModalDisplay(!modalDisplay);
  };

  return (
    <Wrapper>
      {modalDisplay && <Modal toggleModal={toggleModal}></Modal>}
      <Header />
      <ImageWrapper>
        <Thumbnail />
      </ImageWrapper>
      <Buttons toggleModal={toggleModal} />
      <StatusSection />
    </Wrapper>
  );
};
