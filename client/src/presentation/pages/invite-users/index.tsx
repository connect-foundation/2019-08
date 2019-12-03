import React from "react";
import {PageLayout} from "presentation/components/atomic-reusable/page-layout";
import {InviteUsersContainer} from "./container";

export const InviteUsers: React.FC = () => {
  return (
          <PageLayout>
            <InviteUsersContainer/>
          </PageLayout>
  );
};