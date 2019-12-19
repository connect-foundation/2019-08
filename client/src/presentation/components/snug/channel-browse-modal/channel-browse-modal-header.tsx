import React from "react";
import styled from "styled-components";
import { useModalToggledDispatch } from "contexts/modal-context";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const Title = styled.section`
  font-weight: solid;
  font-size: 2rem;
  width: 100%;
`;

export const ChannelBrowseModalHeader: React.FC = () => {
  const dispatch = useModalToggledDispatch();

  const clickHandler = () => {
    dispatch &&
      dispatch({
        type: "TOGGLE_CHANNEL_BROWSE_MODAL"
      });
    dispatch &&
      dispatch({
        type: "TOGGLE_CHANNEL_PLUS_MODAL"
      });
  };

  return (
    <Header>
      <Title>채널 목록</Title>
      <CustomButton
        color={"#148567"}
        fontColor={"#ffffff"}
        name={"채널 생성하기"}
        size={"big"}
        fontWeight={"bold"}
        fontSize={"1rem"}
        onClick={clickHandler}
      />
    </Header>
  );
};
