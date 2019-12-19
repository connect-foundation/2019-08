import React from "react";
import styled from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import whiteAdd from "assets/add-white.png";

export const SideButtons: React.FC<propType> = ({ message, onClick }) => {
  return (
    <Wrapper>
      <StyledButton onClick={onClick}>
        <IconBox imageSrc={whiteAdd} size={"20px"}></IconBox>
        {message}
      </StyledButton>
    </Wrapper>
  );
};

interface propType {
  message: string;
  onClick?: any;
}

const Wrapper = styled.section`
  padding: 10px 0px;
  border-top: solid 1px ${({ theme }) => theme.snugBorderColor};
`;

const StyledButton = styled.section`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0px 20px;
  &:hover {
    background-color: ${({ theme }) => theme.sidbarHover};
  }
`;
