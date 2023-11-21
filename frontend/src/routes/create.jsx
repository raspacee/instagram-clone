import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { fetchRequest } from "../api/fetchRequest";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!image) {
    } else {
      let data = new FormData();
      data.append("img", image);
      data.append("text", text);

      const response = await fetchRequest("posts", true, "POST", data);
      if (response.status == 201) {
        navigate("/home");
      } else {
        console.log(response);
      }
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4 h-screen rounded-lg">
      <div className="col-span-2 border-r border-gray-300 shadow-xl">
        <Sidebar />
      </div>
      <div className="col-span-4 p-4 bg-gray-200">
        <div className="w-2/3 m-auto mt-10">
          {image ? (
            <div class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 bg-gray-50">
              <h2 className="font-medium text-lg text-gray-700">
                1 photo selected
              </h2>
              <span
                className="flex flex-col items-center mt-5 text-red-500 cursor-pointer"
                onClick={() => setImage(null)}
              >
                <label>Remove this photo</label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
          ) : (
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG or JPEG (MAX. 8MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
          )}

          <div className="mt-6 flex flex-col items-center">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your post body
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
              type="button"
              class="mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleCreate}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
