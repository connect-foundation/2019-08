import React from "react";
import styled, { css } from "styled-components";

interface PropsType {
  color: string;
  size?: string;
  name?: string;
  fontColor?: string;
}

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
  ${(props: PropsType) => {
    let color = "#ffffff";
    let size = "";
    let fontColor = "#000000";
    if (props.color) {
      color = props.color;
    }

    if (props.fontColor) {
      fontColor = props.fontColor;
    }

    if (props.size) {
      switch (props.size) {
        case "big":
          size = "120px";
          break;
        case "medium":
          size = "60px";
          break;
        case "small":
        default:
          size = "30px";
          break;
      }
    }
    return css`
      background-color: ${color};
      width: ${size};
      display: block;
      color: ${fontColor};
    `;
  }};
`;

export const CustomButton: React.FC<PropsType> = props => {
  return (
    <Button fontColor={props.fontColor} color={props.color} size={props.size}>
      {props.name}
    </Button>
  );
};
