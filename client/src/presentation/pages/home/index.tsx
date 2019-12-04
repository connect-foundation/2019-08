import React, { useState, useEffect } from "react";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { HomeForm } from "./home-form";
import { HomeSnug } from "./home-snug";

export const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {});

  return <PageLayout>{isLoggedIn ? <HomeForm /> : <HomeSnug />}</PageLayout>;
};
