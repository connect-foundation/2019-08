import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { globalApplication } from "contexts/application-context";
import { usePathParameter } from "contexts/path-parameter-context";
import { AppSocketChannelMatchProps } from "prop-types/match-extends-types";

type PropsType = {
  setIsParticipated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Preview: React.FC<AppSocketChannelMatchProps &
  PropsType> = props => {
  const Application = useContext(globalApplication);
  const pathParameter = usePathParameter();
  const { setIsParticipated } = props;

  async function join() {
    const result = await Application.services.channelService.join(
      pathParameter.channelId!
    );
    setIsParticipated(result);
  }

  return (
    <PreviewWrrapper>
      <article>
        <H1>이 채널은 블라블라</H1>
        <P> 블라블라블라블라블라블라블라 </P>
      </article>
      <StyledJoinButton onClick={join}>참가하기</StyledJoinButton>
      <StyledBackButton>나가기</StyledBackButton>
    </PreviewWrrapper>
  );
};

const PreviewWrrapper = styled.section`
  width: 100%;
  min-height: 150px;
  max-height: 150px;
  background-color: ${({ theme }) => theme.snugHover};
  color: ${({ theme }) => theme.snugMainFont};
  padding-top: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
  text-align: center;
`;

const StyledButton = css`
  box-sizing: border-box;
  width: 90px;
  height: 30px;
  font-size: 12pt;
  padding: 0px;
  margin: 0px 10px;
  color: inherit;
  border: none;
  border-radius: 5px;
`;

const StyledJoinButton = styled.button`
  ${StyledButton}
  background-color: ${({ theme }) => theme.mainButtonColor};
  &:hover {
    background-color: ${({ theme }) => theme.mainButtonColorHover};
  }
`;

const StyledBackButton = styled.button`
  ${StyledButton}
  background-color: ${({ theme }) => theme.subButtonColor};
  &:hover {
    background-color: ${({ theme }) => theme.subButtonColorHover};
    color: black;
  }
`;

const H1 = styled.h1`
  font-size: 21pt;
  margin: 10px 0;
  font-weight: bold;
`;

const P = styled.p`
  display: inline-block;
  margin: 0;
  margin-bottom: 20px;
  font-size: 10pt;
  font-weight: 500;
`;
