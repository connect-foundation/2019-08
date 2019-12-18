import * as React from "react";
import styled from "styled-components";

interface PropsType {
  imageSrc: string;
  size?: string;
  borderRadius?: string;
  backgroundColor?: string;
  onClick?(parameter: any | void): any | void;
  onKeyPress?(parameter: any | void): any | void;
}

interface CustomImgBoxProps {
  size?: string;
  borderRadius?: string;
  backgroundColor?: string;
}

const CustomImgBox = styled.section<CustomImgBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "5px")};
  margin: 5px;
  min-width: ${props => (props.size ? props.size : "30px")};
  max-width: ${props => (props.size ? props.size : "30px")};
  width: ${props => (props.size ? props.size : "30px")};
  height: ${props => (props.size ? props.size : "30px")};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : ""};
  &:hover {
    background-color: #39515a;
  }
`;

const CustomImg = styled.img`
  width: 70%;
`;

export const IconBox: React.FC<PropsType> = props => {
  return (
    <CustomImgBox
      backgroundColor={props.backgroundColor}
      borderRadius={props.borderRadius}
      onClick={props.onClick}
      size={props.size}
    >
      <CustomImg src={props.imageSrc}></CustomImg>
    </CustomImgBox>
  );
};
