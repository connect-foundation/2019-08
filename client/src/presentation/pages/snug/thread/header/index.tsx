import React from "react";
import styled from "styled-components";
import LetterXWhite from "assets/letter-x-white.png";

const ThreadHeader = styled.header`
  width: 400px;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
`;

const MarginBox = styled.section`
  width: 45px;
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 45px * 2);
`;

const Contents = styled.section`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.snugMainFont};
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const Header: React.FC = () => {
  return (
    <ThreadHeader>
      <MarginBox />
      <Wrapper>
        <Contents>댓글창</Contents>
        <Image src={LetterXWhite} />
      </Wrapper>
      <MarginBox />
    </ThreadHeader>
  );
};
