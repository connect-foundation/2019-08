import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dubu from "assets/dubu.png";
import Notification from "assets/notification.png";
import { CustomButton } from "./custom-button";
import { IconBox } from "./icon-box";
import { ApplicationProptype } from "prop-types/application-type";

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
`;

interface On {
  on: boolean;
}

const ContentWrapper = styled.section<On>`
  display: ${({ on }) => {
    if (!on) return "none";
    return "block";
  }};
  position: absolute;
  transform: translateX(-80%);
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
`;

const Content = styled.article`
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

export const GlobalHeader: React.FC<ApplicationProptype> = ({
  Application
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Application.services.authService.isLogined());
  });

  function clickDropdown() {
    setOn(on == false);
  }

  function mouseLeave() {
    if (on) setOn(false);
  }

  function logout() {
    Application.services.authService.logout();
    window.location.href = "/";
  }

  return (
    <Wrapper>
      <Title> Snug </Title>
      {isLoggedIn ? (
        <IconBoxWrapper>
          <DropDown onClick={clickDropdown} onMouseLeave={mouseLeave}>
            <IconBox imageSrc={Dubu} />
            <ContentWrapper on={on}>
              <Content>프로필</Content>
              <Content>Snug 만들기</Content>
              <Content onClick={logout}>로그아웃</Content>
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
