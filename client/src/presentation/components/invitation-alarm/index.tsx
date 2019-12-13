import React, { useState, useCallback, useContext, useEffect } from "react";
import styled from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import Notification from "assets/notification.png";
import { globalApplication } from "contexts/application-context";
import { Invite } from "core/entity/invite";
import { globalSocket } from "contexts/socket-context";

export const InvitationAlarm: React.FC = () => {
  const [onDropdown, setOnDropdown] = useState(false);
  const [invitedSnugs, setInvitedSnugs] = useState<Invite[]>([]);

  const application = useContext(globalApplication);
  const socket = useContext(globalSocket);

  const user = application.services.authService.getUserInfo();

  const toggleDropdown = useCallback(() => {
    setOnDropdown(!onDropdown);
  }, [onDropdown]);

  useEffect(() => {
    const fetchInvitationLists = async () => {
      if (!user.id) return;
      const {
        invitations
      } = (await application.services.inviteService.getInvitedSnugs(
        user.id
      )) as any;
      if (!invitations || invitations.length === 0) {
        setInvitedSnugs([]);
        return;
      }
      setInvitedSnugs(invitations as Invite[]);
    };
    fetchInvitationLists();
  }, []);

  useEffect(() => {
    const { userSocket } = socket;
    userSocket.off("tellInvitation");
    const id = user.id;
    userSocket.emit("login", { userId: id });
    userSocket.on("tellInvitation", (invitation: any) => {
      const invitedSnug = invitation.payload;
      const currentInvitation = invitedSnugs;
      currentInvitation.push(invitedSnug);
      setInvitedSnugs([...currentInvitation]);
    });
  }, [invitedSnugs]);

  const acceptDeclineHandler = async (
    invitedSnugs: Invite[],
    invitation: Invite,
    agree: boolean
  ) => {
    const idx = invitedSnugs.indexOf(invitation);
    invitedSnugs.splice(idx, 1);
    setInvitedSnugs([...invitedSnugs]);
    const result = (await application.services.inviteService.responseToInvitation(
      invitation,
      agree
    )) as any;
    window.location.href = result.snug.link!;
    if (!result) return;
  };

  return (
    <Wrapper>
      {onDropdown && (
        <DropDown>
          {invitedSnugs.map(invitation => (
            <DropDownMenu key={invitation.id}>
              {invitation.snug}
              <Buttons>
                <CustomButton
                  color={"#0069d9"}
                  name={"수락"}
                  fontColor={"#ffffff"}
                  fontSize={"0.8rem"}
                  onClick={acceptDeclineHandler.bind(
                    acceptDeclineHandler,
                    invitedSnugs,
                    invitation,
                    true
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
                    invitation,
                    false
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
