import Cookies from "universal-cookie";

const getCookie = (query) => {
  const cookies = new Cookies(import.meta.env.VITE_COOKIES_NAME);
  return cookies.get(query);
};

export { getCookie };
