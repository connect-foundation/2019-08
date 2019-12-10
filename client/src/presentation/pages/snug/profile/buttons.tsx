import React from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import More from "assets/more.png";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10%;
`;

export const Buttons: React.FC = () => {
  return (
    <Wrapper>
      <CustomButton
        color={"#148567"}
        name={"Message 보내기"}
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
      />
      <IconBox imageSrc={More} />
    </Wrapper>
  );
};
