import React from "react";
import styled from "styled-components";
import Gipyoo from "assets/gipyoo.png";

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

export const Thumbnail: React.FC = () => {
  return (
    <Wrapper>
      <Image src={Gipyoo} />
    </Wrapper>
  );
};
