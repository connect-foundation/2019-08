import React from "react";
import styled from "styled-components";
import { StatusBarHeader } from "./status-bar-header";
import { StatusBar } from "./status-bar";
import { Profile } from "core/entity/profile";

const Wrapper = styled.section`
  height: auto;
  max-width: 400px;
  border-bottom: 1px ${({ theme }) => theme.snugBorderColor} solid;
`;

interface PropTypes {
  currentProfile: Profile;
  toggleModal(): any | void;
}

export const StatusSection: React.FC<PropTypes> = ({
  currentProfile,
  toggleModal
}) => {
  const { name, status, role, email } = currentProfile;
  return (
    <Wrapper>
      <StatusBarHeader
        header={name!}
        contents={"이름 바꾸기"}
        toggleModal={toggleModal}
      />
      <StatusBar
        header={status!}
        contents={"상태 설정하기"}
        toggleModal={toggleModal}
      ></StatusBar>
      <StatusBar
        header={"역할"}
        contents={role!}
        cursor={"default"}
      ></StatusBar>
      <StatusBar header={email!} contents={"gipyoo@naver.com"}></StatusBar>
    </Wrapper>
  );
};
