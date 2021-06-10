import { useRef } from "react";

import { fetchChirps, END_POINTS } from "../api";

function ChirpForm(props) {
  const chirpTextRef = useRef(null);
  const { chirps, setChirps } = { ...props };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postedChirp = await fetchChirps(END_POINTS.POST_CHIRP, "POST", {
      tweet_text: chirpTextRef.current.value,
    });
    setChirps([postedChirp, ...chirps]);
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
