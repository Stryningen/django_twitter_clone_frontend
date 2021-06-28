import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import Chirp from "../components/Chirp";

import { fetchChirps, END_POINTS } from "../api";

function ChirpDetailView() {
  const [chirp, setChirp] = useState(null);

  const { id } = useParams();
  let location = useLocation();

  useEffect(async () => {
    const response = await fetchChirps(END_POINTS.GET_CHIRP_DETAIL + id, "GET");
    if (response) {
      setChirp(response);
    }
  }, [location]);

  return (
    <main className="detail-page">
      {chirp ? <Chirp chirp={chirp} hideGoToButton={true} /> : `loading ${id}`}
    </main>
  );
}

export default ChirpDetailView;
