import React from "react";
import styled from "styled-components";

const SidebarWrapper = styled.section`
  min-width: 250px;
  height: 100%;
  background-color: red;
`;

export const Sidebar: React.FC = () => {
  return <SidebarWrapper></SidebarWrapper>;
};
