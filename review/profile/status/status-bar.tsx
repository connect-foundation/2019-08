import React from "react";
import styled, { css } from "styled-components";

export interface PropTypes {
  header: string;
  contents: string;
  toggleModal?(): any | void;
  cursor?: string;
}

export interface PointerTypes {
  cursor?: string;
}

export const StatusBar: React.FC<PropTypes> = props => {
  const { header, contents, cursor, toggleModal } = props;
  return (
    <Wrapper>
      <Header>{header}</Header>
      <Contents cursor={cursor} onClick={toggleModal}>
        {contents}
      </Contents>
    </Wrapper>
  );
};
