import React from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { InviteUsersContainer } from "./container";
import { AppInviteMatchProps } from "prop-types/match-extends-types";
import { ErrorComponent } from "presentation/pages/error";

export const InviteUsers: React.FC<AppInviteMatchProps> = props => {
  const { Application } = props;
  const user = Application.services.authService.getUserInfo();

  return (
    <PageLayout Application={Application}>
      {user.id ? <InviteUsersContainer {...props} /> : <ErrorComponent />}
    </PageLayout>
  );
};
