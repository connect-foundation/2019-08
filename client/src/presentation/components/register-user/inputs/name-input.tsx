import React from "react";
import styled from "styled-components";
import { CustomLoginInput } from "presentation/components/atomic-reusable/custom-login-input";
import { InputsPropTypes } from "./inputs-prop-types";

const Input = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const NameInput: React.FC<InputsPropTypes> = ({ onChange }) => {
  return (
    <Input>
      <CustomLoginInput
        color={"bdbdbd"}
        backgroundColor={"#ffffff"}
        placeholder={"Nickname"}
        onChange={onChange}
      ></CustomLoginInput>
    </Input>
  );
};
