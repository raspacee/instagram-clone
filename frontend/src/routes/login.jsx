import insta_img from "../static/images/pexel.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";
import { fetchRequest } from "../api/fetchRequest";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies(import.meta.env.VITE_COOKIES_NAME, { path: "/" });
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Fill inputs");
    } else {
      const data = { email, password };
      const response = await fetchRequest(
        "users/login",
        false,
        "POST",
        JSON.stringify(data),
        {
          "Content-Type": "application/json",
        }
      );
      if (response.status !== 200) {
        alert("ERROR:");
        const error = await response.json();
        console.log(error);
      } else {
        const decoded = await response.json();
        cookies.set("accessToken", decoded.accessToken);
        cookies.set("_id", decoded._id);
        cookies.set("username", decoded.username);
        navigate(from);
      }
    }
  };
  return (
    <div className="container bg-white mx-auto flex flex-row justify-center py-4 pt-16 h-screen">
      <div className="w-80 h-5/6">
        <img className="h-full w-full rounded-lg" src={insta_img} />
      </div>
      <div className="flex flex-col justify-center ml-4 px-6 py-12 lg:px-8 border border-gray-300 rounded-lg h-5/6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Instagram
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => loginHandler(e)}
              >
                Log in
              </button>
            </div>
          </form>
          <div className="text-sm mt-4">
            <a
              href="#"
              className="font-semibold text-blue-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 ml-1 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
