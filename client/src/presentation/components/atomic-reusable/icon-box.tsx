import * as React from "react";
import styled, { css } from "styled-components";

interface PropsType {
  imageSrc: string;
  size?: string;
  onClick?(parameter: any | void): any | void;
  onKeyPress?(parameter: any | void): any | void;
}
interface CustomImgBoxProps {
  size?: string;
}
const CustomImgBox = styled.section<CustomImgBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 5px;
  width: ${props => (props.size ? props.size : "30px")};
  height: ${props => (props.size ? props.size : "30px")};
  &:hover {
    background-color: #39515a;
  }
`;

const CustomImg = styled.img`
  width: 70%;
`;

export const IconBox: React.FC<PropsType> = props => {
  return (
    <CustomImgBox onClick={props.onClick} size={props.size}>
      <CustomImg src={props.imageSrc}></CustomImg>
    </CustomImgBox>
  );
};
