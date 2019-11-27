import React from "react";
import styled, { css } from "styled-components";

// title은 input을 설명하는 부분을 나타낸다. title-이 붙은
// 특성은 title에 적용되는 css이다.
interface CustomInputConfig {
  title?: string;
  titleColor?: string;
  titleFontSize?: string;
  titleFontWeight?: string;
  placeholder?: string;
  color?: string;
  backgroundColor?: string;
  activeHoverColor?: string;
  fontColor?: string;
  fontSize?: string;
  onChange?(parameter: any | void): any | void;
}

const CustomInputWrapper = styled.section`
  width: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const CustomInputHeader = styled.header`
  width: 100%;
  margin-bottom: 10px;
  ${(props: CustomInputConfig) => {
    let titleColor = props.titleColor ? props.titleColor : "#ffffff";
    let titleFontSize = props.titleFontSize ? props.titleFontSize : "0.75rem";
    let titleFontWeight = props.titleFontWeight ? props.titleFontWeight : "100";
    return css`
      color: ${titleColor};
      font-size: ${titleFontSize};
      font-weight: ${titleFontWeight};
    `;
  }}
`;

const ChannelPlusModalInputBox = styled.input.attrs({})`
  --webkit-appearance: none;
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
  ${(props: CustomInputConfig) => {
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

export const CustomInput: React.FC<CustomInputConfig> = ({
  title,
  titleColor,
  titleFontSize,
  titleFontWeight,
  placeholder,
  color,
  backgroundColor,
  activeHoverColor,
  fontColor,
  fontSize,
  onChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <CustomInputWrapper>
      <CustomInputHeader
        titleColor={titleColor}
        titleFontSize={titleFontSize}
        titleFontWeight={titleFontWeight}
      >
        {title}
      </CustomInputHeader>
      <ChannelPlusModalInputBox
        color={color}
        backgroundColor={backgroundColor}
        activeHoverColor={activeHoverColor}
        fontColor={fontColor}
        fontSize={fontSize}
        placeholder={placeholder}
        onChange={handleChange}
      ></ChannelPlusModalInputBox>
    </CustomInputWrapper>
  );
};
