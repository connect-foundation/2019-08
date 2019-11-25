import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  border-top: 1px solid white;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const Header = styled.header`
  color: #ffffff;
  font-weight: bold;
`;

const Contents = styled.article`
  color: #ffffff;
  font-size: 0.9rem;
`;

const Footer = styled.footer`
  font-size: 0.7rem;
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
