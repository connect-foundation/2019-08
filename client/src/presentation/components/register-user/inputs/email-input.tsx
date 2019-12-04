import React from "react";
import styled from "styled-components";
import { CustomLoginInput } from "presentation/components/atomic-reusable/custom-login-input";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { InputsPropTypes } from "./inputs-prop-types";

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

const WarningText = styled.span`
  color: red;
  width: 100%;
  height: 10px;
`;

export const EmailInput: React.FC<InputsPropTypes> = ({
  onChange,
  isWarningOn,
  onClick,
  disabled,
  disabledColor
}) => {
  return (
    <Input>
      <InputFlex>
        <CustomLoginInput
          color={"bdbdbd"}
          backgroundColor={"#ffffff"}
          placeholder={"예) XXX@XXX.XXX"}
          width={"75%"}
          onChange={onChange}
        ></CustomLoginInput>
        <CustomButton
          color={"#fda600"}
          size={"20%"}
          name={"중복 확인"}
          fontSize={"0.7rem"}
          fontColor={"#ffffff"}
          fontWeight={"bold"}
          height={"30px"}
          onClick={onClick}
          disabled={disabled}
          disabledColor={disabledColor}
        ></CustomButton>
      </InputFlex>
      {isWarningOn && <WarningText>유효한 이메일 형식이 아닙니다.</WarningText>}
    </Input>
  );
};
