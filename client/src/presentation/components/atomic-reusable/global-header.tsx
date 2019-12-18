import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dubu from "assets/dubu.png";
import { CustomButton } from "./custom-button";
import { IconBox } from "./icon-box";
import { ApplicationProptype } from "prop-types/application-type";
import { Link } from "react-router-dom";
import { InvitationAlarm } from "presentation/components/invitation-alarm";

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
  toggle: boolean;
}

const ContentWrapper = styled.section<On>`
  display: ${({ toggle }) => {
    if (!toggle) return "none";
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
  }, [setIsLoggedIn, Application.services.authService]);

  const clickDropdown = () => {
    setOn(on === false);
  };

  const mouseLeave = () => {
    if (on) setOn(false);
  };

  const logout = () => {
    Application.services.authService.logout();
    window.location.href = "/";
  };

  return (
    <Wrapper>
      <Link to="/">
        <Title> Snug </Title>
      </Link>
      {isLoggedIn ? (
        <IconBoxWrapper>
          <DropDown onClick={clickDropdown} onMouseLeave={mouseLeave}>
            <IconBox imageSrc={Dubu} />
            <ContentWrapper toggle={on}>
              <Content>프로필</Content>
              <Link to="register-snug">
                <Content>Snug 만들기</Content>
              </Link>
              <Content onClick={logout}>로그아웃</Content>
            </ContentWrapper>
          </DropDown>
        </IconBoxWrapper>
      ) : (
        <Link to="/register-user">
          <CustomButton
            color={"#fda600"}
            size={"big"}
            name={"회원가입"}
            fontColor={"#ffffff"}
            fontWeight={"bold"}
          ></CustomButton>
        </Link>
      )}
      <InvitationAlarm />
    </Wrapper>
  );
};
