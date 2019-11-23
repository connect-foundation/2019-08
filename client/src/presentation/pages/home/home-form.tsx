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
  height: 30%;
  width: 50%;
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

export const HomeForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setValidEmail(validateEmail(event.target.value));
  };

  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>아늑한 공간을 지금 바로 이용해보세요!</SnugDescription>
      </DescriptionWrapper>
      <InputWrapper>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"예) XXX@XXX.XXX"}
            onChange={handleOnChange}
          ></CustomLoginInput>
          {!validEmail && (
            <WarningText>유효한 이메일 형식이 아닙니다.</WarningText>
          )}
        </Input>
        <Input>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Password"}
            onChange={setPassword}
          ></CustomLoginInput>
        </Input>
        <ButtonWrapper>
          <CustomButton
            type={"submit"}
            color={"#fda600"}
            size={"big"}
            name={"로그인"}
            fontColor={"#ffffff"}
            fontWeight={"bold"}
          ></CustomButton>
        </ButtonWrapper>
      </InputWrapper>
    </Wrapper>
  );
};
