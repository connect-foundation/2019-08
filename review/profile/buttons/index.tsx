import React from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const Wrapper = styled.section`
  display: flex;
  width: 400px;
  max-width: 400px;
  justify-content: space-around;
  align-items: center;
  height: 10%;
`;

interface PropTypes {
  toggleModal?(parameter: any | void): any | void;
}

export const Buttons: React.FC<PropTypes> = props => {
  const { toggleModal } = props;

  return (
    <Wrapper>
      <CustomButton
        color={"#148567"}
        name={"File 올리기"}
        size={"big"}
        fontColor={"#ffffff"}
        borderColor={"#000000"}
      />
      <CustomButton
        color={"#148567"}
        name={"Profile 수정"}
        size={"big"}
        fontColor={"#ffffff"}
        borderColor={"#000000"}
        onClick={toggleModal}
      />
    </Wrapper>
  );
};
