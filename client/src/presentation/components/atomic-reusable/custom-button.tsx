import React from "react";
import styled, { css } from "styled-components";

export type ButtonType = "button" | "submit" | "reset" | undefined;

export interface CustomButtonConfig {
  color: string;
  size?: string;
  name?: string;
  fontColor?: string;
  type?: ButtonType;
}

const determineSize = (size: string) => {
  switch (size) {
    case "big":
      return "120px";
    case "medium":
      return "60px";
    case "small":
    default:
      return "30px";
  }
};

// 버튼 기본 설정 : 배경 -> 흰색, 글자 -> 검은색, 크기 -> 30px
const Button = styled.button`
  --webkit-appearance: none;
  appearance: none;
  border: none;
  height: 30px;
  border-radius: 5px;
  &:hover {
    opacity: 0.5;
  }
  ${(props: CustomButtonConfig) => {
    let size = "";
    let color = props.color ? props.color : "#ffffff";
    let fontColor = props.fontColor ? props.fontColor : "#000000";

    if (props.size) {
      size = determineSize(props.size);
    }
    return css`
      background-color: ${color};
      width: ${size};
      display: block;
      color: ${fontColor};
    `;
  }};
`;

export const CustomButton: React.FC<CustomButtonConfig> = ({
  fontColor,
  color,
  size,
  name,
  type
}) => {
  return (
    <Button fontColor={fontColor} type={type} color={color} size={size}>
      {name}
    </Button>
  );
};
