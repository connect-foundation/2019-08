import styled from "styled-components";
import React, {useState} from "react";
import {InviteUsers} from "presentation/pages/invite-users/form/invite-users";
import {InviteButton} from "presentation/pages/invite-users/form/Invite-button";
import {EmailModel} from "core/model/email-model";
import {AppSocketInviteMatchProps} from "prop-types/match-extends-types";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40%;
`;

export const InviteForm: React.FC<AppSocketInviteMatchProps> = ({match, Application}) => {
  const [emails, changeEmails] = useState<EmailModel[]>([]);
  if (!match.params.snugId) return null;
  const sendEmails = (event: React.MouseEvent) => {
    event.preventDefault();
    Application.services.inviteService.send(match.params.snugId, emails);
    window.location.assign("/");
  };
  return (
          <Form>
            <InviteUsers emails={emails} changeEmails={changeEmails}/>
            <InviteButton sendEmails={sendEmails}/>
          </Form>
  );
};