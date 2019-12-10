import React, { useState } from "react";
import styled from "styled-components";
import { PropTypes } from "./status-bar";

const Wrapper = styled.section`
  height: 80px;
  min-height: 80px;
  max-heigth: 80px;
  border-bottom: 1px black solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

const Header = styled.header`
  color: #000000;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 3px;
  &: hover {
    text-decoration: underline;
  }
`;

const Contents = styled.main`
  color: #3d71a3;
  font-size: 0.9rem;
  cursor: pointer;
  &: hover {
    text-decoration: underline;
  }
`;

export const StatusBarHeader: React.FC<PropTypes> = props => {
  const { header, contents } = props;
  return (
    <Wrapper>
      <Header>{header}</Header>
      <Contents>{contents}</Contents>
    </Wrapper>
  );
};
