import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "./header";
import { Thumbnail } from "./thumbnail";
import { Buttons } from "./buttons";
import { StatusSection } from "./status-section";

const Wrapper = styled.section`
  color: white;
  background-color: white;
  width: 700px;
  height: 100%;
  overflow-y: scroll;
`;

export const Profile: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <Thumbnail />
      <Buttons />
      <StatusSection />
    </Wrapper>
  );
};
