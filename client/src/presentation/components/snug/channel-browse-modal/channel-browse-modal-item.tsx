import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.snugSubFont};
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.snugBorderColor};
  margin-top: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.snugBorderColor};
    color: ${({ theme }) => theme.sidebarFontHover};
  }
`;

const Header = styled.header`
  font-weight: bold;
  margin: 10px;
`;

const Contents = styled.article`
  font-size: 0.8rem;
  margin-left: 10px;
`;

const Footer = styled.footer`
  font-size: 0.6rem;
  margin-left: 10px;
`;

interface ChannelBrowseModal {
  title?: string;
  description?: string;
  privacy?: boolean;
  user?: string;
  createdAt?: Date;
}

export const ChannelBrowseModalItem: React.FC<ChannelBrowseModal> = props => {
  return (
    <Wrapper>
      <Header>{props.title}</Header>
      <Contents>{props.description}</Contents>
      <Footer>
        Created by {props.user} on{" "}
        {props.createdAt && props.createdAt.toLocaleString()}
      </Footer>
    </Wrapper>
  );
};
