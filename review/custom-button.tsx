import React from "react";
import styled, { css } from "styled-components";

interface PropsType {
  color: string;
  size?: string;
  name?: string;
  fontColor?: string;
}

interface Config {
  config: PropsType;
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
  ${(props: PropsType) => {
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

export const CustomButton: React.FC<Config> = ({ config }) => {
  return (
    <Button
      fontColor={config.fontColor}
      color={config.color}
      size={config.size}
    >
      {config.name}
    </Button>
  );
};
