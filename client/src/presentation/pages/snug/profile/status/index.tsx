import React from "react";
import styled from "styled-components";
import { StatusBarHeader } from "./status-bar-header";
import { StatusBar } from "./status-bar";
import { Profile } from "core/entity/profile";

const Wrapper = styled.section`
  height: auto;
  border-bottom: 1px black solid;
`;

interface PropTypes {
  currentProfile: Profile;
}

export const StatusSection: React.FC<PropTypes> = ({ currentProfile }) => {
  const { name, status, role, email } = currentProfile;
  return (
    <Wrapper>
      <StatusBarHeader header={name!} contents={"제목 바꾸기"} />
      <StatusBar header={status!} contents={"상태 설정하기"}></StatusBar>
      <StatusBar
        header={"역할"}
        contents={role!}
        cursor={"default"}
      ></StatusBar>
      <StatusBar header={email!} contents={"gipyoo@naver.com"}></StatusBar>
    </Wrapper>
  );
};
