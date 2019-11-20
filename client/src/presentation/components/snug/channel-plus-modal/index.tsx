import React from "react";
import styled from "styled-components";
import { ChannelPlusModalHeader } from "./channel-plus-modal-header";
import { ChannelPlusModalContents } from "./channel-plus-modal-contents";
import { useModalToggled } from "contexts/modal-context";

const WholeScreen = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 0.8;
  width: 100%;
  height: 100%;
`;

const MarginBox = styled.section`
  min-width: 30px;
  max-width: 30px;
  height: 100%;
`;

const Wrapper = styled.section`
  width: 500px;
  height: 500px;
  background-color: white;
  display: flex;
  background-color: #606060;
  border-radius: 10px;
`;

const MainBox = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ChannelPlusModal: React.FC = () => {
  const Modals = useModalToggled();

  return (
    <>
      {Modals && Modals.ChannelPlusModal && (
        <WholeScreen>
          <Wrapper>
            <MarginBox />
            <MainBox>
              <ChannelPlusModalHeader />
              <ChannelPlusModalContents />
            </MainBox>
            <MarginBox />
          </Wrapper>
        </WholeScreen>
      )}
    </>
  );
};
