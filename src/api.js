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
  GET_PROFILE: "profiles/",
  POST_PROFILE: "profiles/",
  POST_FOLLOW: "profiles/action/",
};

export const LSTORAGE_TAGS = {
  USERNAME: "chirp-username",
  TOKEN: "chirp-token",
  ID: "chirp-user-id",
  BIO: "chirp-user-bio",
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
      console.log("response");
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log("data");
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
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

export const fetchProfile = async (
  profile_id = "None",
  user_id = "None",
  endpoint = END_POINTS.GET_PROFILE,
  method = "GET",
  data = null
) => {
  const storage = window.localStorage;
  let url = END_POINTS.URL_API_CHIRPS + endpoint;
  if (method === "GET") {
    url = url + profile_id;
  }
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
  };
  if (data) {
    data = { ...data, user_id: user_id, profile_id: profile_id };
    options = { ...options, body: JSON.stringify(data) };
  }

  const loaded_profile = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return loaded_profile;
};

export const fetchFollowAction = async (
  following_id,
  follower_id,
  method = "POST"
) => {
  const storage = window.localStorage;
  const url = END_POINTS.URL_API_CHIRPS + END_POINTS.POST_FOLLOW;
  const data = {
    follower_id: follower_id,
    following_id: following_id,
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
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error.errors));
  return response;
};
