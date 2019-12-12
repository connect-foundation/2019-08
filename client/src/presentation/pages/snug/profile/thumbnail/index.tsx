import React from "react";
import styled from "styled-components";
import Gipyoo from "assets/gipyoo.png";

const Image = styled.img`
  max-width: 400px;
`;

export const Thumbnail: React.FC = () => {
  return <Image src={Gipyoo} />;
};
