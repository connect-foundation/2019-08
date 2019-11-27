import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import Hash from "assets/hash-white.png";
import { History } from "history";
import { match } from "react-router";
import { ChannelMatchType } from "prop-types/channel-match-type";
import {
  usePathParameter,
  usePathParameterDispatch
} from "contexts/path-parameter";

interface styledWrrapperProps {
  on: boolean;
}

const Wrapper = styled.section<styledWrrapperProps>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0px 20px;
  ${({ on, theme }) => {
    if (on)
      return css`
        background-color: ${theme.sidebarSelect};
        color: ${theme.sidebarSelectFont};
      `;
    return css`
      &:hover {
        background-color: ${theme.sidbarHover};
      }
    `;
  }}
`;

interface PropsTypes {
  id: number;
  title: string;
  history: History<any>;
  match: match<ChannelMatchType>;
}

export const ChannelTitle: React.FC<PropsTypes> = props => {
  const [on, setOn] = useState(false);
  const pathParameter = usePathParameter();
  const pathParameterDispatch = usePathParameterDispatch();
  const { history, match, id } = props;

  useEffect(() => {
    history.push(`/snug/${pathParameter.channelId}`);
    if (pathParameter.channelId == id) return setOn(true);
    setOn(false);
  }, [pathParameter]);

  const onClickEventHandler = () => {
    if (match.params.channelId == id.toString()) return;
    pathParameterDispatch({
      type: "IN",
      channelId: id
    });
  };

  return (
    <Wrapper onClick={onClickEventHandler} on={on ? true : false}>
      <IconBox imageSrc={Hash} size={"20px"} />
      {props.title}
    </Wrapper>
  );
};
