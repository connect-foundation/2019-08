import React from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.section`
  font-weight: solid;
  font-size: 2rem;
  width: 100%;
`;

export const ChannelBrowseModalHeader: React.FC = () => {
  return (
    <Header>
      <Title>채널 목록</Title>
      <CustomButton
        color={"#148567"}
        fontColor={"#ffffff"}
        name={"채널 생성하기"}
        size={"big"}
        fontWeight={"bold"}
        fontSize={"0.9rem"}
      />
    </Header>
  );
};
