import React from "react";
import styled from "styled-components";
import ClipWhite from "../../assets/clip-white.png";
import AtWhite from "../../assets/at-white.png";
import FaceWhite from "../../assets/face-white.png";
import { IconBox } from "./icon-box";

const InputWrapper = styled.section`
  width: 100%;
  height: 75px;
  background-color: grey;
  padding-top: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
`;

const MarginBox = styled.section`
  min-width: 10px;
  height: 100%;
`;

const CustomInput = styled.section`
  width: 100%;
  border: 1px solid #182226;
  background-color: #263237;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const StyledInput = styled.input.attrs({
  placeholder: "메세지를 입력하세요."
})`
  --webkit-appearance: none;
  background-color: #263237;
  font-size: 14px;
  color: #e3e3e3;
  width: 100%;
  border: none;
  &:active,
  :focus {
    outline: none;
  }
`;
export const ChatInputBox: React.FC = () => {
  return (
    <InputWrapper>
      <MarginBox></MarginBox>
      <CustomInput>
        <IconBox imageSrc={ClipWhite}></IconBox>
        <StyledInput></StyledInput>
        <IconBox imageSrc={AtWhite}></IconBox>
        <IconBox imageSrc={FaceWhite}></IconBox>
      </CustomInput>
      <MarginBox></MarginBox>
    </InputWrapper>
  );
};
