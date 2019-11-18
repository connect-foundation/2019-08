import React from "react";
import styled from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import Hash from "assets/hash-white.png";

const Wrapper = styled.section`
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
    <Wrapper>
      <IconBox imageSrc={Hash} />
      {props.title}
    </Wrapper>
  );
};
