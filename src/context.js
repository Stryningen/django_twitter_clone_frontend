import React, { useState, useContext } from "react";

import { LSTORAGE_TAGS } from "./api";

const AppContext = React.createContext();

export function AppProvider({ children }) {
  const storage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(
    storage.getItem(LSTORAGE_TAGS.TOKEN) ? true : false
  );
  const value = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  return useContext(AppContext);
};
