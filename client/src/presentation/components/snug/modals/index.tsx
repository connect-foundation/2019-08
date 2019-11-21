import React from "react";
import { ChannelPlusModal } from "presentation/components/snug/channel-plus-modal";
import { ChannelBrowseModal } from "presentation/components/snug/channel-browse-modal";
import { useModalToggled } from "contexts/modal-context";

export const Modals: React.FC = () => {
  const modalsContext = useModalToggled();

  return (
    <>
      {modalsContext && modalsContext.ChannelBrowseModal && (
        <ChannelBrowseModal />
      )}
      <ChannelPlusModal />
    </>
  );
};
