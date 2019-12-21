import React from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { Link } from "react-router-dom";

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
  width: 100%;
  padding-left: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonWrapper = styled.section`
  width: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Description = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.header`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Address = styled.footer`
  font-size: 0.5rem;
  color: grey;
`;

const Square = styled.section`
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  width: 40px;
  min-height: 40px;
  height: 40px;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const StyledImg = styled.img`
  width: 90%;
`;

interface PropTypes {
  name: string;
  description: string;
  link: number;
}

export const HomeDetailSnug: React.FC<PropTypes> = props => {
  return (
    <Wrapper>
      <Square>
        <StyledImg src="https://user-images.githubusercontent.com/44811887/69315268-6e571b80-0c79-11ea-8e61-1ae63501d4a6.png"></StyledImg>
      </Square>
      <DescriptionWrapper>
        <Description>
          <Name>{props.name}</Name>
          <Address>{props.description}</Address>
        </Description>
      </DescriptionWrapper>
      <ButtonWrapper>
        <Link to={`/snug/${props.link}/channel/0`}>
          <CustomButton
            color={"#ffffff"}
            fontColor={"#000000"}
            fontWeight={"bold"}
            name={"Snug로 이동"}
            size={"big"}
            borderColor={"grey"}
          />
        </Link>
      </ButtonWrapper>
    </Wrapper>
  );
};
