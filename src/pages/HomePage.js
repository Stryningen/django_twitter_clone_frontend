import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Chirp from "../components/Chirp";
import ChirpForm from "../components/ChirpForm";

import { fetchChirps, fetchChirpAction, CHIRPS_ACTIONS } from "../api";

function HomePage() {
  let [chirps, setChirps] = useState([]);

  const history = useHistory();

  const rechirp = async (chirp) => {
    const response = await fetchChirpAction(CHIRPS_ACTIONS.RECHIRP, chirp.id);
    console.log(response);
    if (response !== undefined) {
      setChirps([response, ...chirps]);
      return;
    }
    history.push(`/detailview/${response.id}`, { state: "update" });
    return;
  };

  useEffect(async () => {
    const response = await fetchChirps();
    console.log(response);
    if (response) {
      setChirps(response);
    }
  }, []);

  return (
    <main className="home-page">
      <h1>Hello World, and Welcome to Chirp!</h1>
      <ChirpForm chirps={chirps} setChirps={setChirps} />
      {chirps.map((chirp) => {
        return <Chirp key={chirp.id} chirp={chirp} rechirp={rechirp} />;
      })}
    </main>
  );
}

export default HomePage;
