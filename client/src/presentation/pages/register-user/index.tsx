import React, { useState } from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { RegisterUserForm } from "presentation/pages/register-user/register-user-form";

export const RegisterUser: React.FC = () => {
  return (
    <PageLayout>
      <RegisterUserForm />
    </PageLayout>
  );
};
