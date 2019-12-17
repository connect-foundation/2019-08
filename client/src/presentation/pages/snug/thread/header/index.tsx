import React from "react";
import styled from "styled-components";
import LetterXWhite from "assets/letter-x-white.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";

const MarginBox = styled.section`
  width: 45px;
`;

const FlexMarginBox = styled.section`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Contents = styled.section`
  min-width: 100px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.snugMainFont};
`;

interface PropTypes {
  toggleThread(postId: number): void;
}

export const Header: React.FC<PropTypes> = ({ toggleThread }) => {
  return (
    <Wrapper>
      <MarginBox></MarginBox>
      <Contents>댓글창</Contents>
      <FlexMarginBox></FlexMarginBox>
      <IconBox imageSrc={LetterXWhite} size={"25px"} onClick={toggleThread} />
    </Wrapper>
  );
};
