import React from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { InviteUsersContainer } from "./container";
import { AppInviteMatchProps } from "prop-types/match-extends-types";

export const InviteUsers: React.FC<AppInviteMatchProps> = props => {
  const { Application } = props;
  return (
    <PageLayout Application={Application}>
      <InviteUsersContainer {...props} />
    </PageLayout>
  );
};
