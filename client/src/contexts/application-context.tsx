import React, { createContext } from "react";
import { Application } from "context.instance";

export const globalApplication = createContext(Application);

export const ApplicationContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <globalApplication.Provider value={Application}>
      {children}
    </globalApplication.Provider>
  );
};
