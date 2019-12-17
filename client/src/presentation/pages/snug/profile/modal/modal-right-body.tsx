import React from "react";
import styled from "styled-components";
import { ImagePreview } from "presentation/components/snug/file-preview/image-preview";

const Wrapper = styled.section`
  width: 35%;
  min-width: 35%;
  background-color: color: ${({ theme }) => theme.snugMenuColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.section`
  width: 100%;
  height: 50%;
  margin-bottom: 10px;
  margin: 0 auto;
  color: ${({ theme }) => theme.snugMainFont};
  background: ${({ theme }) => theme.snug};
  border: 1px solid ${({ theme }) => theme.snugBorderColor};
  display: flex;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Button = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.snugMenuColor};
  color: ${({ theme }) => theme.snugMainFont};
  border: 1px solid ${({ theme }) => theme.snugBorderColor};
  border-radius: 5px;
  cursor: pointer;
  padding: 0.3rem;
`;

const HiddenInput = styled.input.attrs({
  type: "file",
  accept: "image/*"
})`
  display: none;
`;

interface PropTypes {
  filePath?: string;
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File>>;
}

export const ModalRightBody: React.FC<PropTypes> = props => {
  const { filePath, file, setFile } = props;

  const onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setFile(event.target.files![0]);
  };

  return (
    <Wrapper>
      <ImageWrapper>
        {file && file.size > 0 ? (
          <ImagePreview file={file} />
        ) : (
          <ImagePreview thumbnail={filePath} />
        )}
      </ImageWrapper>

      <label htmlFor="thumbnailInput">
        <Button>Image 올리기</Button>
      </label>
      <HiddenInput id="thumbnailInput" onChange={onFileChange} />
    </Wrapper>
  );
};
