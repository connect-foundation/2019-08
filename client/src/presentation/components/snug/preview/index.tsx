import React from "react";
import styled from "styled-components";

const PreviewWrrapper = styled.section`
  width: 100%;
  min-height: 150px;
  background-color: ${({ theme }) => theme.snug};
  padding-top: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
  text-align: center;
`;

export const Preview: React.FC = () => {
  return <PreviewWrrapper></PreviewWrrapper>;
};
