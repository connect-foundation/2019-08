import styled from "styled-components";
import React, {Dispatch, useState} from "react";
import {CustomInput} from "presentation/components/atomic-reusable/custom-input";
import {CustomButton} from "presentation/components/atomic-reusable/custom-button";
import {EmailModel} from "core/model/email-model";
import {ArrayHelper} from "core/utility/array-helper";
import {pipe} from "core/utility/compose-helper";

const InputWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  padding: 10px;
  height: auto;
`;

const ButtonWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const addEmailModel = (emails: EmailModel[], changeEmails: any) => {
  const emailModel = new EmailModel(emails.length);
  emails.push(emailModel);
  changeEmails(emails);
  return emailModel;
};

const createChangeHandler = (email: EmailModel) => {
  return (event: React.MouseEvent) => {
    email.changeEmail(event.toString())
  };
};

const createCustomInput = (email: EmailModel) => {
  const changeHandler = createChangeHandler(email);
  return <CustomInput key={email.getId()}
                      color={"#bdbdbd"}
                      backgroundColor={"#ffffff"}
                      placeholder={"example@email.com"}
                      onChange={changeHandler}/>;
};

const generateEmailContainer = pipe(addEmailModel, createCustomInput);

const generateDefaultEmailContainers = (emails: EmailModel[], changeEmails: any) => {
  const defaultEmailCount = 3;
  return ArrayHelper.generateUntil(defaultEmailCount)
          .map(() => generateEmailContainer(emails, changeEmails));
};

const initializeEmailContainers = (emails: EmailModel[], changeEmails: Dispatch<EmailModel>) => {
  return ArrayHelper.hasNot<EmailModel>(emails) ? generateDefaultEmailContainers(emails, changeEmails) : [];
};

interface PropType {
  emails: EmailModel[];
  changeEmails(parameter: any | void): any | void;
}

export const InviteUsers: React.FC<PropType> = ({emails, changeEmails}) => {
  const defaultEmails = initializeEmailContainers(emails, changeEmails);
  const [emailContainers, addEmailContainers] = useState(defaultEmails);
  const addEmailContainerHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const emailContainer = generateEmailContainer(emails, changeEmails);
    addEmailContainers(emailContainers.concat(emailContainer));
  };
  return (<InputWrapper>
    {emailContainers}
    <ButtonWrapper>
      <CustomButton
              color={"#e3dede"}
              fontColor={"#282c37"}
              name={"추가하기"}
              size={"100%"}
              fontWeight={"bold"}
              fontSize={"1.5rem"}
              onClick={addEmailContainerHandler}
      />
    </ButtonWrapper>
  </InputWrapper>);
};