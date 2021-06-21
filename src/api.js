/* TAGS */

import Cookies from "js-cookie";

export const END_POINTS = {
  URL_API_CHIRPS: "http://localhost:8000/api/",
  GET_CHIRPS: "chirps/",
  GET_CHIRP_DETAIL: "chirps/detailview/",
  POST_CHIRP: "chirps/create/",
  POST_CHIRP_ACTION: "chirps/action/",
  URL_API_AUTH: "http://localhost:8000/api-auth/",
  POST_TOKEN: "user/token/",
  POST_USER_CREATE: "user/create/",
};

export const LSTORAGE_TAGS = {
  USERNAME: "chirp-username",
  TOKEN: "chirp-token",
};

export const CHIRPS_ACTIONS = {
  LIKE: "like",
  RECHIRP: "retweet",
};

/* API operations */

export const fetchChirps = async (
  endpoint = END_POINTS.GET_CHIRPS,
  method = "GET",
  data = null
) => {
  const storage = window.localStorage;
  const url = END_POINTS.URL_API_CHIRPS + endpoint;
  let headers = {
    "Content-Type": "application/json",
  };
  const token = storage.getItem(LSTORAGE_TAGS.TOKEN);
  const csrftoken = Cookies.get("csrftoken");
  if (csrftoken) {
    headers = { ...headers, "X-CSRFToken": `${csrftoken}` };
  }
  if (token && method === "POST") {
    headers = { ...headers, Authorization: ` TOKEN ${token}` };
  }
  let options = {
    method: method,
    headers: headers,
  };
  if (data) {
    options = { ...options, body: JSON.stringify(data) };
  }

  const loaded_chirps = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return loaded_chirps;
};

export const fetchApiAuth = async (
  data = null,
  endpoint = END_POINTS.POST_TOKEN,
  method = "POST"
) => {
  const url = END_POINTS.URL_API_AUTH + endpoint;
  let headers = {
    "Content-Type": "application/json",
  };

  let options = {
    method: method,
    headers: headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.log(error.errors));
  return response;
};

export const fetchChirpAction = async (
  action,
  id,
  content = null,
  method = "POST"
) => {
  const storage = window.localStorage;
  const url = END_POINTS.URL_API_CHIRPS + END_POINTS.POST_CHIRP_ACTION;
  const data = {
    action: action,
    content: content,
    id: id,
  };
  let headers = {
    "Content-Type": "application/json",
  };
  const token = storage.getItem(LSTORAGE_TAGS.TOKEN);
  const csrftoken = Cookies.get("csrftoken");
  if (csrftoken) {
    headers = { ...headers, "X-CSRFToken": `${csrftoken}` };
  }
  if (token) {
    headers = { ...headers, Authorization: ` TOKEN ${token}` };
  }
  let options = {
    method: method,
    headers: headers,
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.log(error.errors));
  return response;
};
