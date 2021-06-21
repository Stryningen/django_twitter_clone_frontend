import { useEffect, useState } from "react";

import Chirp from "../components/Chirp";
import ChirpForm from "../components/ChirpForm";

import { fetchChirps } from "../api";

function HomePage() {
  let [chirps, setChirps] = useState([]);

  useEffect(async () => {
    const response = await fetchChirps();
    if (response) {
      setChirps(response);
    }
  }, []);

  return (
    <main className="home-page">
      <h1>Hello World, and Welcome to Chirp!</h1>
      <ChirpForm chirps={chirps} setChirps={setChirps} />
      {chirps.map((chirp) => {
        return (
          <Chirp
            key={chirp.id}
            chirp_id={chirp.id}
            chirp_text={chirp.tweet_text}
            chirp_image={chirp.tweet_image}
            chirp_likes={chirp.tweet_likes}
            setChirps={setChirps}
            chirps={chirps}
            chirp_parent={chirp.tweet_parent}
            username={chirp.tweet_user ? chirp.tweet_user.username : "Guest"}
          />
        );
      })}
    </main>
  );
}

export default HomePage;
