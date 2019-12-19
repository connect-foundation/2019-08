import React from "react";
import styled from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import whiteAdd from "assets/add-white.png";

export const SideButtons: React.FC<propType> = ({ setAppList }) => {
  return (
    <Wrapper>
      <StyledButton onClick={() => setAppList(true)}>
        <IconBox imageSrc={whiteAdd} size={"20px"}></IconBox>
        go to app list
      </StyledButton>
    </Wrapper>
  );
};

interface propType {
  setAppList: React.Dispatch<React.SetStateAction<boolean>>;
}
const Wrapper = styled.section`
  padding: 10px 0px;
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
