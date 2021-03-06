import React from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { RegisterUserForm } from "presentation/pages/register-user/register-user-form";
import { AppChannelMatchProps } from "prop-types/match-extends-types";

export const RegisterUser: React.FC<AppChannelMatchProps> = props => {
  const { Application } = props;
  return (
    <PageLayout Application={Application}>
      <RegisterUserForm Application={Application} />
    </PageLayout>
  );
};
