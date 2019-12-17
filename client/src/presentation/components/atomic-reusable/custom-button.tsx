import React from "react";
import styled, { css } from "styled-components";

export type ButtonType = "button" | "submit" | "reset" | undefined;

export interface CustomButtonConfig {
  color: string;
  size?: string;
  name?: string;
  fontColor?: string;
  fontWeight?: string | number;
  fontSize?: string;
  type?: ButtonType;
  borderColor?: string;
  height?: string;
  disabled?: boolean;
  disabledColor?: string;
  onClick?(parameter: any | void): any | void;
}

const determineSize = (size: string) => {
  switch (size) {
    case "big":
      return "150px";
    case "medium":
      return "60px";
    case "small":
    default:
      return `${size}`;
  }
};

// 버튼 기본 설정 : 배경 -> 흰색, 글자 -> 검은색, 크기 -> 30px
const Button = styled.button`
  --webkit-appearance: none;
  appearance: none;
  border-radius: 5px;
  &:hover {
    opacity: 0.5;
  }
  cursor: pointer;
  ${(props: CustomButtonConfig) => {
    const size = props.size ? determineSize(props.size) : "";
    const fontColor = props.fontColor ? props.fontColor : "#000000";
    const fontWeight = props.fontWeight ? props.fontWeight : "0";
    const fontSize = props.fontSize ? props.fontSize : "1rem";
    const border = props.borderColor
      ? `1px solid ${props.borderColor}`
      : "none";
    const height = props.height ? props.height : "30px";
    const disableHover = props.disabled ? "none" : "";
    let color = props.color ? props.color : "#ffffff";
    color = props.disabled && props.disabledColor ? props.disabledColor : color;

    return css`
      background-color: ${color};
      width: ${size};
      display: block;
      color: ${fontColor};
      font-weight: ${fontWeight};
      font-size: ${fontSize};
      border: ${border};
      height: ${height};
      pointer-events: ${disableHover};
    `;
  }};
`;

export const CustomButton: React.FC<CustomButtonConfig> = ({
  fontColor,
  color,
  size,
  name,
  type,
  fontWeight,
  fontSize,
  onClick,
  borderColor,
  height,
  disabled = false,
  disabledColor
}) => {
  return (
    <Button
      fontColor={fontColor}
      type={type}
      color={color}
      size={size}
      fontWeight={fontWeight}
      fontSize={fontSize}
      borderColor={borderColor}
      height={height}
      onClick={onClick}
      disabled={disabled}
      disabledColor={disabledColor}
    >
      {name}
    </Button>
  );
};
