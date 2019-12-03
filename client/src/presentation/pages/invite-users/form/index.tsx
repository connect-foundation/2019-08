import styled from "styled-components";
import React, {useState} from "react";
import {InviteUsers} from "presentation/pages/invite-users/form/invite-users";
import {InviteButton} from "presentation/pages/invite-users/form/Invite-button";
import {EmailModel} from "core/model/email-model";
import {ApplicationProptype} from "prop-types/application-type";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40%;
`;

export const InviteForm: React.FC<ApplicationProptype> = ({Application}) => {
  const [emails, changeEmails] = useState<EmailModel[]>([]);
  const sendEmails = (event: React.MouseEvent) => {
    event.preventDefault();
    Application.services.inviteService.send(emails);

  };

  return (
          <Form>
            <InviteUsers emails={emails} changeEmails={changeEmails}/>
            <InviteButton onClick={sendEmails}/>
          </Form>
  );
};