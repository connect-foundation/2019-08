import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { CustomLoginInput } from "presentation/components/atomic-reusable/custom-login-input";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { User } from "core/entity/user";
import { ApplicationProptype } from "prop-types/application-type";

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

const WarningText = styled.span`
  color: red;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const HomeForm: React.FC<ApplicationProptype> = ({ Application }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setValidEmail(validateEmail(event.target.value));
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    const result = await Application.services.authService.login(
      email,
      password
    );
    console.log(result);
    if (!result) {
      setEmail("");
      setPassword("");
      return;
    }
    window.location.reload();
  };

  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>아늑한 공간을 지금 바로 이용해보세요!</SnugDescription>
      </DescriptionWrapper>
      <InputWrapper>
        <Input>
          <CustomLoginInput
            value={email}
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"예) XXX@XXX.XXX"}
            onChange={onChangeEmail}
          ></CustomLoginInput>
          {!validEmail && (
            <WarningText>유효한 이메일 형식이 아닙니다.</WarningText>
          )}
        </Input>
        <Input>
          <CustomLoginInput
            value={password}
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Password"}
            onChange={onChangePassword}
          ></CustomLoginInput>
        </Input>
        <ButtonWrapper>
          <CustomButton
            type={"button"}
            color={"#fda600"}
            size={"50%"}
            name={"로그인"}
            fontSize={"1.5rem"}
            fontColor={"#ffffff"}
            fontWeight={"bold"}
            height={"auto"}
            onClick={login}
          ></CustomButton>
        </ButtonWrapper>
      </InputWrapper>
    </Wrapper>
  );
};
