import React from "react";
import styled from "styled-components";
import { StatusBarHeader } from "./status-bar-header";
import { StatusBar } from "./status-bar";

const Wrapper = styled.section`
  height: auto;
  border-bottom: 1px black solid;
`;

export const StatusSection: React.FC = () => {
  return (
    <Wrapper>
      <StatusBarHeader header={"젓갈될래"} contents={"제목 바꾸기"} />
      <StatusBar header={"상태"} contents={"상태 설정하기"}></StatusBar>
      <StatusBar
        header={"역할"}
        contents={"Admin"}
        cursor={"default"}
      ></StatusBar>
      <StatusBar header={"현지 시간"} contents={"시간"}></StatusBar>
      <StatusBar
        header={"Email 주소"}
        contents={"gipyoo@naver.com"}
      ></StatusBar>
    </Wrapper>
  );
};
