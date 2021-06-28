import React, { useState, useContext } from "react";

import { LSTORAGE_TAGS } from "./api";

const AppContext = React.createContext();

export function AppProvider({ children }) {
  const storage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(
    storage.getItem(LSTORAGE_TAGS.TOKEN) ? true : false
  );
  let [chirps, setChirps] = useState([]);
  const [reChirp, setReChirp] = useState(null);
  const [showReChirpModule, setShowReChirpModule] = useState(false);

  const value = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    chirps: chirps,
    setChirps: setChirps,
    reChirp: reChirp,
    setReChirp: setReChirp,
    showReChirpModule: showReChirpModule,
    setShowReChirpModule: setShowReChirpModule,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  return useContext(AppContext);
};
