import React from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { RegisterSnugForm } from "./register-snug-form";

export const RegisterSnug: React.FC = () => {
  return (
    <PageLayout>
      <RegisterSnugForm></RegisterSnugForm>
    </PageLayout>
  );
};
