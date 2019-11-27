import React from "react";
import styled from "styled-components";
import { HomeDetailSnug } from "./home-detail-snug";

const Wrapper = styled.section`
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DescriptionWrapper = styled.section`
  height: 30%;
  display: flex;
  align-items: center;
`;

const SnugDescription = styled.span`
  color: #000000;
  font-weight: bold;
  font-size: 2rem;
`;

const DetailSnugWrapper = styled.section`
  height: auto;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-contents: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
`;

const Title = styled.header`
  font-weight: bold;
  font-size: 1.25rem;
`;

export const HomeSnug: React.FC = () => {
  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>아늑한 공간을 지금 바로 이용해보세요!</SnugDescription>
      </DescriptionWrapper>
      <DetailSnugWrapper>
        <Title>내 Snug</Title>
        <HomeDetailSnug />
        <HomeDetailSnug />
        <HomeDetailSnug />
        <HomeDetailSnug />
        <HomeDetailSnug />
      </DetailSnugWrapper>
    </Wrapper>
  );
};
