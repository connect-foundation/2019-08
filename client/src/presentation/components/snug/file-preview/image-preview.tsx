import React, { useState } from "react";
import styled from "styled-components";

interface PropTypes {
  file: File;
}

const ImgPreview = styled.img`
  width: 100%;
`;

export const ImagePreview: React.FC<PropTypes> = props => {
  const { file } = props;
  const [previewUrl, setPreviewUrl] = useState("");

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setPreviewUrl(reader.result as string);
  };

  return <ImgPreview src={previewUrl} />;
};
