import React, { useState } from "react";
import styled from "styled-components";
import { RegisterUserFailedModal } from "./register-user-failed-modal";
import { CustomLoginInput } from "presentation/components/atomic-reusable/custom-login-input";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import {
  validateEmail,
  validatePasswordLength
} from "presentation/validation/validation";
import { ApplicationProptype } from "prop-types/application-type";

const Wrapper = styled.section`
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
  height: 50%;
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

const Input = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const WarningText = styled.span`
  color: red;
  width: 100%;
  height: 10px;
`;

const compareTwo = (a: any, b: any) => {
  return a && b;
};

export const RegisterUserForm: React.FC<ApplicationProptype> = ({
  Application
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [isEmailFormId, setIsEmailFormId] = useState(true);
  const [isNotDuplicatedId, setIsNotDuplicatedId] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [modalOn, setModalOn] = useState(true);

  const handleModalChange = () => {
    setModalOn(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailFormId(validateEmail(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsValidPassword(validatePasswordLength(event.target.value));
  };

  const handlePasswordCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(event.target.value);
    setIsPasswordSame(password === event.target.value);
  };

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit started");
    const result = await Application.services.userService.create({
      email,
      name,
      password
    });
    console.log("submit ended");
    return;
  };

  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>회원 가입을 지금 바로 해보세요!</SnugDescription>
      </DescriptionWrapper>
      {modalOn && <RegisterUserFailedModal onClick={handleModalChange} />}
      <InputWrapper onSubmit={handleSumbit}>
        <Input>
          <InputFlex>
            <CustomLoginInput
              color={"bdbdbd"}
              backgroundColor={"#ffffff"}
              placeholder={"예) XXX@XXX.XXX"}
              width={"75%"}
              onChange={handleEmailChange}
            ></CustomLoginInput>
            <CustomButton
              color={"#fda600"}
              size={"20%"}
              name={"중복 확인"}
              fontSize={"0.7rem"}
              fontColor={"#ffffff"}
              fontWeight={"bold"}
              height={"30px"}
            ></CustomButton>
          </InputFlex>
          {!isEmailFormId && (
            <WarningText>유효한 이메일 형식이 아닙니다.</WarningText>
          )}
        </Input>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Nickname"}
            onChange={handleNameChange}
          ></CustomLoginInput>
        </Input>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Password"}
            type={"password"}
            onChange={handlePasswordChange}
          ></CustomLoginInput>
          {!isValidPassword && (
            <WarningText>비밀번호는 8자 이상입니다.</WarningText>
          )}
        </Input>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Password Check"}
            type={"password"}
            onChange={handlePasswordCheckChange}
          ></CustomLoginInput>
          {!isPasswordSame && (
            <WarningText>비밀번호가 같지 않습니다.</WarningText>
          )}
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
