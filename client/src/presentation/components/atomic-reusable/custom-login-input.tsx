import React from "react";
import styled, { css } from "styled-components";

export interface CustomLoginInput {
  color?: string;
  fontSize?: string;
  activeHoverColor?: string;
  backgroundColor?: string;
  placeholder?: string;
  onChange?(parameter: any | void): any | void;
}

const Input = styled.input.attrs({})`
  --webkit-appearance: none;
  min-height: 50px;
  max-height: 50px;
  height: 50px;
  width: 100%;
  appearance: none;
  border: none;
  border-radius: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #bdbdbd;
  ${(props: CustomLoginInput) => {
    let color = props.color ? props.color : "#e3e3e3";
    let fontSize = props.fontSize ? props.fontSize : "14px";
    let activeHoverColor = props.activeHoverColor
      ? props.activeHoverColor
      : "#2c5af7";
    let backgroundColor = props.backgroundColor
      ? props.backgroundColor
      : "#263237";
    return css`
      color: ${color};
      font-size: ${fontSize};
      &:active,
      :focus {
        border: 1px solid ${activeHoverColor};
      }
      background-color: ${backgroundColor};
    `;
  }}
`;

export const CustomLoginInput: React.FC<CustomLoginInput> = ({
  color,
  fontSize,
  activeHoverColor,
  backgroundColor,
  placeholder,
  onChange
}) => {
  return (
    <Input
      color={color}
      fontSize={fontSize}
      activeHoverColor={activeHoverColor}
      backgroundColor={backgroundColor}
      placeholder={placeholder}
      onChange={onChange}
    ></Input>
  );
};
