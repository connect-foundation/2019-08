import React from "react";
import styled from "styled-components";
import LetterXBlack from "assets/letter-x.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";

const Wrapper = styled.header`
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const Title = styled.section`
  color: ${({ theme }) => theme.snugMainFont};
  font-weight: bold;
  font-size: 2rem;
  cursor: default;
`;

interface PropTypes {
  onClick?(): any | void;
}

export const ModalHeader: React.FC<PropTypes> = props => {
  const { onClick } = props;
  return (
    <Wrapper>
      <Title>Profile 수정</Title>
      <IconBox imageSrc={LetterXBlack} onClick={onClick} />
    </Wrapper>
  );
};
