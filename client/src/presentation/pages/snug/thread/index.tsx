import React from "react";
import styled from "styled-components";
import { Header } from "./header";
import { ThreadInputBox } from "presentation/components/snug/thread-input-box";
import { ThreadContainer } from "presentation/components/snug/thread-container";

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.snugMenuColor};
  border-left: 1px solid ${({ theme }) => theme.snugBorderColor};
  border-top: 1px solid ${({ theme }) => theme.snugBorderColor};
  width: 400px;
`;

interface PropTypes {
  toggleThread(): void;
}

export const Thread: React.FC<PropTypes> = ({ toggleThread }) => {
  return (
    <Wrapper>
      <Header toggleThread={toggleThread} />
      <ThreadContainer />
      <ThreadInputBox />
    </Wrapper>
  );
};
