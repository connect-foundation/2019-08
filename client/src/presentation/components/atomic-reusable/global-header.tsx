import React, { useState } from "react";
import styled from "styled-components";

import Dubu from "assets/dubu.png";
import Notification from "assets/notification.png";

import { CustomButton } from "./custom-button";
import { IconBox } from "./icon-box";

// 참고 : https://www.w3schools.com/css/tryit.asp?filename=trycss_dropdown_button
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4096cb;
  padding: 10px;
  height: 5vh;
  box-sizing: border-box;
`;

const IconBoxWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
  width: 80%;
`;

const DropDown = styled.section`
  position: relative;
  display: inline-block;

  &:hover {
    display: block;
    > div {
      display: block;
    }
  }
`;

const ContentWrapper = styled.div`
  display: none;
  position: absolute;
  transform: translateX(-90%);
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  &:hover {
    background-color: #f1f1f1;
    display: block;
  }
`;

const Content = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Title = styled.section`
  color: #ffffff;
  font-size: 1.4rem;
`;

export const GlobalHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  return (
    <Wrapper>
      <Title> Snug </Title>
      {isLoggedIn ? (
        <IconBoxWrapper>
          <DropDown>
            <IconBox imageSrc={Dubu} />
            <ContentWrapper>
              <Content href="#">프로필</Content>
              <Content href="#">Snug 만들기</Content>
              <Content href="#">로그아웃</Content>
            </ContentWrapper>
          </DropDown>
          <IconBox imageSrc={Notification} />
        </IconBoxWrapper>
      ) : (
        <CustomButton
          color={"#fda600"}
          size={"big"}
          name={"회원가입"}
          fontColor={"#ffffff"}
          fontWeight={"bold"}
        ></CustomButton>
      )}
    </Wrapper>
  );
};
