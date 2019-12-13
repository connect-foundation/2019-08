import React, { useState } from "react";
import styled from "styled-components";
import { FileDropArea } from "./file-drop-area";
import { FilePreview } from "../file-preview";

const HiddenInput = styled.input.attrs({
  type: "file"
})`
  display: none;
`;

interface PropTypes {
  closeModal: () => void;
}

export const FileUploadModal: React.FC<PropTypes> = props => {
  const [file, setFile] = useState(new File([], ""));
  const onChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setFile(event.target.files![0]);
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <CloseButton onClick={props.closeModal}>&times;</CloseButton>
          파일 업로드
        </ModalHeader>

        <ModalBody>
          <CustomInput>
            <StyledInput />
          </CustomInput>

          <label htmlFor="fileInput">
            <FileDropArea setFile={setFile} />
          </label>
          <HiddenInput id="fileInput" onChange={onChange} />
          {file.size > 0 ? <FilePreview file={file} /> : undefined}
        </ModalBody>

        <ModalFooter>
          <CustomButton
            color={"#148567"}
            fontColor={"#ffffff"}
            name={"업로드"}
            size={"big"}
            fontWeight={"bold"}
            fontSize={"1rem"}
            height={"2.5rem"}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
