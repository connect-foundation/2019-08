import React from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10%;
  @media (min-width: 800px) {
    width: 250px;
    min-width: 250px;
  }
  @media (min-width: 1200px) {
    width: 400px;
    min-width: 400px;
  }
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
        name={"Profile 수정"}
        size={"big"}
        fontColor={"#ffffff"}
        borderColor={"#000000"}
        onClick={toggleModal}
      />
    </Wrapper>
  );
};
