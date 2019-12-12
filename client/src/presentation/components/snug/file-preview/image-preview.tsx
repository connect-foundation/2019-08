import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface PropTypes {
  file: File;
}

const ImgPreview = styled.img`
  max-width: 100%;
  max-height: 250px;
`;

export const ImagePreview: React.FC<PropTypes> = props => {
  const { file } = props;
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
  });

  return <ImgPreview src={previewUrl} />;
};
