import React, { CSSProperties, useState } from "react";
import styled from "styled-components";

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
    props.setFile(event.dataTransfer.files[0]);
  };

  const onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
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
