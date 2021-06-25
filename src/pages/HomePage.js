import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Chirp from "../components/Chirp";
import ChirpForm from "../components/ChirpForm";

import {
  fetchChirps,
  fetchChirpAction,
  CHIRPS_ACTIONS,
  LSTORAGE_TAGS,
} from "../api";
import { useAppContext } from "../context";

function HomePage() {
  let [chirps, setChirps] = useState([]);

  const history = useHistory();
  const storage = window.localStorage;

  const { currentUser } = useAppContext();

  const rechirp = async (chirp) => {
    const response = await fetchChirpAction(CHIRPS_ACTIONS.RECHIRP, chirp.id);
    if (response !== undefined) {
      setChirps([response, ...chirps]);
      return;
    }
    history.push(`/detailview/${response.id}`, { state: "update" });
    return;
  };

  useEffect(async () => {
    const response = await fetchChirps();
    if (response) {
      setChirps(response);
    }
  }, []);

  return (
    <main className="home-page">
      <h1>
        {currentUser
          ? `Hello ${storage.getItem(LSTORAGE_TAGS.USERNAME)}`
          : "Welcome to Chirp"}
      </h1>
      <ChirpForm chirps={chirps} setChirps={setChirps} />
      {chirps.map((chirp) => {
        return (
          <Chirp
            key={chirp.id}
            chirp={chirp}
            rechirp={rechirp}
            isInnerChirp={false}
          />
        );
      })}
    </main>
  );
}

export default HomePage;
