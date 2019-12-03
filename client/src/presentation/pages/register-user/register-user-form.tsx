import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { RegisterUserFailedModal } from "presentation/components/register-user/failed-modal";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import {
  validateEmail,
  validatePasswordLength
} from "presentation/validation/validation";
import { ApplicationProptype } from "prop-types/application-type";
import { EmailInput } from "presentation/components/register-user/inputs/email-input";
import { NameInput } from "presentation/components/register-user/inputs/name-input";
import { PasswordInput } from "presentation/components/register-user/inputs/password-input";
import { PasswordCheckInput } from "presentation/components/register-user/inputs/password-check-input";

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

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
`;

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
  const [modalOn, setModalOn] = useState(false);

  const handleModalChange = () => {
    setModalOn(false);
  };

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      setIsEmailFormId(validateEmail(event.target.value));
    },
    [email]
  );

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [name]
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      setIsValidPassword(validatePasswordLength(event.target.value));
    },
    [password]
  );

  const handlePasswordCheckChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(event.target.value);
      setIsPasswordSame(password === event.target.value);
    },
    [passwordCheck]
  );

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await Application.services.userService.create({
      email,
      name,
      password
    });
    if (!!result) return;
    setModalOn(true);
  };

  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>회원 가입을 지금 바로 해보세요!</SnugDescription>
      </DescriptionWrapper>
      {modalOn && <RegisterUserFailedModal onClick={handleModalChange} />}
      <InputWrapper onSubmit={handleSumbit}>
        <EmailInput onChange={handleEmailChange} isWarningOn={isEmailFormId} />
        <NameInput onChange={handleNameChange} />
        <PasswordInput
          onChange={handlePasswordChange}
          isWarningOn={isValidPassword}
        />
        <PasswordCheckInput
          onChange={handlePasswordCheckChange}
          isWarningOn={isPasswordSame}
        />
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
