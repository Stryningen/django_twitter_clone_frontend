import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Chirp from "../components/Chirp";

import { fetchChirps, END_POINTS } from "../api";

function ChirpDetailView(props) {
  const [chirp, setChirp] = useState(null);
  const { id } = useParams();

  useEffect(async () => {
    const response = await fetchChirps(END_POINTS.GET_CHIRP_DETAIL + id, "GET");
    if (response) {
      console.log(response);
      //setChirp(response);
    }
  }, []);

  return (
    <div>
      {chirp ? (
        <Chirp
          chirp_id={chirp.id}
          chirp_text={chirp.tweet_text}
          chirp_image={chirp.tweet_image}
          chirp_likes={chirp.tweet_likes}
          chirp_parent={chirp.tweet_parent}
          username={chirp.tweet_user ? chirp.tweet_user.username : "Guest"}
        />
      ) : (
        `loading ${id}`
      )}
    </div>
  );
}

export default ChirpDetailView;
