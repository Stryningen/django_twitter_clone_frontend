import { useEffect } from "react";

import Chirp from "../components/Chirp";
import ChirpForm from "../components/ChirpForm";

import { fetchChirps, LSTORAGE_TAGS } from "../api";
import { useAppContext } from "../context";

function HomePage() {
  const storage = window.localStorage;

  const { currentUser, chirps, setChirps } = useAppContext();

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
      <ChirpForm chirps={chirps} />
      {chirps.map((chirp) => {
        return <Chirp key={chirp.id} chirp={chirp} isInnerChirp={false} />;
      })}
    </main>
  );
}

export default HomePage;
