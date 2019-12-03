import styled from "styled-components";
import React from "react";
import {InviteUsers} from "presentation/pages/invite-users/form/invite-users";
import {InviteButton} from "presentation/pages/invite-users/form/Invite-button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40%;
`;

export const InviteForm: React.FC = () => {
  return (
      <Form>
          <InviteUsers/>
          <InviteButton/>
      </Form>
  );
};