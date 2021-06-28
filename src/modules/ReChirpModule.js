import { useRef } from "react";
import { fetchChirpAction, CHIRPS_ACTIONS } from "../api";
import { useAppContext } from "../context";
import { useHistory, useLocation } from "react-router-dom";

import Chirp from "../components/Chirp";

function ReChirpModule() {
  const { setChirps, chirps, reChirp, setShowReChirpModule } = useAppContext();
  const wrapperRef = useRef(null);
  const closeModuleBtnRef = useRef(null);
  const reChirpTextRef = useRef(null);

  const history = useHistory();
  let location = useLocation();

  const handleCloseModule = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      e.target === wrapperRef.current ||
      e.target === closeModuleBtnRef.current
    ) {
      setShowReChirpModule(false);
    }
  };

  const submitRechirp = async () => {
    const content = reChirpTextRef.current.value;
    const response = await fetchChirpAction(
      CHIRPS_ACTIONS.RECHIRP,
      reChirp.id,
      content
    );
    if (location.pathname === "/") {
      setChirps([response, ...chirps]);
      return;
    }
    history.push(`/detailview/${response.id}`, { state: "update" });
    return;
  };

  return (
    <div
      ref={wrapperRef}
      onClick={handleCloseModule}
      className="module-wrapper"
    >
      <aside className="module">
        <h2>ReChirp</h2>
        {reChirp ? (
          <Chirp isRechirp={true} chirp={reChirp} />
        ) : (
          "no chirp selected"
        )}
        <form className="form">
          <label htmlFor="chirp"></label>
          <textarea
            ref={reChirpTextRef}
            type="text"
            rows="12"
            cols="36"
            name="chirp"
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submitRechirp();
              setShowReChirpModule(false);
            }}
          >
            ReChirp
          </button>
        </form>
        <button
          ref={closeModuleBtnRef}
          onClick={handleCloseModule}
          className="close-module-btn"
        >
          X
        </button>
      </aside>
    </div>
  );
}

export default ReChirpModule;
