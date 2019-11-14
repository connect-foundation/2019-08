import React from "react";
import styled from "styled-components";
import { IconBox } from "./icon-box";
import Plus from "../../assets/plus-white.png";

const Wrapper = styled.section`
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  &:hover {
    opacity: 0.5;
  }
`;

export const ChannelHeader: React.FC = () => {
  return (
    <Wrapper>
      <Title>채널 목록</Title>
      <IconBox imageSrc={Plus}></IconBox>
    </Wrapper>
  );
};
