import React, { Fragment } from "react";
import styled from "styled-components";

const Img = ["gif", "jpg", "jpeg", "png", "tiff"];

export const FileContents: React.FC<PropTypes> = ({ filePath }) => {
  function isImageFile(extention: string): boolean {
    return Img.includes(extention);
  }

  function getFileName(filePath: string): string {
    const pathArray = filePath.split("/");
    const fileName = pathArray.pop();
    const serialNumber = decodeURI(fileName!);
    return serialNumber.slice(13, serialNumber.length);
  }

  function getExtension(filePath: string): string {
    const pathArray = filePath.split(".");
    const extension = pathArray.pop();
    return extension!;
  }

  if (!filePath) return <></>;
  return (
    <StyledA href={filePath} download>
      {isImageFile(getExtension(filePath)) ? (
        <Fragment>
          <ImageBox src={filePath} />
          <FileName>{getFileName(filePath)}</FileName>
        </Fragment>
      ) : (
        <FileBox>
          <FileName>{getFileName(filePath)}</FileName>
        </FileBox>
      )}
    </StyledA>
  );
};

interface PropTypes {
  filePath: string;
}

const FileName = styled.span`
  font-size: 15px;
`;

const StyledA = styled.a`
  color: ${({ theme }) => theme.snugSubFont};
  &:hover {
    color: ${({ theme }) => theme.snugMainFont};
  }
`;

const FileBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  max-width: 400px;
  height: 45px;
  background-color: ${({ theme }) => theme.snugHover};
  border: none;
  border-radius: 10px;
`;

const ImageBox = styled.img`
  display: block;
  min-width: 300px;
  max-width: 400px;
`;
