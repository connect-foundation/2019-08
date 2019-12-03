import React from "react";
import {PageLayout} from "presentation/components/atomic-reusable/page-layout";
import {InviteUsersContainer} from "./container";
import {AppSocketChannelMatchProps} from "prop-types/match-extends-types";

export const InviteUsers: React.FC<AppSocketChannelMatchProps> = props => {
  const { Application } = props;
  return (
          <PageLayout>
            <InviteUsersContainer Application = { Application }/>
          </PageLayout>
  );
};