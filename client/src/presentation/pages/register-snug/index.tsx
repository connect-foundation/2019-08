import React from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { RegisterSnugForm } from "./register-snug-form";
import { ApplicationProptype } from "prop-types/application-type";

export const RegisterSnug: React.FC<ApplicationProptype> = ({
  Application
}) => {
  return (
    <PageLayout Application={Application}>
      <RegisterSnugForm></RegisterSnugForm>
    </PageLayout>
  );
};
