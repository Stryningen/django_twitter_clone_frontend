import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Chirp from "../components/Chirp";

import {
  fetchChirps,
  END_POINTS,
  fetchChirpAction,
  CHIRPS_ACTIONS,
} from "../api";

function ChirpDetailView(props) {
  const [chirp, setChirp] = useState(null);

  const { id } = useParams();

  const history = useHistory();

  const rechirp = async (chirp) => {
    const response = await fetchChirpAction(CHIRPS_ACTIONS.RECHIRP, chirp.id);
    console.log(response);
    history.push(`/detailview/${response.id}`, { state: "update" });
    return;
  };

  useEffect(async () => {
    const response = await fetchChirps(END_POINTS.GET_CHIRP_DETAIL + id, "GET");
    if (response) {
      console.log(response);
      setChirp(response);
    }
  }, [props.location]);

  return (
    <main className="detail-page">
      {chirp ? (
        <Chirp chirp={chirp} rechirp={rechirp} hideGoToButton={true} />
      ) : (
        `loading ${id}`
      )}
    </main>
  );
}

export default ChirpDetailView;
