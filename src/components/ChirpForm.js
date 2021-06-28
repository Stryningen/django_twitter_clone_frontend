import { useRef } from "react";

import { fetchChirps, END_POINTS } from "../api";
import { useAppContext } from "../context";

function ChirpForm() {
  const chirpTextRef = useRef(null);
  const { chirps, setChirps } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postedChirp = await fetchChirps(END_POINTS.GET_CHIRPS, "POST", {
      tweet_text: chirpTextRef.current.value,
    });
    chirpTextRef.current.value = "";
    if (postedChirp) {
      setChirps([postedChirp, ...chirps]);
    }
  };
  return (
    <section className="chirp-form-container">
      <h2>Chirp to the World!</h2>
      <form className="form">
        <label htmlFor="chirp"></label>
        <textarea
          ref={chirpTextRef}
          type="text"
          rows="12"
          cols="36"
          name="chirp"
        />
        <button type="submit" onClick={handleSubmit}>
          Chirp
        </button>
      </form>
    </section>
  );
}

export default ChirpForm;
