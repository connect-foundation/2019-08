import styled from "styled-components";
import React from "react";
import {CustomInput} from "presentation/components/atomic-reusable/custom-input";
import {CustomButton} from "presentation/components/atomic-reusable/custom-button";

const InputWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  padding: 10px;
  height: auto;
`;

const ButtonWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const InviteUsers: React.FC = () => {
  return (<InputWrapper>
    <CustomInput color={"#bdbdbd"}
                 backgroundColor={"#ffffff"}
                 placeholder={"example@email.com"}/>
    <CustomInput color={"#bdbdbd"}
                 backgroundColor={"#ffffff"}
                 placeholder={"example@email.com"}/>
    <CustomInput color={"#bdbdbd"}
                 backgroundColor={"#ffffff"}
                 placeholder={"example@email.com"}/>
    <ButtonWrapper>
      <CustomButton
              color={"#e3dede"}
              fontColor={"#282c37"}
              name={"추가하기"}
              size={"100%"}
              fontWeight={"bold"}
              fontSize={"1.5rem"}
      />
    </ButtonWrapper>
  </InputWrapper>);
};