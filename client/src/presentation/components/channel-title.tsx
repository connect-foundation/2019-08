import React from "react";
import styled from "styled-components";
import { IconBox } from "./icon-box";
import Hash from "../../assets/hash-white.png";

const ChannelTitleWrapper = styled.section`
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  &:hover {
    opacity: 0.5;
  }
`;

interface PropsTypes {
  title: string;
}

export const ChannelTitle: React.FC<PropsTypes> = props => {
  return (
    <ChannelTitleWrapper>
      <IconBox imageSrc={Hash} />
      {props.title}
    </ChannelTitleWrapper>
  );
};
