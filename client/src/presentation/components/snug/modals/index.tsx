import React from "react";
import { ChannelPlusModal } from "presentation/components/snug/channel-plus-modal";
import { ChannelBrowseModal } from "presentation/components/snug/channel-browse-modal";
import { useModalToggled } from "contexts/modal-context";
import { ApplicationProptype } from "prop-types/application-type";

export const Modals: React.FC<ApplicationProptype> = ({ Application }) => {
  const modalsContext = useModalToggled();

  return (
    <>
      {modalsContext && modalsContext.ChannelBrowseModal && (
        <ChannelBrowseModal />
      )}
      <ChannelPlusModal Application={Application} />
    </>
  );
};
