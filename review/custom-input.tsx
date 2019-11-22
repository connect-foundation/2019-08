import React from "react";
import styled from "styled-components";

const CustomInputWrapper = styled.section`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const CustomInputHeader = styled.header`
  width: 100%;
  margin-bottom: 10px;
  font-size: 0.75rem;
  color: #ffffff;
`;

const ChannelPlusModalInputBox = styled.input.attrs({})`
  --webkit-appearance: none;
  background-color: #263237;
  font-size: 14px;
  color: #e3e3e3;
  min-height: 30px;
  max-height: 30px;
  height: 30px;
  width: 100%;
  appearance: none;
  border: none;
  border-radius: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid transparent;
  &:active,
  :focus {
    border: 1px solid #2c5af7;
  }
`;

interface PropTypes {
  title: string;
  placeholder: string;
}

export const CustomInput: React.FC<PropTypes> = props => {
  return (
    <CustomInputWrapper>
      <CustomInputHeader>{props.title}</CustomInputHeader>
      <ChannelPlusModalInputBox
        placeholder={props.placeholder}
      ></ChannelPlusModalInputBox>
    </CustomInputWrapper>
  );
};
