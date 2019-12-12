import React from "react";
import styled from "styled-components";
import { ModalInput } from "./modal-input";

const Wrapper = styled.section`
  width: 60%;
  min-width: 60%;
  background-color: ${({ theme }) => theme.snugMenuColor};
  display: flex;
  flex-direction: column;
`;

interface PropTypes {
  handleNameChange(parameter: any | void): any | void;
  handleDescriptionChange(parameter: any | void): any | void;
  handleStatusChange(parameter: any | void): any | void;
  handlePhoneChange(parameter: any | void): any | void;
  name: string;
  description: string;
  status: string;
  phone: string;
}

export const ModalLeftBody: React.FC<PropTypes> = props => {
  const {
    handleDescriptionChange,
    handleNameChange,
    handlePhoneChange,
    handleStatusChange,
    name,
    description,
    status,
    phone
  } = props;

  return (
    <Wrapper>
      <ModalInput
        title={"이름"}
        placeholder={name}
        onChange={handleNameChange}
      ></ModalInput>
      <ModalInput
        title={"설명"}
        placeholder={description}
        onChange={handleDescriptionChange}
      ></ModalInput>
      <ModalInput
        title={"상태"}
        placeholder={status}
        onChange={handleStatusChange}
      ></ModalInput>
      <ModalInput
        placeholder={phone}
        title={"전화번호"}
        onChange={handlePhoneChange}
      ></ModalInput>
    </Wrapper>
  );
};
