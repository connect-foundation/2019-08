import React from "react";
import styled from "styled-components";
import Gipyoo from "assets/gipyoo.png";

const Image = styled.img`
  max-width: 100%;
`;

export const ModalThumbnail: React.FC = () => {
  return <Image src={Gipyoo} />;
};
