import { useState } from "react";
import { fetchChirpAction, CHIRPS_ACTIONS } from "../api";

function Chirp(props) {
  const { chirp_text, chirp_image, username, chirp_likes, chirp_id } = {
    ...props,
  };

  const [likes, setLikes] = useState(chirp_likes);

  const handleLike = async (e) => {
    e.preventDefault();
    const response = await fetchChirpAction(CHIRPS_ACTIONS.LIKE, chirp_id);
    console.log(response.action);
    if (response.action) {
      if (response.action === "like") {
        setLikes(likes + 1);
      }
      if (response.action === "unlike") {
        setLikes(likes - 1);
      }
    }
  };
  const handleRechirp = (e) => {
    e.preventDefault();
    fetchChirpAction(CHIRPS_ACTIONS.RECHIRP, chirp_id);
  };
  return (
    <div className="chirp">
      <p>Posted by: {username}</p>
      {chirp_image ? <p>{chirp_image}</p> : null}
      <p>{chirp_text}</p>
      <div className="button-h-container">
        <button onClick={handleLike}>{`Like ${likes}`}</button>
        <button onClick={handleRechirp}>ReChirp</button>
      </div>
    </div>
  );
}

export default Chirp;
