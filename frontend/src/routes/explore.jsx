import { fetchRequest } from "../api/fetchRequest";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Explore() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = (e) => {
    setQuery(e.target.value);
  };

  const fetchSearch = async () => {
    const response = await fetchRequest(
      "users/search?username=" + query,
      false,
      "GET"
    );
    const data = await response.json();
    if (data.results) {
      setSearchResults(data.results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      setShowSearch(true);
      fetchSearch();
    } else {
      setShowSearch(false);
    }
  }, [query]);

  return (
    <div className="grid grid-cols-6 gap-4 h-screen rounded-lg">
      <div className="col-span-2 border-r border-gray-300 shadow-xl">
        <Sidebar />
      </div>
      <div className="col-span-4 p-4">
        <div className="w-full">
          <div className="m-auto w-fit">
            <input
              className="border p-2 mt-2 border-gray-400 shadow-lg"
              type="search"
              placeholder="search people here"
              value={query}
              onChange={(e) => searchHandler(e)}
            />
            <div
              className={`search-results bg-white ${
                showSearch ? "" : "hidden"
              }`}
            >
              {searchResults.length > 0 ? (
                searchResults.map((s) => {
                  return (
                    <Link to={`/profile/${s.username}`}>
                      <div className="border p-2 cursor-pointer" key={s.email}>
                        {s.username}
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="border p-2">No one found</div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 grid-flow-row-dense">
          <img
            className="col-span-1 row-span-2 shadow-lg"
            src="https://images.pexels.com/photos/51198/gorilla-monkey-view-grim-51198.jpeg"
          />
          <img src="https://images.pexels.com/photos/52530/monkey-orangutan-animal-face-52530.jpeg" />
          <img src="https://images.pexels.com/photos/18985111/pexels-photo-18985111/free-photo-of-silhouetted-palm-trees-on-the-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <img
            className="col-span-2 row-span-1"
            src="https://images.pexels.com/photos/52530/monkey-orangutan-animal-face-52530.jpeg"
          />
          <img src="https://images.pexels.com/photos/18985111/pexels-photo-18985111/free-photo-of-silhouetted-palm-trees-on-the-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <img src="https://images.pexels.com/photos/51198/gorilla-monkey-view-grim-51198.jpeg" />
        </div>
      </div>
    </div>
  );
}
