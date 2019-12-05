import React from "react";
import styled from "styled-components";

const DescriptionWrapper = styled.section`
  height: 20%;
  display: flex;
  align-items: center;
`;

const Index = styled.span`
  color: #000000;
  font-weight: bold;
  font-size: 2rem;
`;

export const InviteDescription: React.FC = () => {
  return (
          <DescriptionWrapper>
            <Index> 초대하기 </Index>
          </DescriptionWrapper>
  );
};