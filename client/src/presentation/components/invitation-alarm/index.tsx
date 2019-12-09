import React, { useState, useCallback, useContext, useEffect } from "react";
import styled from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import Notification from "assets/notification.png";
import { globalApplication } from "contexts/application-context";
import { Snug } from "core/entity/snug";
import { globalSocket } from "contexts/socket-context";

const Wrapper = styled.section`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 30%;
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

const HiddenInput = styled.input.attrs({ hidden: true, value: "5" })``;

export const InvitationAlarm: React.FC = () => {
  const [onDropdown, setOnDropdown] = useState(false);
  const [invitedSnugs, setInvitedSnugs] = useState<Snug[]>([
    { name: "안녕", id: 1 },
    { name: "하세요", id: 2 },
    { name: "하세요1", id: 3 },
    { name: "하세요2", id: 4 },
    { name: "하세요3", id: 5 },
    { name: "하세요4", id: 6 }
  ]);

  const toggleDropdown = useCallback(() => {
    setOnDropdown(!onDropdown);
  }, [onDropdown]);

  const application = useContext(globalApplication);
  const socket = useContext(globalSocket);

  useEffect(() => {
    const fetchInvitationLists = async () => {
      const result = await application.services.snugService.getInvitedSnugs(
        "yahan@naver.com"
      );
      if (!result) return;
      setInvitedSnugs(result as Snug[]);
    };
    fetchInvitationLists();
  }, []);

  useEffect(() => {
    socket.on("tellInvitation", (snug: Snug) => {
      const currentInvitation = invitedSnugs;
      currentInvitation.push(snug);
      setInvitedSnugs(currentInvitation);
    });
  }, []);

  const acceptDeclineHandler = async (invitedSnugs: Snug[], snug: Snug) => {
    const idx = invitedSnugs.indexOf(snug);
    invitedSnugs.splice(idx, 1);
    setInvitedSnugs([...invitedSnugs]);
    const result = await application.services.snugService.responseToInvitation(
      snug
    );
    if (!result) return;
  };

  return (
    <Wrapper>
      {onDropdown && (
        <DropDown>
          {invitedSnugs.map(snug => (
            <DropDownMenu key={snug.id}>
              ${snug.name}
              <Buttons>
                <CustomButton
                  color={"#0069d9"}
                  name={"수락"}
                  fontColor={"#ffffff"}
                  fontSize={"0.8rem"}
                  onClick={acceptDeclineHandler.bind(
                    acceptDeclineHandler,
                    invitedSnugs,
                    snug
                  )}
                />
                <CustomButton
                  color={"#c82333"}
                  name={"거절"}
                  fontColor={"#ffffff"}
                  fontSize={"0.8rem"}
                  onClick={acceptDeclineHandler.bind(
                    acceptDeclineHandler,
                    invitedSnugs,
                    snug
                  )}
                />
              </Buttons>
            </DropDownMenu>
          ))}
        </DropDown>
      )}
      <InvitationNumber>{invitedSnugs.length}</InvitationNumber>
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