import React, { Fragment } from "react";
import styled from "styled-components";

const Img = ["png", "jpg", "jpeg"];

export const FileContents: React.FC<PropTypes> = ({ filePath }) => {
  function isImageFile(extention: string): boolean {
    return Img.includes(extention);
  }

  function getFileName(filePath: string): string {
    const pathArray = filePath.split("/");
    const fileNmae = pathArray.pop();
    return unescape(fileNmae);
  }

  function getExtension(filePath: string): string {
    const pathArray = filePath.split(".");
    const extension = pathArray.pop();
    return extension;
  }
  return (
    <a href={filePath} download>
      {isImageFile(getExtension(filePath)) ? (
        <Fragment>
          <span>{getFileName(filePath)}</span>
          <ImageBox src={filePath} />
        </Fragment>
      ) : (
        <FileBox>
          <h1>FileName : {getFileName(filePath)}</h1>
        </FileBox>
      )}
    </a>
  );
};

interface PropTypes {
  filePath: string;
}

const FileBox = styled.section`
  width: auto;
  height: auto;
  background-color: ${({ theme }) => theme.SnugHover};
  border: none;
  border-radius: 10px;
`;

const ImageBox = styled.img`
  width: 100%;
`;
