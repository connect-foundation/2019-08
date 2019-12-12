import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ModalLeftBody } from "./modal-left-body";
import { ModalRightBody } from "./modal-right-body";
import { globalApplication } from "contexts/application-context";
import { Profile } from "core/entity/profile";

const Wrapper = styled.form`
  display: flex;
  width: 90%;
  height: 70%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ButtonWrapper = styled.section`
  width: 100%;
  min-width: 100%;
  display: flex;
  height: 40px;
  justify-content: flex-end;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.snugMenuColor};
  color: ${({ theme }) => theme.snugMainFont};
  width: 20%;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.snugMainFont};
  border: 1px solid;
  margin-bottom: 10px;
  margin-left: 10px;
`;

interface PropTypes {
  toggleModal(): any | void;
  updateProfile(profile: Profile): void;
  currentProfile: Profile;
}

export const ModalBody: React.FC<PropTypes> = ({
  toggleModal,
  updateProfile,
  currentProfile
}) => {
  const application = useContext(globalApplication);

  const [description, setDescription] = useState(
    currentProfile.description ? currentProfile.description : ""
  );
  const [phone, setPhone] = useState(
    currentProfile.phone ? currentProfile.phone : ""
  );
  const [name, setName] = useState(
    currentProfile.name ? currentProfile.name : ""
  );
  const [status, setStatus] = useState(
    currentProfile.status ? currentProfile.status : ""
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const profile = {
      ...currentProfile,
      name,
      description,
      status,
      phone
    } as Profile;
    const profilePayload = await application.services.profileService.updateProfile(
      profile
    );
    if (!profilePayload) return;
    updateProfile(profilePayload as Profile);
    toggleModal();
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <ModalLeftBody
        handleNameChange={handleNameChange}
        handleDescriptionChange={handleDescriptionChange}
        handleStatusChange={handleStatusChange}
        handlePhoneChange={handlePhoneChange}
        name={name}
        status={status}
        description={description}
        phone={phone}
      />
      <ModalRightBody />
      <ButtonWrapper>
        <Button type={"button"} onClick={toggleModal}>
          취소
        </Button>
        <Button type={"submit"}>제출</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
