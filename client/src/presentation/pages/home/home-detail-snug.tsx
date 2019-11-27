import React from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const Wrapper = styled.form`
  background-color: #fcedd0;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid grey;
  margin-top: 10px;
`;

const DescriptionWrapper = styled.section`
  width: 60%;
  display: flex;
  justify-content: space-around;
`;

const ButtonWrapper = styled.section`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Description = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.header`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Address = styled.footer`
  font-size: 0.5rem;
  color: grey;
`;

const Square = styled.section`
  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 10px;
  width: 10%;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export const HomeDetailSnug: React.FC = () => {
  return (
    <Wrapper>
      <DescriptionWrapper>
        <Square />
        <Description>
          <Title>우리 동네 축구팀</Title>
          <Address>football.snug.com</Address>
        </Description>
      </DescriptionWrapper>
      <ButtonWrapper>
        <CustomButton
          color={"#ffffff"}
          fontColor={"#000000"}
          fontWeight={"bold"}
          name={"Snug로 이동"}
          size={"big"}
          borderColor={"grey"}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};
