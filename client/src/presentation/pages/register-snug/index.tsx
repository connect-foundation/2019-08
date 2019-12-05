import React from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { RegisterSnugForm } from "./register-snug-form";
import { ApplicationProptype } from "prop-types/application-type";

// 해더에서 초대 수신을 동적으로 확인하기 위해 socket 역시 필요하다.
export const RegisterSnug: React.FC<ApplicationProptype> = (props) => {
  const { Application } = props;

  return (
    <PageLayout Application={Application}>
      <RegisterSnugForm Application={Application}></RegisterSnugForm>
    </PageLayout>
  );
};
