import React from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { RegisterUserForm } from "presentation/pages/register-user/register-user-form";
import { ApplicationProptype } from "prop-types/application-type";

export const RegisterUser: React.FC<ApplicationProptype> = ({
  Application
}) => {
  return (
    <PageLayout Application={Application}>
      <RegisterUserForm />
    </PageLayout>
  );
};
