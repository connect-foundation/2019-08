import React from "react";
import styled from "styled-components";
import { CustomLoginInput } from "presentation/components/atomic-reusable/custom-login-input";
import { InputsPropTypes } from "./inputs-prop-types";

const Input = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const WarningText = styled.span`
  color: red;
  width: 100%;
  height: 10px;
`;

export const PasswordInput: React.FC<InputsPropTypes> = ({
  onChange,
  isWarningOn
}) => {
  return (
    <Input>
      <CustomLoginInput
        color={"bdbdbd"}
        backgroundColor={"#ffffff"}
        placeholder={"Password"}
        type={"password"}
        onChange={onChange}
      />
      {isWarningOn && <WarningText>비밀번호는 8자 이상입니다.</WarningText>}
    </Input>
  );
};
