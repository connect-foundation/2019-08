import React from "react";
import styled from "styled-components";
import {InviteDescription} from "presentation/pages/invite-users/description";
import {InviteForm} from "presentation/pages/invite-users/form";

const Wrapper = styled.section`
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;


export const InviteUsersContainer: React.FC = () => {
  return (
          <Wrapper>
            <InviteDescription/>
            <InviteForm/>
          </Wrapper>
  );
};