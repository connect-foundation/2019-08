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
} from "contexts/path-parameter-context";

interface styledWrrapperProps {
  on: boolean;
}

const Wrapper = styled.section<styledWrrapperProps>`
  // 스타일 코드
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
    // 채널이 바뀌면 on 상태를 바꾸는 기능 setOn
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
