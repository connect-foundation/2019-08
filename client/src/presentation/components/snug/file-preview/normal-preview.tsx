import React from "react";
import styled from "styled-components";

interface PropTypes {
  file: File;
}

const CustomPreview = styled.div`
  margin: 1rem;
  padding: 1rem;
  color: ${({ theme }) => theme.snugSubFont};
  background: ${({ theme }) => theme.snug};
  border-radius: 1rem;
`;

export const NormalPreview: React.FC<PropTypes> = props => {
  const { file } = props;

  return (
    <CustomPreview>
      <div>이름: {file.name}</div>
      <div>크기: {file.size} Bytes</div>
    </CustomPreview>
  );
};
