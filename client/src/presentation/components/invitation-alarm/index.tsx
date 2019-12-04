import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import Notification from "assets/notification.png";

const Wrapper = styled.section`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 28%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const DropDown = styled.section`
  position: relative;
  display: flex;
  transform: translate(50px, -60px);
  flex-direction: column;
  transition: transform 300ms ease-in;
  width: 100%;
  height: 150px;
  padding: 5px;
  border-radius: 10px;
  background-color: #9da1a5;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
    background: none;
    background-color: #2a2d30;
  }
  &::-webkit-scrollbar-thumb {
    background: #f8f7fb;
    opacity: 0.4;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
`;

const Buttons = styled.section`
  display: flex;
  justify-content: space-around;
  width: 40%;
`;

const DropDownMenu = styled.section`
  background-color: #eae8e8;
  color: #211d1d;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  margin-bottom: 3px;
`;

const InvitationNumber = styled.span`
  background-color: red;
  color: #ffffff;
  border-radius: 50px;
  width: 20px;
  height: 20px;
  display: block;
  text-align: center;
  position: fixed;
  right: 0;
  bottom: 0;
`;

export const InvitationAlarm: React.FC = () => {
  const [onDropdown, setOnDropdown] = useState(false);

  const toggleDropdown = useCallback(() => {
    setOnDropdown(!onDropdown);
  }, [onDropdown]);

  return (
    <Wrapper>
      {onDropdown && (
        <DropDown>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
          <DropDownMenu>
            snug 초대됨
            <Buttons>
              <CustomButton
                color={"#0069d9"}
                name={"수락"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
              <CustomButton
                color={"#c82333"}
                name={"거절"}
                fontColor={"#ffffff"}
                fontSize={"0.8rem"}
              />
            </Buttons>
          </DropDownMenu>
        </DropDown>
      )}
      <InvitationNumber>5</InvitationNumber>
      <IconBox
        size={"50px"}
        imageSrc={Notification}
        borderRadius={"50px"}
        backgroundColor={"#eae8e8"}
        onClick={toggleDropdown}
      />
    </Wrapper>
  );
};
