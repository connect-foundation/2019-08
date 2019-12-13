import React from "react";
import styled from "styled-components";
import LetterXWhite from "assets/letter-x-white.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";

interface PropTypes {
  onClick?(): any | void;
}

export const ModalHeader: React.FC<PropTypes> = props => {
  const { onClick } = props;
  return (
    <Wrapper>
      <Title>Profile 수정</Title>
      <IconBox imageSrc={LetterXWhite} onClick={onClick} />
    </Wrapper>
  );
};
