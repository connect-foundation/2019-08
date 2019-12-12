import React, { useState } from "react";
import styled from "styled-components";
import { ApplicationProptype } from "prop-types/application-type";
import { RouteComponentProps } from "react-router";
import {
  usePathParameterDispatch,
  usePathParameter
} from "contexts/path-parameter-context";
import { useModalToggledDispatch } from "contexts/modal-context";

const Wrapper = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: 60px;
  color: ${({ theme }) => theme.snugSubFont};
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.snugBorderColor};
  margin-top: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.snugBorderColor};
    color: ${({ theme }) => theme.sidebarFontHover};
  }
`;

const Header = styled.header`
  font-weight: bold;
  margin: 10px;
`;

const Contents = styled.article`
  font-size: 0.8rem;
  margin-left: 10px;
`;

const Footer = styled.footer`
  font-size: 0.6rem;
  margin-left: 10px;
`;

const Button = styled.button.attrs({
  id: "join--button"
})<{ on: boolean }>`
  display: ${({ on }) => (on ? "" : "none")};
  position: absolute;
  box-sizing: content-box;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 20px;
  background-color: #00b20090;
  border: none;
  border-radius: 5px;
  font-size: 9pt;
  font-weight: bold;
  color: white;
`;

interface ChannelBrowseModal {
  title?: string;
  id?: number;
  description?: string;
  privacy?: boolean;
  user?: string;
  createdAt?: Date;
}

export const ChannelBrowseModalItem: React.FC<ChannelBrowseModal &
  ApplicationProptype &
  RouteComponentProps> = props => {
  const [on, setOn] = useState(false);
  const { history, id } = props;
  const pathParameter = usePathParameter();
  const pathPatameterDispatch = usePathParameterDispatch();
  const ModalToggle = useModalToggledDispatch();

  function enter() {
    setOn(true);
  }

  function leave() {
    setOn(false);
  }

  function moveChannel() {
    pathPatameterDispatch({
      type: "IN",
      channelId: id!
    });
    history.push(`/snug/${pathParameter.snugId}/channel/id`);

    ModalToggle!({
      type: "TOGGLE_CHANNEL_BROWSE_MODAL"
    });
  }

  return (
    <Wrapper onMouseEnter={enter} onMouseLeave={leave}>
      <Header>{props.title}</Header>
      <Contents>{props.description}</Contents>
      <Footer>
        Created by {props.user} on{" "}
        {props.createdAt && props.createdAt.toLocaleString()}
      </Footer>
      <Button on={on} onClick={moveChannel}>
        프리뷰
      </Button>
    </Wrapper>
  );
};
