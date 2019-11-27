import React, { useState } from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { HomeForm } from "./home-form";
import { HomeSnug } from "./home-snug";

export const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <PageLayout>{isLoggedIn ? <HomeForm /> : <HomeSnug />}</PageLayout>;
};
