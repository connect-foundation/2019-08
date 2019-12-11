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
  currentProfile: Profile | undefined;
}

export const StatusSection: React.FC<PropTypes> = ({ currentProfile }) => {
  // const {name, status, role, email} = currentProfile;

  return (
    <Wrapper>
      <StatusBarHeader header={"젓갈돌래"} contents={"제목 바꾸기"} />
      <StatusBar
        header={"젓갈 담그는 중"}
        contents={"상태 설정하기"}
      ></StatusBar>
      <StatusBar
        header={"역할"}
        contents={"Admin"}
        cursor={"default"}
      ></StatusBar>
      <StatusBar
        header={"Email 주소"}
        contents={"gipyoo@naver.com"}
      ></StatusBar>
    </Wrapper>
  );
};
