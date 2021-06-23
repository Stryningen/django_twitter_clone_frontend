import { useState } from "react";
import { useHistory } from "react-router-dom";

import { fetchChirpAction, CHIRPS_ACTIONS, LSTORAGE_TAGS } from "../api";

function Chirp(props) {
  const { chirp, rechirp, hideGoToButton } = {
    ...props,
  };

  const [likes, setLikes] = useState(chirp.tweet_likes);

  const history = useHistory();

  const handleGoToChirp = (e) => {
    e.preventDefault();
    history.push(`/detailview/${chirp.id}`);
  };

  const handleRechirp = (e) => {
    e.preventDefault();
    if (chirp && window.localStorage.getItem(LSTORAGE_TAGS.TOKEN)) {
      rechirp(chirp);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const response = await fetchChirpAction(CHIRPS_ACTIONS.LIKE, chirp.id);
    if (response.action) {
      if (response.action === "like") {
        setLikes(likes + 1);
      }
      if (response.action === "unlike") {
        setLikes(likes - 1);
      }
    }
  };
  return (
    <div className={`chirp ${chirp.tweet_parent && "rechirp"}`}>
      <p>
        Posted by: {chirp.tweet_user ? chirp.tweet_user.username : "Guest User"}
      </p>
      {chirp.tweet_parent ? <p>ReChirp</p> : null}
      {chirp.tweet_image ? <p>{chirp.tweet_image}</p> : null}
      {console.log(props)}
      {chirp.tweet_parent && chirp.tweet_parent.id ? (
        <Chirp chirp={chirp.tweet_parent} />
      ) : null}
      {chirp.tweet_parent && !chirp.tweet_parent.id ? (
        <p className="rechirp-truncation">
          {"'Go to Chirp' to see the rechirped content"}
        </p>
      ) : null}
      <p>{chirp.tweet_text}</p>
      <div className="button-h-container">
        <button onClick={handleLike}>{`Like ${likes}`}</button>
        {hideGoToButton ? null : (
          <button onClick={handleGoToChirp}>Go to</button>
        )}
        <button onClick={handleRechirp}>ReChirp</button>
      </div>
    </div>
  );
}

export default Chirp;
