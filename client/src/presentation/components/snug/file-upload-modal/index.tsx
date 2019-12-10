import React from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.snug};
  margin: 15% auto;
  padding: 20px;
  border: 1px solid black;
  border-radius: 1rem;
  width: 40%;
  box-sizing: border-box;
`;

const ModalHeader = styled.header`
  padding: 1rem 1.5rem;
  font-size: 200%;
  font-weight: bold;
  color: white;
  box-sizing: border-box;
`;

const ModalBody = styled.body`
  padding: 1rem 1.5rem;
  box-sizing: border-box;
`;

const ModalFooter = styled.footer`
  padding: 1rem 1.5rem;
  box-sizing: border-box;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const CustomInput = styled.section`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.snugBorderColor};
  background-color: ${({ theme }) => theme.snug};
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 2rem;
`;

const StyledInput = styled.input.attrs({
  placeholder: "메세지를 입력하세요."
})`
  --webkit-appearance: none;
  background-color: ${({ theme }) => theme.snug};
  font-size: 14px;
  color: #e3e3e3;
  width: 100%;
  border: none;
  box-sizing: border-box;
  &:active,
  :focus {
    outline: none;
  }
`;

const ImgPreview = styled.div`
  text-align: center
  height: 200px;
  border: 1px solid ${({ theme }) => theme.snugBorderColor};
  border-radius: 0.5rem;
  box-sizing: border-box;
`;

export const FileUploadModal = () => {
  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <CloseButton>&times;</CloseButton>
          파일 업로드
        </ModalHeader>

        <ModalBody>
          <CustomInput>
            <StyledInput />
          </CustomInput>
          <ImgPreview>
            <img />
          </ImgPreview>
        </ModalBody>

        <ModalFooter>
          <CustomButton
            color={"#148567"}
            fontColor={"#ffffff"}
            name={"업로드"}
            size={"big"}
            fontWeight={"bold"}
            fontSize={"1rem"}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
