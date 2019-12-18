import React from "react";
import { NormalPreview } from "./normal-preview";
import { ImagePreview } from "./image-preview";
import styled from "styled-components";

interface PropTypes {
  file: File;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.snugMainFont};
  height: auto;
  border: 1px solid ${({ theme }) => theme.snugBorderColor};
  border-radius: 0.5rem;
  box-sizing: border-box;
`;

function isImage(fileName: string) {
  if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(fileName)) return true;
  return false;
}

export const FilePreview: React.FC<PropTypes> = props => {
  const { file } = props;

  return (
    <Container>
      {isImage(file.name) ? (
        <ImagePreview file={file} />
      ) : (
        <NormalPreview file={file} />
      )}
    </Container>
  );
};
