import React, { useState } from "react";
import styled from "styled-components";

const ImgPreview = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 350px;
`;

interface PropTypes {
  file?: File;
  thumbnail?: string;
}

export const ImagePreview: React.FC<PropTypes> = props => {
  const { file, thumbnail } = props;
  const [previewUrl, setPreviewUrl] = useState("");

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };

    return <ImgPreview src={previewUrl!} />;
  }

  return <ImgPreview src={thumbnail!} />;
};
