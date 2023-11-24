import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../api/cookie";
import { fetchRequest } from "../api/fetchRequest";

export default function Post({ _id, username, text, imgData, likes }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const userID = getCookie("_id");

  const handleLike = async () => {
    if (isLiked) {
      const response = await fetchRequest("posts/unlike/" + _id, true, "POST");
      if (response.status == 200) {
        const d = await response.json();
        setIsLiked(false);
      }
    } else {
      const response = await fetchRequest("posts/like/" + _id, true, "POST");
      if (response.status == 200) {
        setIsLiked(true);
      }
    }
  };

  useEffect(() => {
    if (likes.find((l) => l.userID == userID)) {
      setIsLiked(true);
    }
  }, []);

  return (
    <div className="border border-gray-300 max-w-sm shadow-xl mt-4">
      <div className="border-b border-gray-400 w-auto py-2 px-3 flex flex-row">
        <img
          className="w-8 h-8 rounded-full"
          src="https://a.ltrbxd.com/resized/avatar/upload/1/0/6/5/4/0/8/3/shard/avtr-0-1000-0-1000-crop.jpg?v=97c7493d8e"
        />
        <Link to="/profile/bijay">
          <span className="font-medium ml-3 cursor-pointer">{username}</span>
        </Link>
      </div>
      <div>
        <img
          src={imgData}
          className="cursor-pointer"
          onClick={() => navigate("/post/" + _id)}
        />
      </div>
      <div className="footer py-3 px-4">
        <div className="flex flex-row gap-3">
          <span onClick={handleLike} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${isLiked ? "fill-red-500" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </span>
        </div>
        <div className="mt-2">
          <span className="font-medium">{username}</span>
          <span className="ml-2 font-normal text-sm text-gray-600">{text}</span>
        </div>
      </div>
    </div>
  );
}
