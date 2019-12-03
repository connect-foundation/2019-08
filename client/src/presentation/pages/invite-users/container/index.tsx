import React from "react";
import styled from "styled-components";
import {InviteDescription} from "presentation/pages/invite-users/description";
import {InviteForm} from "presentation/pages/invite-users/form";
import {ApplicationProptype} from "prop-types/application-type";

const Wrapper = styled.section`
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;


export const InviteUsersContainer: React.FC<ApplicationProptype> = ({Application}) => {
  return (
          <Wrapper>
            <InviteDescription/>
            <InviteForm Application = { Application } />
          </Wrapper>
  );
};