import React from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 400px;
  max-height: 400px;
`;

interface Propstype {
  thumbnail?: string;
}

export const Thumbnail: React.FC<Propstype> = ({ thumbnail }) => {
  return <Image src={thumbnail} />;
};
