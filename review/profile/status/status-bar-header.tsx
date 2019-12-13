import React from "react";
import styled from "styled-components";
import { PropTypes } from "./status-bar";

export const StatusBarHeader: React.FC<PropTypes> = props => {
  const { header, contents, toggleModal } = props;
  return (
    <Wrapper>
      <Header>{header}</Header>
      <Contents onClick={toggleModal}>{contents}</Contents>
    </Wrapper>
  );
};
