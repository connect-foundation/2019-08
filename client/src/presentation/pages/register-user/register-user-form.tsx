import React, { useState } from "react";
import styled from "styled-components";

import { CustomLoginInput } from "presentation/components/atomic-reusable/custom-login-input";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const Wrapper = styled.form`
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DescriptionWrapper = styled.section`
  height: 30%;
  display: flex;
  align-items: center;
`;

const SnugDescription = styled.span`
  color: #000000;
  font-weight: bold;
  font-size: 2rem;
`;

const InputWrapper = styled.section`
  height: 40%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Input = styled.section``;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
`;

export const RegisterUserForm: React.FC = () => {
  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>회원 가입을 지금 바로 해보세요!</SnugDescription>
      </DescriptionWrapper>
      <InputWrapper>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"예) XXX@XXX.XXX"}
          ></CustomLoginInput>
        </Input>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Password"}
          ></CustomLoginInput>
        </Input>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Password Check"}
          ></CustomLoginInput>
        </Input>
        <ButtonWrapper>
          <CustomButton
            type={"submit"}
            color={"#fda600"}
            size={"50%"}
            name={"로그인"}
            fontSize={"1.5rem"}
            fontColor={"#ffffff"}
            fontWeight={"bold"}
            height={"auto"}
          ></CustomButton>
        </ButtonWrapper>
      </InputWrapper>
    </Wrapper>
  );
};
