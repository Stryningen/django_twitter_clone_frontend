import { useEffect, useState } from "react";

import Chirp from "../components/Chirp";
import ChirpForm from "../components/ChirpForm";

import { fetchChirps } from "../api";

function HomePage() {
  let [chirps, setChirps] = useState([]);

  useEffect(async () => {
    setChirps(await fetchChirps());
  }, []);

  return (
    <main className="home-page">
      <h1>Hello World, and Welcome to Chirp!</h1>
      <ChirpForm chirps={chirps} setChirps={setChirps} />
      {chirps.map((chirp, index) => {
        return (
          <Chirp
            key={index}
            chirp_id={chirp.id}
            chirp_text={chirp.tweet_text}
            chirp_image={chirp.tweet_image}
            username={chirp.tweet_user ? chirp.tweet_user.username : "Guest"}
          />
        );
      })}
    </main>
  );
}

export default HomePage;
