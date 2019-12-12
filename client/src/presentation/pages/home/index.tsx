import React, { useState, useEffect } from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { HomeForm } from "./home-form";
import { HomeSnug } from "./home-snug";
import { ApplicationProptype } from "prop-types/application-type";

export const Home: React.FC<ApplicationProptype> = ({ Application }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Application.services.authService.isLogined());
  });

  return (
    <PageLayout Application={Application}>
      {isLoggedIn ? <HomeSnug Application={Application} /> : <HomeForm Application={Application} />}
    </PageLayout>
  );
};
