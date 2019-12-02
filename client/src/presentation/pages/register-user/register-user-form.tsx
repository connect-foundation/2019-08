import React, { useState } from "react";
import styled from "styled-components";
import { CustomLoginInput } from "presentation/components/atomic-reusable/custom-login-input";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import {
  validateEmail,
  validatePasswordLength
} from "presentation/validation/validation";

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

const InputWrapper = styled.form`
  height: 40%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputFlex = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.section``;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
`;

export const RegisterUserForm: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [isEmailFormId, setEsEmailFormId] = useState(true);
  const [isNotDuplicatedId, setIsNotDuplicatedId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>회원 가입을 지금 바로 해보세요!</SnugDescription>
      </DescriptionWrapper>
      <InputWrapper>
        <InputFlex>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"예) XXX@XXX.XXX"}
            width={"75%"}
          ></CustomLoginInput>
          <CustomButton
            type={"submit"}
            color={"#fda600"}
            size={"20%"}
            name={"중복 확인"}
            fontSize={"0.7rem"}
            fontColor={"#ffffff"}
            fontWeight={"bold"}
            height={"30px"}
          ></CustomButton>
        </InputFlex>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Password"}
            type={"password"}
          ></CustomLoginInput>
        </Input>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Password Check"}
            type={"password"}
          ></CustomLoginInput>
        </Input>
        <ButtonWrapper>
          <CustomButton
            type={"submit"}
            color={"#fda600"}
            size={"50%"}
            name={"회원 가입"}
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
