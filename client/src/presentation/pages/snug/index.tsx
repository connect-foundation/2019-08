import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Sidebar } from "./sidebar";
import { SnugHeader } from "./header";
import { ChannelsProvider } from "contexts/channel-context";
import { ModalProvider } from "contexts/modal-context";
import { MessageSection } from "./message-section";
import { AppChannelMatchProps } from "prop-types/match-extends-types";
import { Modals } from "presentation/components/snug/modals";
import { colorTheme } from "presentation/theme/color-theme";
import {
  usePathParameterDispatch,
  usePathParameter
} from "contexts/path-parameter-context";

const SnugWrapper = styled.section`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
`;
const ViewWrapper = styled.section`
  height: 100%;
  display: flex;
`;
export const Snug: React.FC<AppChannelMatchProps> = props => {
  const { Application, match } = props;
  const pathParameterDispatch = usePathParameterDispatch();
  const pathParameter = usePathParameter();

  useEffect(() => {
    const id: number = pathParameter.snugId!;
    (async function(snigid: number) {
      await Application.services.profileService.getProfile(
        pathParameter.snugId!
      );
    })(id);
  }, [pathParameter.snugId]);

  useEffect(() => {
    if (
      Number(match.params.channelId) == pathParameter.channelId &&
      Number(match.params.snugId) == pathParameter.snugId
    )
      return;

    pathParameterDispatch({
      type: "IN",
      channelId: Number(match.params.channelId!)
    });

    pathParameterDispatch({
      type: "GETSNUGID",
      snugId: Number(match.params.snugId)
    });
  }, []);

  return (
    <ThemeProvider theme={colorTheme}>
      <SnugWrapper>
        <ChannelsProvider>
          <ModalProvider>
            <Modals {...props} />
            <SnugHeader />
            <ViewWrapper>
              <Sidebar {...props} />
              <MessageSection {...props} />
            </ViewWrapper>
          </ModalProvider>
        </ChannelsProvider>
      </SnugWrapper>
    </ThemeProvider>
  );
};
