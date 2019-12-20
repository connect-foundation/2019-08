import React from "react";
import styled from "styled-components";
import whiteAdd from "assets/add-white.png";

export const SideButtons: React.FC<propType> = ({ message, onClick }) => {
  return (
    <Wrapper>
      <StyledButton onClick={onClick}>
        <CustomImgBox>
          <CustomImg src={whiteAdd}></CustomImg>
        </CustomImgBox>
        {message}
      </StyledButton>
    </Wrapper>
  );
};

interface propType {
  message: string;
  onClick?: any;
}

const CustomImgBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 5px;
  min-width: 20px;
  max-width: 20px;
  width: 20px;
  height: 20px;
`;

const CustomImg = styled.img`
  width: 70%;
`;

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
