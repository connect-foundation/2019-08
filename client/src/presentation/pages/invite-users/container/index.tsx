import React from "react";
import styled from "styled-components";
import {InviteDescription} from "presentation/pages/invite-users/description";
import {InviteForm} from "presentation/pages/invite-users/form";
import {AppSocketInviteMatchProps} from "prop-types/match-extends-types";

const Wrapper = styled.section`
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;


export const InviteUsersContainer: React.FC<AppSocketInviteMatchProps> = props => {
  return (
          <Wrapper>
            <InviteDescription/>
            <InviteForm {...props} />
          </Wrapper>
  );
};