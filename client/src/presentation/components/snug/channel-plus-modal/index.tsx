import React from "react";
import styled from "styled-components";
import { ChannelPlusModalHeader } from "./channel-plus-modal-header";
import { ChannelPlusModalContents } from "./channel-plus-modal-contents";
import {
  useModalToggled,
  useModalToggledDispatch
} from "contexts/modal-context";
import { ApplicationProptype } from "prop-types/application-type";

const WholeScreen = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const MarginBox = styled.section`
  min-width: 30px;
  max-width: 30px;
  height: 100%;
`;

const Wrapper = styled.section`
  color: ${({ theme }) => theme.snugMainFont};
  width: 500px;
  height: 500px;
  display: flex;
  background-color: ${({ theme }) => theme.snug};
  opacity: 1;
  border-radius: 10px;
`;

const MainBox = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ChannelPlusModal: React.FC<ApplicationProptype> = ({
  Application
}) => {
  const Modals = useModalToggled();
  const dispatch = useModalToggledDispatch();
  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 27) {
      dispatch &&
        dispatch({
          type: "TOGGLE_CHANNEL_PLUS_MODAL"
        });
    }
  };

  return (
    <>
      {Modals && Modals.ChannelPlusModal && (
        <WholeScreen tabIndex={-1} onKeyDown={keyDownHandler}>
          <Wrapper>
            <MarginBox />
            <MainBox>
              <ChannelPlusModalHeader />
              <ChannelPlusModalContents Application={Application} />
            </MainBox>
            <MarginBox />
          </Wrapper>
        </WholeScreen>
      )}
    </>
  );
};
