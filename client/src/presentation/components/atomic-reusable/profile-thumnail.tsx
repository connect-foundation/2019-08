import React from "react";
import styled from "styled-components";

const ImageBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 58px;
  max-width: 58px;
  min-height: 58px;
  max-height: 58px;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 80%;
  height: 80%;
`;

interface PropTypes {
  thumbnail: string;
}

export const ProfileThumnail: React.FC<PropTypes> = ({
  thumbnail: imageSrc
}) => {
  return (
    <ImageBox>
      <Image src={imageSrc}></Image>
    </ImageBox>
  );
};
