import React, { useState, useCallback } from "react";
import styled from "styled-components";
import {
  validateEmail,
  validatePasswordLength
} from "presentation/validation/validation";
import { ApplicationProptype } from "prop-types/application-type";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { EmailInput } from "presentation/components/register-user/inputs/email-input";
import { NameInput } from "presentation/components/register-user/inputs/name-input";
import { PasswordInput } from "presentation/components/register-user/inputs/password-input";
import { PasswordCheckInput } from "presentation/components/register-user/inputs/password-check-input";
import { Modal } from "presentation/components/register-user/modal";

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

enum ModalMessage {
  "REGISTER_FAILED" = "회원 가입이 실패했습니다.",
  "EMAIL_EXISTED" = "이미 있는 이메일입니다.",
  "EMAIL_EMPTY" = "이메일을 입력하세요.",
  "NOT_ELEGIBLE_FORM" = "제한 조건을 확인해주세요",
  "ELEGIBLE_FORM" = "사용 가능한 이메일입니다."
}

export const RegisterUserForm: React.FC<ApplicationProptype> = ({
  Application
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [isEmailFormId, setIsEmailFormId] = useState(false);
  const [isNotDuplicatedId, setIsNotDuplicatedId] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  const [modalOn, setModalOn] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const closeModal = () => {
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

  const openModalWithMessage = (message: ModalMessage) => {
    setModalMessage(message);
    setModalOn(true);
  };

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await Application.services.userService.create({
      email,
      name,
      password
    });
    if (!!result) return;
    openModalWithMessage(ModalMessage.REGISTER_FAILED);
  };

  const doesEmailExist = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (email === "") {
      setModalMessage(ModalMessage.EMAIL_EMPTY);
      setModalOn(true);
      return;
    }
    const result = await Application.services.userService.doesExist(email);
    if (!result) {
      setIsNotDuplicatedId(true);
      openModalWithMessage(ModalMessage.ELEGIBLE_FORM);
      return;
    }
    setIsNotDuplicatedId(false);
    openModalWithMessage(ModalMessage.EMAIL_EXISTED);
  };

  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>회원 가입을 지금 바로 해보세요!</SnugDescription>
      </DescriptionWrapper>
      {modalOn && <Modal onClick={closeModal} message={modalMessage} />}
      <InputWrapper onSubmit={handleSumbit}>
        <EmailInput
          onChange={handleEmailChange}
          isWarningOn={email.length > 0 && !isEmailFormId}
          onClick={doesEmailExist}
          disabled={!isEmailFormId}
          disabledColor={"rgba(253, 166, 0, 0.5)"}
        />
        <NameInput onChange={handleNameChange} />
        <PasswordInput
          onChange={handlePasswordChange}
          isWarningOn={password.length > 0 && !isValidPassword}
        />
        <PasswordCheckInput
          onChange={handlePasswordCheckChange}
          isWarningOn={passwordCheck.length > 0 && !isPasswordSame}
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
            disabledColor={"rgba(253, 166, 0, 0.5)"}
            disabled={
              !isEmailFormId ||
              !isNotDuplicatedId ||
              !isValidPassword ||
              !isPasswordSame
            }
          ></CustomButton>
        </ButtonWrapper>
      </InputWrapper>
    </Wrapper>
  );
};
