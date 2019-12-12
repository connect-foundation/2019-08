import React from "react";
import { ChannelPlusModal } from "presentation/components/snug/channel-plus-modal";
import { ChannelBrowseModal } from "presentation/components/snug/channel-browse-modal";
import { useModalToggled } from "contexts/modal-context";
import { ApplicationProptype } from "prop-types/application-type";
import { RouteComponentProps } from "react-router";

export const Modals: React.FC<ApplicationProptype &
  RouteComponentProps> = props => {
  const modalsContext = useModalToggled();

  return (
    <>
      {modalsContext && modalsContext.ChannelBrowseModal && (
        <ChannelBrowseModal {...props} />
      )}
      <ChannelPlusModal Application={props.Application} />
    </>
  );
};
