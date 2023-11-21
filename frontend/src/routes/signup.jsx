import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="container bg-white mx-auto flex flex-row justify-center py-4 pt-8 h-screen">
      <div className="flex flex-col justify-center ml-4 px-6 py-12 lg:px-8 border border-gray-300 rounded-lg h-5/6 w-80">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Instagram
          </h2>
        </div>
        <p className="text-gray-500 font-semibold mt-2">
          Sign up to see photos and videos from your friends.
        </p>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="email"
                />
              </div>
            </div>
            <div>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="username"
                />
              </div>
            </div>
            <div>
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="name"
                />
              </div>
            </div>

            <div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="password"
                />
              </div>
            </div>
            <p className="font-light text-xs text-gray-500">
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <a href="#" className="text-blue-400">
                Learn More
              </a>
            </p>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 ml-1 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
