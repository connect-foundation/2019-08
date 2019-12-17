import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ModalLeftBody } from "./modal-left-body";
import { ModalRightBody } from "./modal-right-body";
import { globalApplication } from "contexts/application-context";
import { Profile } from "core/entity/profile";

const Wrapper = styled.form`
  width: 90%;
  height: 70%;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.section`
  width: 100%;
  min-width: 100%;
  display: flex;
  height: 40px;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  cursor: pointer;
  width: 20%;
  color: ${({ theme }) => theme.snugMainFont};
  border-radius: 5px;
  background-color: ${({ type, theme }) =>
    type === "submit" ? "#148567" : theme.snugMenuColor};
  border: 1px solid ${({ theme }) => theme.snugBorderColor};
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

  const [file, setFile] = useState(new File([], ""));
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
      <InputWrapper>
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
        <ModalRightBody
          file={file}
          setFile={setFile}
          filePath={currentProfile.thumbnail}
        />
      </InputWrapper>

      <ButtonWrapper>
        <Button type={"button"} onClick={toggleModal}>
          취소
        </Button>
        <Button type={"submit"}>제출</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
