import React, { CSSProperties, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  margin: 0 auto;
  color: ${({ theme }) => theme.snugMainFont};
  background: ${({ theme }) => theme.snug};
  border: 1px solid ${({ theme }) => theme.snugBorderColor};
  display: flex;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const InfoMessage = styled.span`
  color: #888;
`;

const isHighLight: CSSProperties = {
  background: "#ccc"
};

interface PropTypes {
  setFile: React.Dispatch<React.SetStateAction<File>>;
}

export const FileDropArea: React.FC<PropTypes> = props => {
  const [isDragging, setDragging] = useState(false);
  const { setFile } = props;

  const onDragOver: (event: React.DragEvent<HTMLDivElement>) => void = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setDragging(true);
  };

  const onDrop: (event: React.DragEvent<HTMLDivElement>) => void = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    setDragging(false);
    setFile(event.dataTransfer.files[0]);
  };

  const onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void = () => {
    setDragging(false);
  };

  return (
    <Wrapper
      style={isDragging ? isHighLight : undefined}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <InfoMessage>Drop your file here</InfoMessage>
    </Wrapper>
  );
};
