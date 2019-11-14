import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Contents = styled.article`
  color: #ffffff;
`;

const Footer = styled.footer``;

export const ChannelBrowseModalItem: React.FC = () => {
  return (
    <Wrapper>
      <Header>#이번주</Header>
      <Contents>bot test</Contents>
      <Footer>Created by 이수배 on November 4th, 2019</Footer>
    </Wrapper>
  );
};
