import { API_CONFIG } from "./config";
import Cookies from "universal-cookie";

/* 
    relativeURL - string, URL from the base of api from config.js
    useAuthorization - boolean, sends Authorization headers
    methodType - string, GET, POST, PUT, etc
    body(optional) - object, in case of POST or PUT request
    extraHeaders(optional) - object
*/
const fetchRequest = async (
  relativeURL,
  useAuthorization,
  methodType,
  body = {},
  extraHeaders = {}
) => {
  if (methodType != "GET" && methodType != "POST" && methodType != "PUT") {
    return new Promise((resolve, reject) => {
      reject("Invalid methodType");
    });
  }
  const cookies = new Cookies(import.meta.env.VITE_COOKIES_NAME);
  let headers = useAuthorization
    ? { Authorization: `Bearer ${cookies.get("accessToken")}` }
    : {};
  if (Object.keys(extraHeaders).length != 0) {
    Object.assign(headers, extraHeaders);
  }
  let parameters = {};
  parameters["method"] = methodType;
  parameters["headers"] = headers;
  if (methodType != "GET") parameters["body"] = body;
  return fetch(API_CONFIG.BASE_API + relativeURL, parameters);
};

// Fetches photos of a user
const fetchPhotos = async (userID) => {
  const response = await fetchRequest("posts/by/" + userID, true, "GET");
  const data = await response.json();
  if (response.status == 200) {
    return new Promise((resolve, reject) => resolve(data.posts));
  } else {
    console.log("rejectdf:");
    new Promise((resolve, reject) => reject(response));
  }
};

export { fetchRequest, fetchPhotos };
